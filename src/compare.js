import _ from 'lodash';

const compare = (file1, file2) => {
  const equalKeys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(equalKeys);

  return sortedKeys.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { type: 'delete', key, value: file1[key] };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { type: 'nested', key, children: compare(file1[key], file2[key]) };
    }
    if (file1[key] !== file2[key]) {
      return {
        type: 'update', key, oldValue: file1[key], newValue: file2[key],
      };
    }
    return { type: 'unchanged', key, value: file1[key] };
  });
};

export default compare;
