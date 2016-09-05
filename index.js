'use strict';

const fs = require('fs-extra');
const path = require('path');

const output = require('./lib/output');

const atm = options => {
  return (req, res, next) => {
    const render = res.render;

    // Override res.render
    res.render = (view, opts, cb) => { // eslint-disable-line no-param-reassign
      render.call(res, view, opts, (err, html) => {
        if (err) {
          throw new Error(err);
        }

        const url = path.join(process.cwd(), options.public, req.url, 'index.html');
        const query = req.query;
        const status = res.statusCode.toString();

        if (query.hasOwnProperty('clean')) {
          fs.removeSync(url);
        }

        if (status.charAt(0) === '2') {
          output(url, html);
        }

        if (typeof cb === 'function') {
          return cb(err, html);
        }

        res.send(html);

        return html;
      });
    };

    next();
  };
};

module.exports = atm;
