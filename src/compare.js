import _ from 'lodash';

const sign = {
  plus: '+',
  minus: '-',
};

const compare = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const equalKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(equalKeys);

  const result = sortedKeys.map((key) => {
    if (file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `  ${sign.minus} ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  ${sign.plus} ${key}: ${file2[key]}`;
    }
    return `  ${sign.minus} ${key}: ${file1[key]}\n  ${sign.plus} ${key}: ${file2[key]}`;
  }).join('\n');
  return `{\n${result}\n}`;
};

export default compare;
