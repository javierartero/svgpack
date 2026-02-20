/* eslint-disable no-console */
const { version } = require('../package.json');

const HELP = `
  Usage: svgpack [sources] [options]

  Options:

  -h, --help                          output usage information
  -v, --version                       output the version number
  -r, --no-replace                    skip replace-str function from output
  --css, --css-vars                   generate CSS variables (default)
  --tailwind                          Tailwind v4 native output (@theme / @utility)
  --sass                              generate SCSS functions instead of CSS variables
  --prefix <name>                     Prefix for generated CSS variables.
                                      Default: none (CSS mode), "svgpack" (--tailwind mode)
  --mask [class-name]                 Generate mask utility class (default: svgpack-mask)
  --background [class-name]           Generate background utility class (legacy default: svgpack-background)

  Examples:
    \`svgpack .\`                      pack all svg files in the current folder as CSS variables
    \`svgpack my-icons/ > icons.css\`  output to file
    \`svgpack . --tailwind\`           Tailwind v4 native output (@theme and @utility)
    \`svgpack . --sass\`               pack all svg files as SCSS functions
    \`svgpack . --mask\`               generate CSS variables with mask class
    \`svgpack . --mask my-mask\`       generate CSS variables with custom mask class
    \`svgpack . --background\`         generate CSS variables with background class
    \`svgpack . --background my-icon\` generate CSS variables with custom background class
`;

function printVersion() {
  console.log(`v${version}`);
}

function printHelp() {
  console.log(HELP);
}

module.exports = { printHelp, printVersion };
