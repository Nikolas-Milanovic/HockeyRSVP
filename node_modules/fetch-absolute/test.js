const expect = require('chai').expect;
const sinon = require('sinon');

const fetchAbsolute = require('.');

const fetchSpy = sinon.spy();
const fetchResponse = 'any';
const fetch = (...params) => {
  fetchSpy(...params);
  return fetchResponse;
}

beforeEach(() => {
  fetchSpy.reset();
});

it('should override absolute paths', () => {
  const fetchLocalhost = fetchAbsolute(fetch)('http://localhost');
  const result = fetchLocalhost('/🍭');

  expect(result).to.equal(fetchResponse);
  expect(fetchSpy.withArgs('/🍭').calledOnce).to.be.false;
  expect(fetchSpy.withArgs('http://localhost/🍭').calledOnce).to.be.true;
});

it('should not override relative paths', () => {
  const fetchLocalhost = fetchAbsolute(fetch)('http://localhost');
  const result = fetchLocalhost('🍭');

  expect(result).to.equal(fetchResponse);
  expect(fetchSpy.withArgs('http://localhost/🍭').calledOnce).to.be.false;
  expect(fetchSpy.withArgs('🍭').calledOnce).to.be.true;
});

it('should not override unrecognised paths', () => {
  const fetchLocalhost = fetchAbsolute(fetch)('http://localhost');
  const watIsDisUrl = () => {};
  const result = fetchLocalhost(watIsDisUrl);

  expect(result).to.equal(fetchResponse);
  expect(fetchSpy.withArgs(watIsDisUrl).calledOnce).to.be.true;
});

it('should ignore anything that\'s not related to the request url', () => {
  const fetchLocalhost = fetchAbsolute(fetch)('http://localhost');
  const fetchParams = { method: 'GET', mode: 'cors', cache: 'default' };
  const result = fetchLocalhost('/🍭', fetchParams);

  expect(result).to.equal(fetchResponse);
  expect(fetchSpy.withArgs('http://localhost/🍭', fetchParams).calledOnce).to.be.true;
});
