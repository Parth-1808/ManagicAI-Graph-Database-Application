const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const neo4j = require('neo4j-driver');
const path = require('path');
const fs = require('fs');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let env = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    }
  }
}

const URI = process.env.COGNODB_URI || env.COGNODB_URI || 'bolt+s://db-62c8531c.bravo.databases.cognodb.cloud';
const USER = process.env.COGNODB_USER || env.COGNODB_USER || 'cognodb';
const PASSWORD = process.env.COGNODB_PASSWORD || env.COGNODB_PASSWORD || 'af829ec1c54011534c1aab45a9dbcd3f';

describe('CognoDB Graph Topology & Shield Integrity (Integration Tests)', () => {
  let driver;
  let session;

  before(() => {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    session = driver.session();
  });

  after(async () => {
    if (session) await session.close();
    if (driver) await driver.close();
  });

  it('1. should ensure every Legal Shield Covenant has active protected relationships', async () => {
    const res = await session.run(`
      MATCH (c:Covenant)
      OPTIONAL MATCH (c)-[r]->()
      RETURN c.id AS id, c.title AS title, count(r) AS outgoingCount;
    `);
    assert.ok(res.records.length >= 4, 'Should have at least 4 covenants');
    for (const rec of res.records) {
      assert.ok(rec.get('outgoingCount').toNumber() > 0, `Covenant ${rec.get('title')} should protect at least one entity or block one dispute`);
    }
  });

  it('2. should verify all 6 Films are connected to Talent or Domain Hub', async () => {
    const res = await session.run(`
      MATCH (f:Film)
      MATCH (t:Talent)-[:STARS_IN]->(f)
      RETURN count(f) AS count;
    `);
    assert.strictEqual(res.records[0].get('count').toNumber(), 6, 'All 6 films should be connected to root talent');
  });

  it('3. should verify all 7 Brand partnerships are connected in the Commercial Domain hierarchy', async () => {
    const res = await session.run(`
      MATCH (b:Brand)<-[r]-()
      RETURN count(DISTINCT b) AS count;
    `);
    assert.strictEqual(res.records[0].get('count').toNumber(), 7, 'All 7 brands should be actively connected in the graph topology');
  });

  it('4. should verify all 5 Revenue Streams have positive monthly and yearly values', async () => {
    const res = await session.run(`
      MATCH (rev:RevenueStream)
      RETURN rev.name AS name, rev.monthlyValue AS monthly, rev.yearlyValue AS yearly;
    `);
    assert.strictEqual(res.records.length, 5);
    for (const rec of res.records) {
      const monthly = rec.get('monthly').toNumber ? rec.get('monthly').toNumber() : Number(rec.get('monthly'));
      const yearly = rec.get('yearly').toNumber ? rec.get('yearly').toNumber() : Number(rec.get('yearly'));
      assert.ok(monthly > 0, `Revenue stream ${rec.get('name')} must have positive monthly value`);
      assert.ok(yearly > 0, `Revenue stream ${rec.get('name')} must have positive yearly value`);
    }
  });
});
