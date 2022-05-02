import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getParsed = () => {
  const expected = path.join(__dirname, '..', '__fixtures__', 'stylishDiff.txt');
  return readFileSync(expected, { encoding: 'utf-8' });
};

const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('typical value', () => {
  const file1 = getFixturesPath('file1.json');
  const file2 = getFixturesPath('file2.json');
  const data = getParsed();

  const actual = generateDiff(file1, file2, 'stylish');
  expect(actual).toEqual(data);
});
