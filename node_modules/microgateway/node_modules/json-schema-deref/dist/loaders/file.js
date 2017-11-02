'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (refValue, options, fn) {
  if (!fn) {
    fn = noop;
  }

  var refPath = refValue;
  var baseFolder = options.baseFolder ? _path2.default.resolve(cwd, options.baseFolder) : cwd;

  if (refPath.indexOf('file:') === 0) {
    refPath = refPath.substring(5);
  } else {
    refPath = _path2.default.resolve(baseFolder, refPath);
  }

  var filePath = (0, _utils.getRefFilePath)(refPath);

  function finishIt(err, fileValue) {
    var newVal = void 0;
    if (!err && fileValue) {
      newVal = fileValue;
    }

    return fn(err, newVal);
  }

  return readFile(filePath, finishIt);
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

var noop = function noop() {};

function readFile(filePath, fn) {
  _fs2.default.readFile(filePath, function (err, data) {
    if (err) {
      return fn(err);
    }

    var newValue = void 0;

    try {
      newValue = JSON.parse(data);
    } catch (e) {
      err = e;
    }

    return fn(err, newValue);
  });
}

/**
 * Resolves a file link of a json schema to the actual value it references
 * @param {String} refValue the value. String. Ex. `/some/path/schema.json#/definitions/foo`
 * @param {Object} options tje options
 * @param {String} options.baseFolder the base folder to get relative path files from. Default is `process.cwd()`
 * @param {Function} fn callback (err, newValue). `newValue` is resolved value. If not found it's undefined
 * @private
 */