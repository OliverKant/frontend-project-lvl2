import _ from 'lodash';

const getIndent = (depth) => '  '.repeat(depth);

const isObject = (data, depth, func) => {
  if (!_.isObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => func(key, value, ' ', depth + 2));

  return ['{', ...result, `${getIndent(depth + 1)}}`].join('\n');
};

const stringify = (key, value, sign, depth) => `${getIndent(depth)}${sign} ${key}: ${isObject(value, depth, stringify)}`;

const typeAction = {
  added: ({ key, value }, depth) => stringify(key, value, '+', depth),
  delete: ({ key, value }, depth) => stringify(key, value, '-', depth),
  update: (object, depth) => [
    stringify(object.key, object.oldValue, '-', depth),
    stringify(object.key, object.newValue, '+', depth),
  ],
  nested: ({ key, children }, depth, func) => stringify(key, func(children, depth + 1), ' ', depth),
  unchanged: ({ key, value }, depth) => stringify(key, value, ' ', depth),
};

const makeStylish = (data, depth = 0) => {
  const result = data.flatMap((item) => typeAction[item.type](item, depth + 1, makeStylish));
  return ['{', ...result, `${getIndent(depth)}}`].join('\n');
};

export default makeStylish;
