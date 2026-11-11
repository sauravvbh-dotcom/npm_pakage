import fs from 'node:fs';
import path from 'node:path';

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build']);
const SUPPORTED_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx']);

export function findFiles(dir = '.') {
  let fileList = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (IGNORED_DIRS.has(item.name)) {
        continue;
      }
      fileList = fileList.concat(findFiles(fullPath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }

  return fileList;
}

export function scanVariables(dir = '.') {
  const files = findFiles(dir);
  const found = new Set();
  const pattern = /process\.env\.([A-Za-z0-9_]+)/g;

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = pattern.exec(code)) !== null) {
      found.add(match[1]);
    }
  }

  return Array.from(found).sort();
}
