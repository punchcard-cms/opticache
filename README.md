# OptiCache [![Build Status](https://travis-ci.org/punchcard-cms/opticache.svg?branch=master)](https://travis-ci.org/punchcard-cms/opticache) [![Coverage Status](https://coveralls.io/repos/github/punchcard-cms/opticache/badge.svg?branch=master)](https://coveralls.io/github/punchcard-cms/opticache?branch=master)

Express middleware to statically cache renders as HTML in your public folder, optimized through [critical](https://www.npmjs.com/package/critical) and [html-minifier](https://www.npmjs.com/package/html-minifier).

## Installation and Usage

`npm i opticache --save`


```javascript
const express = require('express');
const opticache = require('opticache');

const app = express();

// Add Express static folder
app.use(express.static('public'));
// Add Opticache to all routes (can be added individually too)
app.use(opticache({
  public: 'public',
}));
```

## Options

* `public` - The public folder that Express serves as a static
* `minify` - [html-minifer](https://www.npmjs.com/package/html-minifier#options-quick-reference) configuration options
