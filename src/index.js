import path from 'path';
import { readFileSync } from 'fs';
import compare from './compare.js';

const parse = (files) => {
  const fullPath = path.resolve(process.cwd(), files);
  const data = readFileSync(fullPath, { encoding: 'utf-8' });
  return JSON.parse(data);
};

const genDiff = (fileName1, fileName2) => {
  const parse1 = parse(fileName1);
  const parse2 = parse(fileName2);

  return compare(parse1, parse2);
};

export default genDiff;
