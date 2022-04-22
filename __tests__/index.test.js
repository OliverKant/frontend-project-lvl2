import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('typical value', () => {
  const actual = genDiff(getFixturesPath('file1.json'), getFixturesPath('file2.json'));
  expect(actual).toStrictEqual(expected);
});
