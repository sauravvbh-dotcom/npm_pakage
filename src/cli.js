#!/usr/bin/env node

import process from 'node:process';
import { checkEnv } from './checker.js';
import { syncEnv } from './parser.js';

export function printHelp() {
  console.log(`
env-guard-cli - Simple environment variable checker

Usage:
  npx env-guard-cli --check    Check if variables in code exist in .env
  npx env-guard-cli --sync     Generate or update .env.example
  npx env-guard-cli --help     Show this help message
`);
}

export function runCLI() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('--sync')) {
    syncEnv();
    process.exit(0);
  }

  if (args.includes('--check') || args.length === 0) {
    const success = checkEnv();
    process.exit(success ? 0 : 1);
  }

  console.log('Unknown option. Run with --help to see available commands.');
  process.exit(1);
}

runCLI();

