"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _Console = _interopRequireDefault(require("./Console"));

var _testConsole = require("test-console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Console', function () {
  before(function () {
    this.console = (0, _Console["default"])();
    this.oldWindowOnError = window.onerror && window.onerror.bind({});
    this.oldWindowConsole = _objectSpread({}, window.console);
  });
  describe('#setHistory()', function () {
    it('should store history in reverse order', function () {
      this.console.setHistory("'history1'");
      this.console.setHistory("'history2'");
      this.console.setHistory("'history3'");

      _assert["default"].deepStrictEqual(this.console.getHistory(), ["'history3'", "'history2'", "'history1'"]);
    });
    it('should store the most recent 50 commands', function () {
      for (var i = 1; i <= 60; i++) {
        this.console.setHistory("'history".concat(i, "'"));
      }

      var history = this.console.getHistory();

      _assert["default"].strictEqual(history.length, 50);

      _assert["default"].deepStrictEqual(history[0], "'history60'");

      _assert["default"].deepStrictEqual(history[49], "'history11'");
    });
  });
  describe('#getHistory()', function () {
    it('should retrieve the history', function () {
      this.console.setHistory(null, 0);
      this.console.setHistory("'history'");
      var history = this.console.getHistory();

      _assert["default"].deepStrictEqual(history, ["'history'"]);

      this.console.setHistory("'history2'");
      var history2 = this.console.getHistory();

      _assert["default"].deepStrictEqual(history2, ["'history2'", "'history'"]);
    });
  });
  describe('#overrideWindowConsole()', function () {
    it('should create a new function for the 4 verb methods', function () {
      this.console.overrideWindowConsole();

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.error, window.console.error);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.info, window.console.info);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.log, window.console.log);

      _assert["default"].notDeepStrictEqual(this.oldWindowConsole.warn, window.console.warn);
    });
    it('should not break the standard console', function () {
      this.console.overrideWindowConsole();

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
      this.console.restoreWindowOnError();
      this.console.overrideWindowOnError();

      _assert["default"].notDeepStrictEqual(this.oldWindowOnError, window.oldWindowOnError);
    });
    it('should not break the existing window.onerror', function () {
      this.console.restoreWindowOnError();
      var initialCallCount = window.onErrorCallCount;
      this.console.overrideWindowOnError();
      window.onerror();

      _assert["default"].deepStrictEqual(window.onErrorCallCount, initialCallCount + 1);
    });
    it('should write the error to stderr', function () {
      this.console.restoreWindowOnError();
      this.console.overrideWindowOnError();

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
  describe('#exec()', function () {
    it('should output the input and the evaluated object reference', function () {
      var _this = this;

      window.testString = 'value';

      _testConsole.stdout.inspectSync(function (output) {
        _this.console.exec('window.testString');

        _assert["default"].deepStrictEqual(output, ['window.testString\n', "".concat(window.testString, "\n")]);
      });
    });
    it('should assign variables', function () {
      window.testString = 'old';
      this.console.exec('window.testString = "new"');

      _assert["default"].strictEqual(window.testString, 'new');
    });
    it('should not execute functions', function () {
      var testVar = 'old';

      window.testFn = function () {
        return testVar = 'new';
      };

      this.console.exec('window.testFn()');

      _assert["default"].strictEqual(testVar, 'old');
    });
    it('should catch errors and this.console.error it out', function () {
      var _this2 = this;

      _testConsole.stderr.inspectSync(function (output) {
        _assert["default"].deepStrictEqual(output.length, 0, _this2.setupError);

        var notAString = 123;

        _this2.console.exec(notAString);

        _assert["default"].deepStrictEqual(output.length, 1);
      });
    });
  });
});