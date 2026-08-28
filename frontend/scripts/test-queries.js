const neo4j = require('neo4j-driver');

const URI = process.env.COGNODB_URI || 'bolt+s://db-62c8531c.bravo.databases.cognodb.com';
const USER = process.env.COGNODB_USER || 'cognodb';
const PASSWORD = process.env.COGNODB_PASSWORD || 'af829ec1c54011534c1aab45a9dbcd3f';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

async function testAll() {
  const session = driver.session();
  try {
    console.log('Testing ManagicAI openCypher graph queries against CognoDB Cloud...\n');

    // 1. Talent Root & Active Projects
    const q1 = await session.run(`
      MATCH (t:Talent { id: 'root-hrithik' })
      OPTIONAL MATCH (t)-[:STARS_IN]->(f:Film)
      OPTIONAL MATCH (t)-[:COMMERCIAL_EQUITY]->(b:Brand)
      OPTIONAL MATCH (t)-[:ATTENDS_GALAS]->(e:Event)
      OPTIONAL MATCH (t)-[:PROTECTED_BY]->(c:Covenant)
      RETURN 
        t.name AS superstar,
        t.portfolioValuation AS valuation,
        t.clearanceScore AS clearance,
        collect(DISTINCT f.title) AS films,
        collect(DISTINCT b.brand) AS brands,
        collect(DISTINCT e.name) AS galas,
        collect(DISTINCT c.title) AS shields
    `);
    console.log('Q1 (Talent Root Node Traversal):');
    const r1 = q1.records[0];
    console.log(`  * Talent: ${r1.get('superstar')} [Clearance: ${r1.get('clearance')}%]`);
    console.log(`  * Valuation: ${r1.get('valuation')}`);
    console.log(`  * Films: ${r1.get('films').join(', ')}`);
    console.log(`  * Brands: ${r1.get('brands').join(', ')}`);
    console.log(`  * Galas: ${r1.get('galas').join(', ')}`);
    console.log(`  * Shields: ${r1.get('shields').join(', ')}`);

    // 2. AI Conflict Radar (Blocked Exclusivity & Likeness Collisions)
    const q2 = await session.run(`
      MATCH (c:Covenant)-[:BLOCKS]->(d:Dispute)
      OPTIONAL MATCH (c)-[:LEGAL_GOVERNANCE]->(b:Brand)
      RETURN 
        c.title AS shield,
        c.valuation AS penaltyShield,
        d.title AS blockedCollision,
        d.description AS reason,
        d.riskTag AS riskTag,
        collect(DISTINCT b.brand) AS protectedBrands
    `);
    console.log('\nQ2 (AI Conflict Radar & Shield Enforcements):');
    q2.records.forEach(r => {
      console.log(`  * Shield: ${r.get('shield')} (${r.get('penaltyShield')})`);
      console.log(`    - Blocked Collision: ${r.get('blockedCollision')} [${r.get('riskTag')}]`);
      console.log(`    - Reason: ${r.get('reason')}`);
      console.log(`    - Protected Brands: ${r.get('protectedBrands').join(', ')}`);
    });

    // 3. Stunt & Overseas Multi-Hop Critical Path to Cannes
    const q3 = await session.run(`
      MATCH path = (t1:Task { id: 'evt-1' })-[:ENABLES]->(t2:Task { id: 'evt-4' })-[:REQUIRED_FOR]->(e:Event { id: 'ent-cannes' })-[:PRECEDES]->(i:Event { id: 'ent-iifa' })
      OPTIONAL MATCH (cov:Covenant)-[:UNLOCKS]->(t2)
      RETURN 
        t1.title AS shoot,
        t2.title AS overseasBriefing,
        e.name AS gala,
        i.name AS nextGala,
        cov.title AS requiredCovenant
    `);
    console.log('\nQ3 (Multi-Hop Stunt Precedence & Release Chain):');
    q3.records.forEach(r => {
      console.log(`  * Shoot: ${r.get('shoot')}`);
      console.log(`    ↳ Overseas Prep: ${r.get('overseasBriefing')} (Protected by: ${r.get('requiredCovenant')})`);
      console.log(`    ↳ VIP Gala: ${r.get('gala')}`);
      console.log(`    ↳ Grand Finale: ${r.get('nextGala')}`);
    });

    // 4. Creative Collaborators Hub Links
    const q4 = await session.run(`
      MATCH (p:Person:Collaborator)
      OPTIONAL MATCH (p)-[r]->(target)
      RETURN p.name AS collaborator, p.role AS role, type(r) AS rel, coalesce(target.title, target.name, target.id) AS entity
    `);
    console.log('\nQ4 (Creative Industry Network):');
    q4.records.forEach(r => {
      console.log(`  * ${r.get('collaborator')} (${r.get('role')}) -[${r.get('rel')}]-> ${r.get('entity')}`);
    });

    console.log('\n✓ All ManagicAI openCypher queries validated successfully against CognoDB Cloud!');

  } finally {
    await session.close();
    await driver.close();
  }
}

testAll().catch(console.error);

