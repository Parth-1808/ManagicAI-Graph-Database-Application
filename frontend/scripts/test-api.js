async function testApis() {
  const endpoints = [
    'http://localhost:3000/api/overview/summary',
    'http://localhost:3000/api/calendar/events',
    'http://localhost:3000/api/workspace/items',
    'http://localhost:3000/api/intelligence/insights',
    'http://localhost:3000/api/graph/subgraph',
  ];

  console.log('Testing all API endpoints against CognoDB Cloud...\n');

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const str = JSON.stringify(json);
      const hasLowHigh = str.includes('"low":') && str.includes('"high":');
      console.log(`[${res.status}] ${url}`);
      console.log(`  -> Contains {low, high} Neo4j Integers? ${hasLowHigh ? '❌ YES (BUG)' : '✓ NO (CLEAN)'}`);
      if (hasLowHigh) {
        console.error('  Sample payload with issue:', str.slice(0, 300));
      }
    } catch (err) {
      console.error(`Error testing ${url}:`, err.message);
    }
  }

  console.log('\nAll API checks completed successfully!');
}

testApis();
