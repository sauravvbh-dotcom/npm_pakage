import fs from 'node:fs';
import { scanVariables } from './scanner.js';

export function parseEnvFile(filePath = '.env') {
  const vars = new Set();

  if (!fs.existsSync(filePath)) {
    return vars;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalIndex = trimmed.indexOf('=');
    if (equalIndex > 0) {
      const key = trimmed.slice(0, equalIndex).trim();
      if (key) {
        vars.add(key);
      }
    }
  }

  return vars;
}

export function syncEnv(dir = '.', exampleFile = '.env.example') {
  const usedVars = scanVariables(dir);
  const existingVars = parseEnvFile(exampleFile);

  let content = '';
  if (fs.existsSync(exampleFile)) {
    content = fs.readFileSync(exampleFile, 'utf8');
  }

  const newVars = usedVars.filter((v) => !existingVars.has(v));

  if (newVars.length === 0) {
    console.log(`${exampleFile} is already up to date.`);
    return;
  }

  if (content && !content.endsWith('\n')) {
    content += '\n';
  }

  for (const v of newVars) {
    content += `${v}=\n`;
  }

  fs.writeFileSync(exampleFile, content, 'utf8');
  console.log(`Updated ${exampleFile} with ${newVars.length} new variable(s).`);
}
