import neo4j, { Driver, Session } from 'neo4j-driver';
import { runMcpCypher } from './cognodbMcp';

let driverInstance: Driver | null = null;

export function getCognoDbDriver(): Driver | null {
  const uri =
    process.env.COGNODB_URI || 'bolt+s://db-62c8531c.bravo.databases.cognodb.com';
  const user = process.env.COGNODB_USER || 'cognodb';
  const password =
    process.env.COGNODB_PASSWORD || 'af829ec1c54011534c1aab45a9dbcd3f';

  if (!uri || !password) {
    return null;
  }

  if (!driverInstance) {
    try {
      driverInstance = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        maxConnectionPoolSize: 50,
        connectionTimeout: 8000,
        maxTransactionRetryTime: 15000,
      });
    } catch (err) {
      console.error('[CognoDB] Failed to initialize Bolt driver:', err);
      return null;
    }
  }

  return driverInstance;
}

/**
 * Recursively converts Neo4j Integers {low, high}, Nodes, Relationships, and BigInt into clean JS primitives
 */
export function sanitizeNeo4jValue(val: any): any {
  if (val === null || val === undefined) return val;

  if (typeof val === 'bigint') {
    return Number(val);
  }

  if (
    neo4j.isInt(val) ||
    (typeof val === 'object' && 'low' in val && 'high' in val && Object.keys(val).length === 2)
  ) {
    try {
      if (typeof val.toNumber === 'function') {
        return val.toNumber();
      }
      return neo4j.integer.toNumber(val);
    } catch {
      return Number(val.low);
    }
  }

  if (Array.isArray(val)) {
    return val.map(sanitizeNeo4jValue);
  }

  if (typeof val === 'object') {
    // If it's a Node or Relationship with properties
    if ('properties' in val && typeof val.properties === 'object' && val.properties !== null) {
      const nodeProps = sanitizeNeo4jValue(val.properties);
      return {
        ...nodeProps,
        id: nodeProps?.id || val.elementId || (val.identity ? sanitizeNeo4jValue(val.identity).toString() : undefined),
        labels: val.labels || undefined,
        type: val.type || undefined,
      };
    }
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = sanitizeNeo4jValue(v);
    }
    return res;
  }

  return val;
}

/**
 * Execute an openCypher query over CognoDB Bolt protocol (priority) with MCP fallback
 */
export async function runCypher<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<{ records: T[]; isLiveDb: boolean; source: string }> {
  // 1. Priority: Direct Bolt protocol driver (Official Neo4j Driver)
  const driver = getCognoDbDriver();
  if (driver) {
    const session: Session = driver.session();
    try {
      const result = await session.run(query, params);
      const records = result.records.map((r) => {
        const obj = r.toObject();
        return sanitizeNeo4jValue(obj) as T;
      });
      return { records, isLiveDb: true, source: 'cognodb_bolt_driver' };
    } catch (error) {
      console.error('[CognoDB Bolt Driver Error]:', error);
    } finally {
      await session.close();
    }
  }

  // 2. Secondary: Official CognoDB MCP API
  try {
    const mcpRes = await runMcpCypher(query, {
      params,
      instance: 'db-62c8531c',
    });
    if (mcpRes.success && mcpRes.data) {
      const rawData = Array.isArray(mcpRes.data) ? mcpRes.data : [mcpRes.data];
      const records = sanitizeNeo4jValue(rawData);
      return {
        records,
        isLiveDb: true,
        source: 'cognodb_mcp_api',
      };
    }
  } catch (_mcpErr) {
    // Continue to fallback
  }

  return { records: [], isLiveDb: false, source: 'in_memory_fallback' };
}

/**
 * Verifies live connection to CognoDB
 */
export async function testCognoDbConnection(): Promise<{
  connected: boolean;
  message: string;
  source: string;
}> {
  const driver = getCognoDbDriver();
  if (driver) {
    try {
      const serverInfo = await driver.getServerInfo();
      return {
        connected: true,
        message: `Connected to CognoDB Cloud Instance via Bolt Protocol: ${
          serverInfo.agent || 'Bolt 5.4'
        }`,
        source: 'cognodb_bolt_driver_live',
      };
    } catch (_err: any) {
      // Continue to check MCP
    }
  }

  try {
    const testRes = await runMcpCypher('RETURN 1 AS connected', {
      instance: 'db-62c8531c',
    });
    if (testRes.success) {
      return {
        connected: true,
        message: 'Connected to CognoDB Cloud Instance via MCP SSE API',
        source: 'cognodb_mcp_live',
      };
    }
  } catch (_err: any) {
    // Fallback
  }

  return {
    connected: false,
    message: 'Could not connect to CognoDB. Operating in fallback mode.',
    source: 'in_memory_fallback',
  };
}
