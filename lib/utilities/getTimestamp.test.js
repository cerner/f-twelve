"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _assert = _interopRequireDefault(require("assert"));

var _getTimestamp = _interopRequireDefault(require("./getTimestamp"));

describe('#getTimestamp()', function () {
  it('should return a string in the expected format', function () {
    var timestamp = (0, _getTimestamp["default"])();

    _assert["default"].strictEqual((0, _typeof2["default"])(timestamp), 'string');

    (0, _assert["default"])(!!timestamp.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d$/));
  });
});