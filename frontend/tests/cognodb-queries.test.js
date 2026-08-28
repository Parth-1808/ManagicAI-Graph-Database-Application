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

describe('CognoDB Cloud openCypher Graph Queries (Integration Tests)', () => {
  let driver;
  let session;

  before(async () => {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD), {
      maxConnectionPoolSize: 10,
      connectionTimeout: 10000,
    });
    session = driver.session();
  });

  after(async () => {
    if (session) await session.close();
    if (driver) await driver.close();
  });

  it('1. should query Root Talent Entity (Hrithik Roshan) with 100% clearance score', async () => {
    const query = `
      MATCH (t:Talent { id: 'root-hrithik' })
      RETURN t.name AS name, t.role AS role, t.portfolioValuation AS valuation, t.clearanceScore AS clearance;
    `;
    const res = await session.run(query);
    assert.strictEqual(res.records.length, 1);
    const rec = res.records[0];
    assert.strictEqual(rec.get('name'), 'Hrithik Roshan');
    assert.strictEqual(rec.get('clearance').toNumber ? rec.get('clearance').toNumber() : Number(rec.get('clearance')), 100);
    assert.ok(rec.get('valuation').includes('₹335+ Cr'));
  });

  it('2. should verify AI Conflict Radar auto-blocks Tag Heuer & AI Likeness exploits', async () => {
    const query = `
      MATCH (c:Covenant)-[:BLOCKS]->(d:Dispute)
      RETURN c.title AS shield, d.title AS dispute, d.riskTag AS tag
      ORDER BY d.id ASC;
    `;
    const res = await session.run(query);
    assert.ok(res.records.length >= 2, 'Should have at least 2 blocked disputes in CognoDB');
    const shields = res.records.map((r) => r.get('shield'));
    const disputes = res.records.map((r) => r.get('dispute'));
    assert.ok(shields.some((s) => s.includes('Swiss Watch')));
    assert.ok(disputes.some((d) => d.includes('Tag Heuer')));
  });

  it('3. should traverse Multi-Hop Causal Release & Stunt Precedence Chains', async () => {
    const query = `
      MATCH (t1:Task { id: 'evt-1' })-[:ENABLES]->(t2:Task { id: 'evt-4' })-[:REQUIRED_FOR]->(e1:Event { id: 'ent-cannes' })-[:PRECEDES]->(e2:Event { id: 'ent-iifa' })
      RETURN t1.title AS shoot, t2.title AS alps, coalesce(e1.name, e1.title) AS cannes, coalesce(e2.name, e2.title) AS iifa;
    `;
    const res = await session.run(query);
    assert.strictEqual(res.records.length, 1);
    const rec = res.records[0];
    assert.ok(rec.get('shoot').includes('Climax Combat'));
    assert.ok(rec.get('alps').includes('European Overseas Stunt'));
    assert.ok(rec.get('cannes').includes('Cannes'));
    assert.ok(rec.get('iifa').includes('IIFA'));
  });

  it('4. should retrieve Creative Network Collaborators & Stunt Coordinators', async () => {
    const query = `
      MATCH (p:Person:Collaborator)
      RETURN p.name AS name, p.role AS role;
    `;
    const res = await session.run(query);
    assert.ok(res.records.length >= 5, 'Should have at least 5 industry collaborators');
    const names = res.records.map((r) => r.get('name'));
    assert.ok(names.includes('Jr NTR'));
    assert.ok(names.includes('Ayan Mukerji'));
    assert.ok(names.includes('Franz Spilhaus'));
  });

  it('5. should query Dynamic RevenueStream nodes from CognoDB', async () => {
    const query = `
      MATCH (rev:RevenueStream)
      RETURN rev.name AS name, rev.monthlyValue AS monthly, rev.yearlyValue AS yearly;
    `;
    const res = await session.run(query);
    assert.strictEqual(res.records.length, 5, 'Should have 5 revenue streams');
    const names = res.records.map((r) => r.get('name'));
    assert.ok(names.includes('Brand Endorsements'));
    assert.ok(names.includes('Feature Film Retainers'));
  });

  it('6. should query Real-Time ActivityLog stream nodes from CognoDB', async () => {
    const query = `
      MATCH (act:ActivityLog)
      RETURN act.id AS id, act.title AS title, act.type AS type
      ORDER BY act.id ASC;
    `;
    const res = await session.run(query);
    assert.strictEqual(res.records.length, 5, 'Should have 5 activity logs in stream');
    const titles = res.records.map((r) => r.get('title'));
    assert.ok(titles.some((t) => t.includes('War 2 Climax')));
    assert.ok(titles.some((t) => t.includes('Rolex')));
  });
});
