# Fetch Absolute

> Fetch with default absolute URLs.

[![Build Status](https://travis-ci.org/zurfyx/fetch-absolute.svg?branch=master)](https://travis-ci.org/zurfyx/fetch-absolute)
[![npm version](https://badge.fury.io/js/fetch-absolute.svg)](https://badge.fury.io/js/fetch-absolute)

Tired of writing `http://localhost` in front of every [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request?
With fetch absolute you'll only write it once per host in your whole environment.

It works with both [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [node-fetch](https://www.npmjs.com/package/node-fetch).

## Install

```
npm install fetch-absolute
```

## Usage

```
var fetch = require('node-fetch');
var fetchAbsolute = require('fetch-absolute');

global.fetchApi = fetchAbsolute(fetch)('http://localhost:3030');
```

## Example

Using node-fetch and fetch-absolute with Node 7 async/await:

```
const fetch = require('node-fetch');
const fetchAbsolute = require('fetch-absolute');

const fetchApi = fetchAbsolute(fetch)('http://localhost:3030');

it('should should display "It works!"', async () => {
  const response = await fetchApi('/');
  const json = await response.json();
  expect(json).to.eql({ msg: 'It works!' });
});
```

Requested absolute URLs must start with `/`, otherwise they will be treated as relative.

## Related

- [superagent-absolute](https://github.com/zurfyx/superagent-absolute) - Superagent with default absolute URLs.

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)