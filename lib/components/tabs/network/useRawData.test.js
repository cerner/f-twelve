"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _useRawData = _interopRequireDefault(require("./useRawData"));

var _preactHooks = require("@testing-library/preact-hooks");

var _dom = require("@testing-library/dom");

describe('useRawData', function () {
  it('should handle strings', function () {
    var _renderHook = (0, _preactHooks.renderHook)(function () {
      return (0, _useRawData["default"])('string data');
    }),
        result = _renderHook.result;

    _assert["default"].deepStrictEqual(result.current, 'string data');
  });
  it('should handle json blobs',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var blob, _renderHook2, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            blob = new Blob(['{"key":"value"}'], {
              type: 'application/json'
            });
            _renderHook2 = (0, _preactHooks.renderHook)(function () {
              return (0, _useRawData["default"])(blob);
            }), result = _renderHook2.result;
            _context.next = 4;
            return (0, _dom.waitFor)(function () {
              return _assert["default"].deepStrictEqual(result.current, '{"key":"value"}');
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});