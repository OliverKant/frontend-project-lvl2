import makeStylish from './stylish.js';
import plainStylish from './plain.js';
import makeJson from './json.js';

const type = {
  stylish: makeStylish,
  plain: plainStylish,
  json: makeJson,
};

export default (data, format) => type[format](data);
