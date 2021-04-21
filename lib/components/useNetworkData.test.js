"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _preactHooks = require("@testing-library/preact-hooks");

var _useNetworkData = _interopRequireDefault(require("./useNetworkData"));

describe('useNetworkData', function () {
  it('should default to an empty array',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _renderHook, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _renderHook = (0, _preactHooks.renderHook)(function () {
              return (0, _useNetworkData["default"])();
            }), result = _renderHook.result;

            _assert["default"].deepStrictEqual(result.current, []);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});