import neo4j from 'neo4j-driver';

/**
 * Normalizes Neo4j / CognoDB 64-bit Integer objects, Node instances, and nested records into pure JS primitives
 */
export function sanitizeNeo4jValue(val: any): any {
  if (val === null || val === undefined) {
    return val;
  }

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
