import neo4j, { Driver, Session } from 'neo4j-driver';
import { SERVER_CONFIG } from '../config/env';
import { sanitizeNeo4jValue } from './cypher-sanitizer';
import { DatabaseError } from '../errors/app-error';

let driverInstance: Driver | null = null;

/**
 * Get or initialize the singleton Neo4j/CognoDB Bolt Driver with Connection Pooling
 */
export function getCognoDbDriver(): Driver {
  if (!driverInstance) {
    const { uri, user, password, maxConnectionPoolSize, connectionTimeout } = SERVER_CONFIG.cognodb;

    driverInstance = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionPoolSize,
      connectionTimeout,
      disableLosslessIntegers: false,
    });
  }
  return driverInstance;
}

/**
 * Executes a parameterized openCypher query with automatic retry on transient Bolt network errors
 */
export async function executeCypher<T = any>(
  query: string,
  params: Record<string, any> = {},
  retries = SERVER_CONFIG.cognodb.maxRetries
): Promise<{ records: T[]; isLiveDb: boolean; totalRecords: number }> {
  const driver = getCognoDbDriver();
  let attempt = 0;

  while (attempt < retries) {
    attempt++;
    const session: Session = driver.session();
    try {
      const result = await session.run(query, params);
      const records = result.records.map((r) => {
        const obj = r.toObject();
        return sanitizeNeo4jValue(obj) as T;
      });

      return {
        records,
        isLiveDb: true,
        totalRecords: records.length,
      };
    } catch (error: any) {
      const isTransient =
        error.code === 'ServiceUnavailable' ||
        error.code === 'SessionExpired' ||
        error.message?.includes('Connection lost') ||
        error.message?.includes('socket hang up') ||
        error.message?.includes('ECONNRESET');

      if (isTransient && attempt < retries) {
        const delay = SERVER_CONFIG.cognodb.retryDelayMs * Math.pow(2, attempt - 1);
        console.warn(`[CognoDB Client] Transient Bolt connection failure (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      console.error('[CognoDB Client] Query Execution Error:', {
        message: error.message,
        code: error.code,
        query: query.slice(0, 150),
      });

      throw new DatabaseError(`CognoDB Query Failed: ${error.message}`, {
        code: error.code,
        query: query.slice(0, 150),
      });
    } finally {
      await session.close();
    }
  }

  throw new DatabaseError('Exceeded maximum retry attempts connecting to CognoDB Cloud over Bolt Protocol.');
}

/**
 * Health check ping for Bolt connectivity
 */
export async function pingCognoDB(): Promise<{ healthy: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    const res = await executeCypher('RETURN 1 AS ping', {}, 1);
    return {
      healthy: res.records.length > 0,
      latencyMs: Date.now() - start,
    };
  } catch {
    return {
      healthy: false,
      latencyMs: Date.now() - start,
    };
  }
}
