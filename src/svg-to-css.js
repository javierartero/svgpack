const optimizer = require('./optimizer');
const sanitizer = require('./sanitizer');
const toSlugCase = require('to-slug-case');
const { basename } = require('path');

module.exports = function (options = {}) {
  const optimize = optimizer(options.optimizer);
  const sanitize = options.sanitize === false ? (x) => x : sanitizer();

  const prefix = options.effectivePrefix ?? '';

  return function toCssVariable(filename) {
    const name = toSlugCase(basename(filename, '.svg'));

    return function (svg) {
      return optimize(svg.toString()).then((optimized) => {
        const sanitizedSvg = sanitize(optimized);
        return template(name, sanitizedSvg, prefix);
      });
    };
  };
};

function template(name, svg, prefix = '') {
  const encodedSvg = svg.replace(/#/g, '%23').replace(/\s+/g, ' ').trim();
  const varName = prefix ? `${prefix}-${name}` : name;
  const output = `  --${varName}: url("data:image/svg+xml,${encodedSvg}");\n`;

  return output;
}
