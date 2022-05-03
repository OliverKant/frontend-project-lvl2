import path from 'path';
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe.each(['stylish', 'plain', 'json'])('Test format', (format) => {
  const data = path.join(__dirname, '..', '__fixtures__', `${format}Diff.txt`);
  const expected = readFileSync(data, { encoding: 'utf-8' });

  test.each(['json', 'yml'])('Test extension', (extension) => {
    const file1 = getFixturesPath(`file1.${extension}`);
    const file2 = getFixturesPath(`file2.${extension}`);

    const actual = generateDiff(file1, file2, format);
    expect(actual).toEqual(expected);
  });
});
