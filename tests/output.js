import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import output from '../lib/output';

const url = path.join(process.cwd(), 'fixtures', 'test', 'index.html');
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`;

test('Output', t => {
  return output(url, html, {
    public: 'fixtures',
  }).then(result => {
    const written = fs.readFileSync(url).toString();

    t.true(result.indexOf('tests/fixtures/tmp-') > 0, 'A Critical tmp file was deleted');
    t.true(written.indexOf('background:red') > 0, 'CSS has been inlined');
    t.true(written.indexOf('loadCSS') > 0, 'loadCSS has been included');
  }).catch(e => {
    console.error(e); // eslint-disable-line no-console

    t.fail();
  });
});


test.after('Output', () => {
  fs.removeSync(path.join(process.cwd(), 'fixtures', 'test'));
});
