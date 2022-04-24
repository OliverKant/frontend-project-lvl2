import path from 'path';
import { readFileSync } from 'fs';
import compare from './compare.js';
import parse from './parsers.js';

const getParsedData = (files) => {
  const format = path.extname(files);

  const fullPath = path.resolve(process.cwd(), files);
  const data = readFileSync(fullPath, { encoding: 'utf-8' });

  return parse(data, format);
};

const genDiff = (fileName1, fileName2) => {
  const parse1 = getParsedData(fileName1);
  const parse2 = getParsedData(fileName2);

  return compare(parse1, parse2);
};

export default genDiff;
