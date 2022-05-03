import makeStylish from './stylish.js';
import plainStylish from './plain.js';

const type = {
  stylish: makeStylish,
  plain: plainStylish,
};

export default (data, format) => type[format](data);
