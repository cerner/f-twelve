"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _preactHooks = require("@testing-library/preact-hooks");

var _useConsoleData = _interopRequireDefault(require("./useConsoleData"));

var _consoleHook = _interopRequireDefault(require("../utilities/consoleHook"));

var _utilities = require("../../test/utilities");

describe('useConsoleData', function () {
  beforeEach(function () {
    _consoleHook["default"].enable();
  });
  afterEach(function () {
    _consoleHook["default"].disable();
  });

  var testLevel =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(level) {
      var _renderHook, result;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _renderHook = (0, _preactHooks.renderHook)(function () {
                return (0, _useConsoleData["default"])();
              }), result = _renderHook.result;
              console[level]('message');
              _context.next = 4;
              return (0, _utilities.update)();

            case 4:
              _assert["default"].deepStrictEqual(result.current[0].argData[0].value, 'message');

              _assert["default"].deepStrictEqual(result.current[0].level, level);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function testLevel(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  it('should capture console.log',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testLevel('log');

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should capture console.info',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testLevel('info');

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should capture console.warn',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            testLevel('warn');

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('should capture console.error',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            testLevel('error');

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should handle multiple arguments',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var _renderHook2, result, args;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _renderHook2 = (0, _preactHooks.renderHook)(function () {
              return (0, _useConsoleData["default"])();
            }), result = _renderHook2.result;
            console.log('one', 1, true, false, [1, 2, 3], {
              key: 'value'
            }, undefined);
            _context6.next = 4;
            return (0, _utilities.update)();

          case 4:
            args = result.current[0].argData;

            _assert["default"].deepStrictEqual(args[0].value, 'one');

            _assert["default"].deepStrictEqual(args[1].value, 1);

            _assert["default"].deepStrictEqual(args[2].value, true);

            _assert["default"].deepStrictEqual(args[3].value, false);

            _assert["default"].deepStrictEqual(args[4].value, [1, 2, 3]);

            _assert["default"].deepStrictEqual(args[5].value, {
              key: 'value'
            });

            _assert["default"].deepStrictEqual(args[6].value, undefined);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('should capture fileName and line number',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var _renderHook3, result;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _renderHook3 = (0, _preactHooks.renderHook)(function () {
              return (0, _useConsoleData["default"])();
            }), result = _renderHook3.result;
            console.log('message');
            _context7.next = 4;
            return (0, _utilities.update)();

          case 4:
            _assert["default"].deepStrictEqual(result.current[0].fileName, 'useConsoleData.test:49');

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
});