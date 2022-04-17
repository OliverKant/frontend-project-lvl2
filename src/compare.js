import _ from 'lodash';

const sign = {
  plus: '+',
  minus: '-',
}

const compare = (file1, file2) => {

  const identicalKeys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(identicalKeys);

  const result = sortedKeys.map((key) => {

    if (file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;

    } else if (_.has(file1, key) && !_.has(file2, key)) {
      return `  ${sign.minus} ${key}: ${file1[key]}`;

    } else if (!_.has(file1, key) && _.has(file2, key)) {
      return `  ${sign.plus} ${key}: ${file2[key]}`;

    } else if (file1[key] !== file2[key]) {
      return `  ${sign.minus} ${key}: ${file1[key]}\n  ${sign.plus} ${key}: ${file2[key]}`;
    }
  }).join('\n');
  return `{\n${result}\n}`
}

export default compare;