import path from 'path';
import { readFileSync } from 'fs';
import compare from './compare.js';
import parse from './parsers.js';
import getDiff from './formatters/index.js';

const getParsedData = (files) => {
  const format = path.extname(files).slice(1);

  const fullPath = path.resolve(process.cwd(), files);
  const data = readFileSync(fullPath, { encoding: 'utf-8' });

  return parse(data, format);
};

const generateDiff = (fileName1, fileName2, format = 'stylish') => {
  const parse1 = getParsedData(fileName1);
  const parse2 = getParsedData(fileName2);

  const data = compare(parse1, parse2);
  return getDiff(data, format);
};

export default generateDiff;
