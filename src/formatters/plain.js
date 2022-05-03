import _ from 'lodash';

const isObject = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : value;
  }
  return '[complex value]';
};

const typeAction = {
  added: (key, { value }) => `Property '${key.join('.')}' was added with value: ${isObject(value)}`,
  delete: (key) => `Property '${key.join('.')}' was removed`,
  update: (key, { oldValue, newValue }) => `Property '${key.join('.')}' was updated. From ${isObject(oldValue)} to ${isObject(newValue)}`,
  nested: (key, { children }, func) => func(children, key),
  unchanged: () => [],
};

const plainStylish = (data, keys = []) => data.flatMap((item) => {
  const key = [...keys, item.key];
  return typeAction[item.type](key, item, plainStylish);
}).join('\n');

export default plainStylish;
