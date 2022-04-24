import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
