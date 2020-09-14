"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _getTimestamp = _interopRequireDefault(require("./getTimestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe('#getTimestamp()', function () {
  it('should return a string in the expected format', function () {
    var timestamp = (0, _getTimestamp["default"])();

    _assert["default"].strictEqual(_typeof(timestamp), 'string');

    (0, _assert["default"])(!!timestamp.match(/\d\d:\d\d:\d\d\.\d\d\d/));
  });
});