/**
 * To give support IE browser must change some characters
 *
 * @see https://github.com/javierartero/svgpack/issues/1
 * @see https://codepen.io/jakob-e/pen/doMoML
 *
 * @params {Object} options
 * @params {String|Buffer} svg
 * @return {String} the sanitized svg
 */
module.exports = function sanitize() {
  return (svg) =>
    svg
      .toString()
      .replace(
        '<svg',
        ~svg.indexOf('xmlns')
          ? '<svg'
          : '<svg xmlns="http://www.w3.org/2000/svg"'
      )
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' ');
  //
  //    The maybe list (add on documented fail)
  //
  //  .replace(/&/g, '%26')
  //  .replace('|', '%7C')
  //  .replace('[', '%5B')
  //  .replace(']', '%5D')
  //  .replace('^', '%5E')
  //  .replace('`', '%60')
  //  .replace(';', '%3B')
  //  .replace('?', '%3F')
  //  .replace(':', '%3A')
  //  .replace('@', '%40')
  //  .replace('=', '%3D')
};
