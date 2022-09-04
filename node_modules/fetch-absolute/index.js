'use strict';

module.exports = fetch => baseUrl => (
  (url, ...params) => {
    if (typeof url === 'string' && url.startsWith('/')) {
      return fetch(baseUrl + url, ...params);
    }
    return fetch(url, ...params);
  }
);
