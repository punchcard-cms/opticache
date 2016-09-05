'use strict';

const fs = require('fs-extra');
const path = require('path');
const minify = require('html-minifier').minify;
const critical = require('critical');
const del = require('del');

const config = require('./config');

/*
 * Promise version of fs.outputFile
 *
 * @param {string} url - URL of file to write
 * @param {string} html - String HTML
 *
 * @returns {promise} - Promise version of fs.outputFile
 */
/* istanbul ignore next */
// Ignoring from test coverage because it's a simple promise wrapper for fs.outputFile
const write = (url, html) => {
  return new Promise((res, rej) => {
    fs.outputFile(url, html, (err, data) => {
      if (err) {
        rej(err);
      }
      else {
        res(data);
      }
    });
  });
};

/*
 * Output and optimize HTML
 *
 * @param {string} url - URL of file to write
 * @param {string} html - String HTML
 * @param {object} options - Object of options to use
 *
 * @returns {promise}
 */
const output = (url, html, options) => {
  const base = path.join(process.cwd(), options.public);

  return write(url, html).then(() => {
    return critical.generate({
      inline: true,
      dest: url,
      base,
      html,
    });
  }).then(result => {
    const minified = minify(result.toString(), options.minify || config.minify);

    return write(url, minified);
  }).then(() => {
    return del(path.join(base, 'tmp-*.html'));
  }).then(paths => {
    const done = `Deleted files and folders: \n ${paths.join('\n')}`;

    return done;
  });
};

module.exports = output;
