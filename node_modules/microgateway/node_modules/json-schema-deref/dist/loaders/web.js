'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, options, fn) {
  if (!fn) {
    fn = noop;
  }

  if (options.cache !== false) {
    var cachedValue = _memoryCache2.default.get(url);
    if (cachedValue) {
      return fn(null, (0, _clone2.default)(cachedValue));
    }
  }

  var urlObj = (0, _url.parse)(url);
  if (urlObj.hostname === 'json-schema.org') {
    return fn();
  }

  var reqUrl = url;
  var hashIndex = url.indexOf('#');
  if (hashIndex > 0) {
    reqUrl = url.substring(0, hashIndex);
  }

  _request2.default.get({ url: reqUrl, json: true }, function (err, response, body) {
    if (err) {
      return fn(err);
    }

    var newVal = void 0;
    if (!err && body) {
      newVal = body;
    }

    if (options.cache !== false) {
      _memoryCache2.default.put(url, newVal, options.cacheTTL || defaultTTL);
    }

    return fn(err, newVal);
  });
};

var _url = require('url');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

var defaultTTL = 300000; // ms

/**
 * Resolves a web link of a json schema to the actual value it references
 * It ignores web links to anywhere under json-schema.org host
 * @param {String} url the ref url value. String. Ex. `http://www.mysite.com/schema.json#/definitions/foo`
 * @param {Object} options the options
 * @param {Boolean} options.cache whether to cache the result from the request. true if to cache, false otherwise.
 * @param {Number} options.cacheTTL the time to keep request result in cache. Default is 5 minutes.
 * @param {Function} fn callback (err, newValue). `newValue` is resolved value. If not found it's undefined
 * @private
 */