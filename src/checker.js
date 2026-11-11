import { scanVariables } from './scanner.js';
import { parseEnvFile } from './parser.js';

export function checkEnv(dir = '.', envFile = '.env') {
  const usedVars = scanVariables(dir);
  const definedVars = parseEnvFile(envFile);

  const missing = usedVars.filter((v) => !definedVars.has(v));
  const unused = Array.from(definedVars).filter((v) => !usedVars.includes(v));

  console.log('=== env-guard check ===');
  console.log(`Directory: ${dir}`);
  console.log(`Env file:  ${envFile}\n`);

  if (missing.length > 0) {
    console.log('Missing variables (used in code, but missing in .env):');
    for (const v of missing) {
      console.log(`  - ${v}`);
    }
  }

  if (unused.length > 0) {
    console.log('\nUnused variables (defined in .env, but not used in code):');
    for (const v of unused) {
      console.log(`  - ${v}`);
    }
  }

  if (missing.length === 0) {
    console.log('All variables used in code are defined in .env.');
    return true;
  } else {
    console.log(`\nCheck failed: ${missing.length} missing variable(s).`);
    return false;
  }
}
