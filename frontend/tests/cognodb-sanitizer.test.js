const { describe, it } = require('node:test');
const assert = require('node:assert');
const neo4j = require('neo4j-driver');

// Sanitizer function equivalent to src/lib/cognodb.ts
function sanitizeNeo4jValue(val) {
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
    const res = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = sanitizeNeo4jValue(v);
    }
    return res;
  }
  return val;
}

describe('CognoDB Value Sanitizer (Unit Tests)', () => {
  it('should preserve primitive values (string, number, boolean)', () => {
    assert.strictEqual(sanitizeNeo4jValue('Hrithik Roshan'), 'Hrithik Roshan');
    assert.strictEqual(sanitizeNeo4jValue(100), 100);
    assert.strictEqual(sanitizeNeo4jValue(true), true);
    assert.strictEqual(sanitizeNeo4jValue(null), null);
    assert.strictEqual(sanitizeNeo4jValue(undefined), undefined);
  });

  it('should unpack Neo4j Integer { low, high } objects into JS numbers', () => {
    const neoInt = neo4j.int(42);
    assert.strictEqual(sanitizeNeo4jValue(neoInt), 42);

    const rawObjInt = { low: 100, high: 0 };
    assert.strictEqual(sanitizeNeo4jValue(rawObjInt), 100);
  });

  it('should sanitize BigInt values to standard Numbers', () => {
    const bigVal = BigInt(12500000);
    assert.strictEqual(sanitizeNeo4jValue(bigVal), 12500000);
  });

  it('should recursively sanitize nested arrays and objects', () => {
    const raw = {
      name: 'War 2',
      year: neo4j.int(2026),
      budget: { low: 200, high: 0 },
      tags: ['action', 'spy', { priority: neo4j.int(1) }],
    };
    const cleaned = sanitizeNeo4jValue(raw);
    assert.deepStrictEqual(cleaned, {
      name: 'War 2',
      year: 2026,
      budget: 200,
      tags: ['action', 'spy', { priority: 1 }],
    });
  });

  it('should unpack Neo4j Node objects with properties and labels', () => {
    const mockNode = {
      elementId: 'node-hrithik',
      labels: ['Person', 'Talent'],
      properties: {
        id: 'root-hrithik',
        name: 'Hrithik Roshan',
        clearanceScore: neo4j.int(100),
      },
    };
    const cleaned = sanitizeNeo4jValue(mockNode);
    assert.strictEqual(cleaned.id, 'root-hrithik');
    assert.strictEqual(cleaned.name, 'Hrithik Roshan');
    assert.strictEqual(cleaned.clearanceScore, 100);
    assert.deepStrictEqual(cleaned.labels, ['Person', 'Talent']);
  });
});
