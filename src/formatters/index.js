import makeStylish from './stylish.js';

const type = {
  stylish: makeStylish,
};

export default (data, format) => type[format](data);
