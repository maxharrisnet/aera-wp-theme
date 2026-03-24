#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stateFile = resolve(__dirname, '.watch-state.json');

writeFileSync(stateFile, JSON.stringify({ processed: {} }, null, 2));
console.log('Watch state cleared.');
