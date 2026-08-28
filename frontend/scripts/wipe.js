/**
 * CognoDB Graph Database Wipe Script
 * Run with: npm run wipe or node scripts/wipe.js
 */

const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');

// Read .env.local if present
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

async function wipeDatabase() {
  console.log('Connecting to CognoDB Cloud over Bolt Protocol...');
  console.log('URI:', URI);

  const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD), {
    maxConnectionPoolSize: 5,
    connectionTimeout: 10000,
  });

  const session = driver.session();

  try {
    const countBefore = await session.run('MATCH (n) RETURN count(n) AS count');
    const totalNodesBefore = countBefore.records[0].get('count').toString();
    console.log(`Current node count before wipe: ${totalNodesBefore}`);

    console.log('Executing MATCH (n) DETACH DELETE n...');
    await session.run('MATCH (n) DETACH DELETE n');

    const countAfter = await session.run('MATCH (n) RETURN count(n) AS count');
    const totalNodesAfter = countAfter.records[0].get('count').toString();

    console.log(`✓ Successfully deleted all seeded graph data!`);
    console.log(`Remaining node count: ${totalNodesAfter}`);
  } catch (error) {
    console.error('Error during wipe:', error);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

wipeDatabase();
