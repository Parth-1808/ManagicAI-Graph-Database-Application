/**
 * Local CI Verification Runner
 * Runs all CI/CD pipeline steps locally in sequence
 * Run with: npm run ci:check
 */

const { execSync } = require('child_process');

const STAGES = [
  {
    name: '1. TypeScript Typecheck',
    command: 'npx tsc --noEmit',
  },
  {
    name: '2. Automated Unit & Integration Tests',
    command: 'node --test tests/*.test.js',
  },
  {
    name: '3. CognoDB Cloud Live openCypher Queries',
    command: 'node scripts/test-queries.js',
  },
  {
    name: '4. Next.js Production Build Validation',
    command: 'npx next build',
  },
];

console.log('====================================================');
console.log('🚀 Running ManagicAI CI/CD Automated Verification');
console.log('====================================================\n');

let failed = false;

for (const stage of STAGES) {
  process.stdout.write(`⏳ [Running] ${stage.name}... `);
  const start = Date.now();
  try {
    execSync(stage.command, { stdio: 'pipe' });
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\x1b[32m✔ PASSED\x1b[0m (${duration}s)`);
  } catch (error) {
    console.log(`\x1b[31m✖ FAILED\x1b[0m`);
    console.error('\n--- Command Output ---');
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    console.error('----------------------\n');
    failed = true;
    break;
  }
}

console.log('\n====================================================');
if (failed) {
  console.log('❌ CI/CD Pipeline Checks FAILED. Please review errors above.');
  console.log('====================================================\n');
  process.exit(1);
} else {
  console.log('✅ ALL CI/CD Pipeline Checks PASSED (100% Ready for Deploy)!');
  console.log('====================================================\n');
  process.exit(0);
}
