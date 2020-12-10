"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _assert = _interopRequireDefault(require("assert"));

var _testConsole = require("test-console");

var _consoleHook = require("./consoleHook");

describe('consoleHook', function () {
  before(function () {
    this.oldWindowOnError = window.onerror && window.onerror.bind({});
    this.oldWindowConsole = (0, _objectSpread2["default"])({}, window.console);
  });
  describe('#overrideWindowConsole()', function () {
    it('should create a new function for the 4 levels', function () {
      (0, _consoleHook.overrideWindowConsole)();

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.error, window.console.error);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.info, window.console.info);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.log, window.console.log);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.warn, window.console.warn);
    });
    it('should not break the standard console', function () {
      (0, _consoleHook.overrideWindowConsole)();

      _testConsole.stdout.inspectSync(function (output) {
        window.console.log('string');
        window.console.log([1, 2, 3]);
        window.console.log({
          key: 'value'
        });

        _assert["default"].deepStrictEqual(output, ['string\n', '[ 1, 2, 3 ]\n', "{ key: 'value' }\n"]);
      });
    });
  });
  describe('#overrideWindowOnError()', function () {
    it('should create a new function for window.onerror', function () {
      (0, _consoleHook.restoreWindowOnError)();
      (0, _consoleHook.overrideWindowOnError)();

      _assert["default"].notDeepStrictEqual(this.oldWindowOnError, window.oldWindowOnError);
    });
    it('should not break the existing window.onerror', function () {
      (0, _consoleHook.restoreWindowOnError)();
      var initialCallCount = window.onErrorCallCount;
      (0, _consoleHook.overrideWindowOnError)();
      window.onerror();

      _assert["default"].deepStrictEqual(window.onErrorCallCount, initialCallCount + 1);
    });
    it('should write the error to stderr', function () {
      (0, _consoleHook.restoreWindowOnError)();
      (0, _consoleHook.overrideWindowOnError)();

      _testConsole.stderr.inspectSync(function (output) {
        window.onerror('', '', 0, 0, 'string');
        window.onerror('', '', 0, 0, [1, 2, 3]);
        window.onerror('', '', 0, 0, {
          key: 'value'
        });

        _assert["default"].deepStrictEqual(output, ['string\n', '[ 1, 2, 3 ]\n', "{ key: 'value' }\n"]);
      });
    });
  });
});