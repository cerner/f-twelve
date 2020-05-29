"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _parseStack = _interopRequireDefault(require("./parseStack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('#parseStack()', function () {
  it('should parse stack with backslashes', function () {
    var parsed = (0, _parseStack["default"])('\n\n  at fn (C:\\path\\file.js:123:45)');

    _assert["default"].deepStrictEqual(parsed[0].path, 'fn (C:\\path\\file.js:123:45)');

    _assert["default"].deepStrictEqual(parsed[0].url, undefined);

    _assert["default"].deepStrictEqual(parsed[0].fileName, 'file.js');

    _assert["default"].deepStrictEqual(parsed[0].lineNumber, '123');

    _assert["default"].deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should parse stack with forwardslashes', function () {
    var parsed = (0, _parseStack["default"])('\n\n  at fn (http://path/file.js:123:45)');

    _assert["default"].deepStrictEqual(parsed[0].path, 'fn (http://path/file.js:123:45)');

    _assert["default"].deepStrictEqual(parsed[0].url, 'http://path/file.js');

    _assert["default"].deepStrictEqual(parsed[0].fileName, 'file.js');

    _assert["default"].deepStrictEqual(parsed[0].lineNumber, '123');

    _assert["default"].deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should parse stack with no parenthesis', function () {
    var parsed = (0, _parseStack["default"])('\n\n  at C:/path/file.js:123:45');

    _assert["default"].deepStrictEqual(parsed[0].path, 'C:/path/file.js:123:45');

    _assert["default"].deepStrictEqual(parsed[0].url, undefined);

    _assert["default"].deepStrictEqual(parsed[0].fileName, 'file.js');

    _assert["default"].deepStrictEqual(parsed[0].lineNumber, '123');

    _assert["default"].deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should handle unexpected input', function () {
    var parsed = (0, _parseStack["default"])('\n\n something that does not look like a stack');

    _assert["default"].deepStrictEqual(parsed, []);
  });
});