import _ from 'lodash';
import makeStylish from './stylish.js';
import plainStylish from './plain.js';
import makeJson from './json.js';

const type = {
  stylish: makeStylish,
  plain: plainStylish,
  json: makeJson,
};

const formatter = (data, format) => {
  if (!_.has(type, format)) {
    throw new Error('the chosen format is not valid');
  }
  return type[format](data);
};

export default formatter;
