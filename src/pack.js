const fp = require('lodash/fp');
const ora = require('ora');
const fs = require('fs');
const util = require('util');
const getEntries = require('./files');
const sass = require('./svg-to-sass');
const css = require('./svg-to-css');

const readFile = util.promisify(fs.readFile);

const shouldSkipReplace = (options) =>
  options.r === true || options['noreplace'] === true;

/**
 * Sanitize prefix for use in CSS variable names.
 *
 * - Trim surrounding whitespace
 * - Convert internal whitespace to hyphens
 * - Remove characters outside [a-zA-Z0-9_-]
 * - Trim leading/trailing hyphens/underscores
 */
function sanitizeCssPrefix(value) {
  if (value == null || typeof value !== 'string') return '';
  const trimmed = value.trim();
  const withHyphens = trimmed.replace(/\s+/g, '-');
  const cleaned = withHyphens.replace(/[^a-zA-Z0-9_-]/g, '');
  return cleaned.replace(/^[-_]+|[-_]+$/g, '');
}

function getEffectivePrefix(options) {
  if (options.tailwind && options.prefix === undefined) {
    return sanitizeCssPrefix('svgpack');
  }
  return sanitizeCssPrefix(options.prefix ?? '');
}

function buildStandardCssOutput(cssVars, options) {
  let result = '';
  if (cssVars.length > 0) {
    result += `:root {\n${cssVars.join('\n').trimEnd()}\n}\n`;
  }
  if (options.background) {
    const backgroundClass =
      options.background === true ? 'svgpack-background' : options.background;
    result += `\n.${backgroundClass} {\n`;
    result += `  background: var(--image, var(--svgpack-image))\n`;
    result += `    center / var(--image--bg-size, var(--svgpack-bg-size, 100% 100%))\n`;
    result += `    no-repeat;\n`;
    result += `  width: var(--image--width, var(--svgpack-width, 1em));\n`;
    result += `  height: var(--image--height, var(--svgpack-height, 1em));\n`;
    result += `}\n`;
  }
  if (options.mask) {
    const maskClass = options.mask === true ? 'svgpack-mask' : options.mask;
    result += `\n.${maskClass} {\n`;
    result += `  -webkit-mask: var(--image, var(--svgpack-image))\n`;
    result += `    center / var(--image--mask-size, var(--svgpack-mask-size, 100% 100%))\n`;
    result += `    no-repeat;\n`;
    result += `  mask: var(--image, var(--svgpack-image))\n`;
    result += `    center / var(--image--mask-size, var(--svgpack-mask-size, 100% 100%))\n`;
    result += `    no-repeat;\n`;
    result += `  background-color: var(--image--color, var(--svgpack-color, currentColor));\n`;
    result += `  width: var(--image--width, var(--svgpack-width, 1em));\n`;
    result += `  height: var(--image--height, var(--svgpack-height, 1em));\n`;
    result += `}\n`;
  }
  return result;
}

function buildTailwindCssOutput(cssVars, options) {
  let result = '';
  if (cssVars.length > 0) {
    result += `@theme {\n${cssVars.join('\n').trimEnd()}\n}\n\n`;
  }
  // Token selector utility (always in Tailwind mode)
  // Utility names stay `svgpack-*`, but the selected theme variables must match the chosen prefix.
  const effectivePrefix = getEffectivePrefix(options);
  const tokenSelector = effectivePrefix ? `--${effectivePrefix}-*` : `--*`;

  result += `
@utility svgpack-* {
  --svgpack-image: --value(${tokenSelector});
}
`.trimStart();

  result += `
@utility svgpack-mask {
  -webkit-mask: var(--image, var(--svgpack-image))
    center / var(--image--mask-size, var(--svgpack-mask-size, 100% 100%))
    no-repeat;
  mask: var(--image, var(--svgpack-image))
    center / var(--image--mask-size, var(--svgpack-mask-size, 100% 100%))
    no-repeat;
  background-color: var(--image--color, var(--svgpack-color, currentColor));
  width: var(--image--width, var(--svgpack-width, 1em));
  height: var(--image--height, var(--svgpack-height, 1em));
}
`;

  result += `
@utility svgpack-bg {
  background: var(--image, var(--svgpack-image))
    center / var(--image--bg-size, var(--svgpack-bg-size, 100% 100%))
    no-repeat;
  width: var(--image--width, var(--svgpack-width, 1em));
  height: var(--image--height, var(--svgpack-height, 1em));
}
`;

  return result;
}

/**
 * Given a list of sources, pack them
 */
module.exports = function packsvg(options = {}) {
  // Output mode selection (mutually exclusive)
  const hasCssFlag = options.css === true || options['css-vars'] === true;
  const hasSassFlag = options.sass === true;
  const hasTailwindFlag = options.tailwind === true;

  const selectedModes =
    (hasCssFlag ? 1 : 0) + (hasSassFlag ? 1 : 0) + (hasTailwindFlag ? 1 : 0);
  if (selectedModes > 1) {
    throw new Error(
      'Choose only one output mode: --css/--css-vars, --sass, or --tailwind'
    );
  }

  const mode = hasTailwindFlag ? 'tailwind' : hasSassFlag ? 'sass' : 'css';
  const isCssMode = mode === 'css' || mode === 'tailwind';

  const effectivePrefix = getEffectivePrefix(options);
  const toSassFunction = sass(options);
  const toCssFunction = css({ ...options, effectivePrefix });
  const skipReplace = shouldSkipReplace(options);

  return function packsvg(sources) {
    const joinAll = (xs) => Promise.all(xs).then((xs) => xs.join(''));
    const entries = getEntries();

    const processFile = (name) =>
      readFile(name).then(
        isCssMode ? toCssFunction(name) : toSassFunction(name)
      );

    return entries(sources)
      .then(fp.map(withSpinners(processFile)))
      .then(joinAll)
      .then((all) => {
        if (isCssMode) {
          const lines = all.split('\n');
          const cssVars = [];
          const cssClasses = [];

          let currentSection = 'vars';
          for (const line of lines) {
            if (line.trim().startsWith('--')) {
              cssVars.push(line);
              currentSection = 'vars';
            } else if (line.trim().startsWith('.')) {
              cssClasses.push(line);
              currentSection = 'classes';
            } else {
              if (currentSection === 'vars') {
                cssVars.push(line);
              } else {
                cssClasses.push(line);
              }
            }
          }
          const result = options.tailwind
            ? buildTailwindCssOutput(cssVars, options)
            : buildStandardCssOutput(cssVars, options);
          return result;
        }
        // SCSS mode output
        return skipReplace ? all : REPLACE_FN + all;
      });
  };
};

function withSpinners(process) {
  return function (name) {
    const spinner = ora(`Processing ${name}...`).start();
    return process(name).then((value) => {
      spinner.succeed();
      return value;
    });
  };
}

const REPLACE_FN = `
/// Replace \`$search\` with \`$replace\` in \`$string\`
/// @author Hugo Giraudel
/// @param {String} $string - Initial string
/// @param {String} $search - Substring to replace
/// @param {String} $replace ('') - New value
/// @return {String} - Updated string
@function str-replace($string, $search, $replace: '') {
  $index: str-index($string, $search);

  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
  }

  @return $string;
}

`;
