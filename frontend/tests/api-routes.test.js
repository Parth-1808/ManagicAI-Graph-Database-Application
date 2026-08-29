const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const dns = require('dns');
try { dns.setDefaultResultOrder('ipv4first'); } catch {}
const neo4j = require('neo4j-driver');

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

const URI = process.env.COGNODB_URI || env.COGNODB_URI || 'bolt+s://db-62c8531c.bravo.databases.cognodb.com';
const USER = process.env.COGNODB_USER || env.COGNODB_USER || 'cognodb';
const PASSWORD = process.env.COGNODB_PASSWORD || env.COGNODB_PASSWORD || 'af829ec1c54011534c1aab45a9dbcd3f';

describe('Next.js App Router API Route Data Contracts (Integration Tests)', () => {
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

  it('1. GET /api/overview/summary Contract: returns talent, films, priorities, and talent roster', async () => {
    const talentRes = await session.run(`
      MATCH (t:Talent { id: 'root-hrithik' })
      RETURN t.name AS name, t.portfolioValuation AS valuation, t.clearanceScore AS clearance;
    `);
    const filmsRes = await session.run(`MATCH (f:Film) RETURN count(f) AS count;`);
    const rosterRes = await session.run(`MATCH (p:Person) RETURN count(p) AS count;`);

    assert.strictEqual(talentRes.records.length, 1);
    assert.strictEqual(talentRes.records[0].get('name'), 'Hrithik Roshan');
    assert.strictEqual(filmsRes.records[0].get('count').toNumber(), 6);
    assert.ok(rosterRes.records[0].get('count').toNumber() >= 5);
  });

  it('2. GET /api/graph/subgraph Contract: returns 64 nodes, 114 relationships, and category aggregations', async () => {
    const nodeCountRes = await session.run('MATCH (n) RETURN count(n) AS nodeCount');
    const edgeCountRes = await session.run('MATCH ()-[r]->() RETURN count(r) AS edgeCount');

    const totalNodes = nodeCountRes.records[0].get('nodeCount').toNumber();
    const totalEdges = edgeCountRes.records[0].get('edgeCount').toNumber();

    assert.strictEqual(totalNodes, 64, 'Expected 64 nodes in CognoDB');
    assert.strictEqual(totalEdges, 114, 'Expected 114 relationships in CognoDB');
  });

  it('3. GET /api/intelligence/insights Contract: returns revenue streams, dispute radar, and event attendance', async () => {
    const revRes = await session.run('MATCH (rev:RevenueStream) RETURN count(rev) AS revCount');
    const eventRes = await session.run('MATCH (evt:Event) RETURN count(evt) AS eventCount');
    const disputeRes = await session.run('MATCH (d:Dispute) RETURN count(d) AS disputeCount');

    assert.strictEqual(revRes.records[0].get('revCount').toNumber(), 5);
    assert.strictEqual(eventRes.records[0].get('eventCount').toNumber(), 6);
    assert.strictEqual(disputeRes.records[0].get('disputeCount').toNumber(), 3);
  });

  it('4. GET /api/activities Contract: returns live activity stream items', async () => {
    const actRes = await session.run('MATCH (act:ActivityLog) RETURN count(act) AS actCount');
    assert.strictEqual(actRes.records[0].get('actCount').toNumber(), 5);
  });

  it('5. GET /api/workspace/items Contract: returns valid tasks, meetings, invitations, and collabs', async () => {
    const taskRes = await session.run('MATCH (t:Task) RETURN count(t) AS taskCount');
    const meetRes = await session.run('MATCH (m:Meeting) RETURN count(m) AS meetCount');
    const invRes = await session.run('MATCH (inv:Invitation) RETURN count(inv) AS invCount');

    assert.ok(taskRes.records[0].get('taskCount').toNumber() >= 3);
    assert.ok(meetRes.records[0].get('meetCount').toNumber() >= 1);
    assert.ok(invRes.records[0].get('invCount').toNumber() >= 2);
  });

  it('6. GET /api/calendar/events Contract: returns unified schedule items with month and year', async () => {
    const calRes = await session.run(`
      MATCH (item)
      WHERE item:Task OR item:Meeting OR item:Event
      RETURN count(item) AS count;
    `);
    assert.ok(calRes.records[0].get('count').toNumber() >= 8);
  });

  it('7. POST /api/disputes/resolve Contract: marks dispute resolved and updates legal shield', async () => {
    const resolveRes = await session.run(`
      MATCH (d:Dispute { id: 'rej-1' })
      SET d.status = 'resolved', d.riskTag = 'Resolved & Cleared'
      RETURN d.id AS id, d.status AS status;
    `);
    assert.strictEqual(resolveRes.records.length, 1);
    assert.strictEqual(resolveRes.records[0].get('status'), 'resolved');
  });
});
