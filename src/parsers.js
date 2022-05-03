import yaml from 'js-yaml';
import _ from 'lodash';

const mapping = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const formatter = (data, format) => {
  if (!_.has(mapping, format)) {
    throw new Error('the chosen format is not valid');
  }
  return mapping[format](data);
};

export default formatter;
