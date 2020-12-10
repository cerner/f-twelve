"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assert = _interopRequireDefault(require("assert"));

var _getDataType = _interopRequireDefault(require("./getDataType"));

describe('#getDataType()', function () {
  it('should handle strings', function () {
    var stringDataType = (0, _getDataType["default"])('one');

    _assert["default"].strictEqual(stringDataType, 'string');
  });
  it('should handle numbers', function () {
    var dataType = (0, _getDataType["default"])(1);

    _assert["default"].strictEqual(dataType, 'number');
  });
  it('should handle arrays', function () {
    var dataType = (0, _getDataType["default"])(true);

    _assert["default"].strictEqual(dataType, 'boolean');
  });
  it('should handle arrays', function () {
    var dataType = (0, _getDataType["default"])([1, 2, 3]);

    _assert["default"].strictEqual(dataType, 'array');
  });
  it('should handle objects', function () {
    var dataType = (0, _getDataType["default"])({
      'one': 1,
      'two': true,
      'three': '3ree'
    });

    _assert["default"].strictEqual(dataType, 'object');
  });
  it('should handle null', function () {
    var dataType = (0, _getDataType["default"])(null);

    _assert["default"].strictEqual(dataType, 'null');
  });
  it('should handle undefined', function () {
    var dataType = (0, _getDataType["default"])(undefined);

    _assert["default"].strictEqual(dataType, 'undefined');
  });
  it('should handle functions', function () {
    var dataType = (0, _getDataType["default"])(function (arg) {
      return console.log(arg);
    });

    _assert["default"].strictEqual(dataType, 'function');
  });
});