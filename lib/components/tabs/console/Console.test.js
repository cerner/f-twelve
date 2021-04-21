"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _Console = _interopRequireWildcard(require("./Console"));

var _testConsole = require("test-console");

var _preact2 = require("@testing-library/preact");

var _dom = require("@testing-library/dom");

var _utilities = require("../../../../test/utilities");

var testArgs = ['arg1', 'arg2'];

var renderTestConsole = function renderTestConsole() {
  var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';
  var stack = [{
    fileName: 'fileX',
    lineNumber: 42
  }];
  var consoleData = [(0, _Console.prepConsoleData)({
    level: level,
    args: testArgs,
    stack: stack
  })];

  var _render = (0, _preact2.render)((0, _preact.h)(_Console["default"], {
    consoleData: consoleData
  })),
      container = _render.container;

  return container;
};

describe('Console', function () {
  describe('output',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            it('should add 1 row', function () {
              var container = renderTestConsole();
              var output = container.getElementsByClassName('output')[0];

              _assert["default"].strictEqual(output.childNodes.length, 1);
            });
            it('should display timestamp without the date', function () {
              var consoleData = (0, _Console.prepConsoleData)({
                args: []
              });
              consoleData.timestamp = '2020-10-12 11:53:23';

              var _render2 = (0, _preact2.render)((0, _preact.h)(_Console["default"], {
                consoleData: [consoleData]
              })),
                  container = _render2.container;

              var timestamp = container.getElementsByClassName('timestamp')[0];

              _assert["default"].strictEqual(timestamp.textContent, '11:53:23');
            });
            it('should create an element for each console arg', function () {
              var container = renderTestConsole();
              var argsEl = container.getElementsByClassName('consoleArgs')[0];

              _assert["default"].strictEqual(argsEl.childNodes.length, testArgs.length);
            });
            it('should create  an element for each console arg', function () {
              var container = renderTestConsole();
              var argsEl = container.getElementsByClassName('consoleArgs')[0];

              _assert["default"].strictEqual(argsEl.childNodes.length, testArgs.length);
            });
            it('should create a log row with log level', function () {
              var container = renderTestConsole('log');
              var row = container.getElementsByClassName('row')[0];
              (0, _assert["default"])(row.classList.contains('log'));
            });
            it('should create a warn row with warn level', function () {
              var container = renderTestConsole('warn');
              var row = container.getElementsByClassName('row')[0];
              (0, _assert["default"])(row.classList.contains('warn'));
            });
            it('should create a info row with info level', function () {
              var container = renderTestConsole('info');
              var row = container.getElementsByClassName('row')[0];
              (0, _assert["default"])(row.classList.contains('info'));
            });
            it('should create a error row with error level', function () {
              var container = renderTestConsole('error');
              var row = container.getElementsByClassName('row')[0];
              (0, _assert["default"])(row.classList.contains('error'));
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('copy', function () {
    var lastExecCommand;
    beforeEach(function () {
      lastExecCommand = null;

      global.document.execCommand = function (command) {
        return lastExecCommand = command;
      };
    });
    it('should call execCommand for stack',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var container, copyButton;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              container = renderTestConsole();
              _context2.next = 3;
              return (0, _dom.findByTitle)(container, 'Copy stack');

            case 3:
              copyButton = _context2.sent;
              copyButton.click();
              _context2.next = 7;
              return (0, _utilities.update)();

            case 7:
              _assert["default"].strictEqual(lastExecCommand, 'copy');

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should call execCommand for all',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var container, copyButton;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              container = renderTestConsole();
              _context3.next = 3;
              return (0, _dom.findByTitle)(container, 'Copy all output');

            case 3:
              copyButton = _context3.sent;
              copyButton.click();
              _context3.next = 7;
              return (0, _utilities.update)();

            case 7:
              _assert["default"].strictEqual(lastExecCommand, 'copy');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('#prepConsoleData()', function () {
    it('should display filename and line number from top of stack', function () {
      var stack = [{
        fileName: 'fileX',
        lineNumber: 42
      }];
      var parsed = (0, _Console.prepConsoleData)({
        args: ['test'],
        stack: stack
      });

      _assert["default"].strictEqual(parsed.fileName, 'fileX:42');
    });
    it('should display filename only if no line number', function () {
      var stack = [{
        fileName: 'fileX'
      }];
      var parsed = (0, _Console.prepConsoleData)({
        args: ['test'],
        stack: stack
      });

      _assert["default"].strictEqual(parsed.fileName, 'fileX');
    });
    it('should not display filename if not available ', function () {
      var stack = [{
        lineNumber: 42
      }];
      var parsed = (0, _Console.prepConsoleData)({
        args: ['test'],
        stack: stack
      });

      _assert["default"].strictEqual(parsed.fileName, '');
    });
    it('should create a data tree for each console arg', function () {
      var args = [1, 'two', {
        thr: 'ee'
      }];
      var parsed = (0, _Console.prepConsoleData)({
        args: args
      });

      _assert["default"].strictEqual(parsed.argData.length, 3);

      _assert["default"].strictEqual(parsed.argData[0].value, args[0]);

      _assert["default"].strictEqual(parsed.argData[1].value, args[1]);

      _assert["default"].strictEqual(parsed.argData[2].value, args[2]);
    });
  });
  describe('#toJson()', function () {
    it('should create json of all data', function () {
      var rows = [(0, _Console.prepConsoleData)({
        args: ['string', {
          key: 'value'
        }]
      })];
      var parsed = JSON.parse((0, _Console.toJson)(rows));

      _assert["default"].strictEqual(parsed.userAgent, 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/15.0.0');

      _assert["default"].strictEqual(parsed.href, 'http://localhost/');

      (0, _assert["default"])(!!parsed.time.match(/\d\d:\d\d:\d\d\.\d\d\d/));
      (0, _assert["default"])(!!parsed.consoleOutput[0].time.match(/\d\d:\d\d:\d\d\.\d\d\d/));

      _assert["default"].strictEqual(parsed.consoleOutput[0].output[0], 'string');

      _assert["default"].strictEqual(parsed.consoleOutput[0].output[1].key, 'value');
    });
  });
  describe('#setHistory()', function () {
    it('should store history in reverse order', function () {
      (0, _Console.setHistory)("'history1'");
      (0, _Console.setHistory)("'history2'");
      (0, _Console.setHistory)("'history3'");

      _assert["default"].deepStrictEqual((0, _Console.getHistory)(), ["'history3'", "'history2'", "'history1'"]);
    });
    it('should store the most recent 50 commands', function () {
      for (var i = 1; i <= 60; i++) {
        (0, _Console.setHistory)("'history".concat(i, "'"));
      }

      var history = (0, _Console.getHistory)();

      _assert["default"].strictEqual(history.length, 50);

      _assert["default"].deepStrictEqual(history[0], "'history60'");

      _assert["default"].deepStrictEqual(history[49], "'history11'");
    });
  });
  describe('#getHistory()', function () {
    it('should retrieve the history', function () {
      (0, _Console.setHistory)(null, 0);
      (0, _Console.setHistory)("'history'");
      var history = (0, _Console.getHistory)();

      _assert["default"].deepStrictEqual(history, ["'history'"]);

      (0, _Console.setHistory)("'history2'");
      var history2 = (0, _Console.getHistory)();

      _assert["default"].deepStrictEqual(history2, ["'history2'", "'history'"]);
    });
  });
  describe('#exec()', function () {
    it('should output the input and the evaluated object reference', function () {
      window.testString = 'value';

      _testConsole.stdout.inspectSync(function (output) {
        (0, _Console.exec)('window.testString');

        _assert["default"].deepStrictEqual(output, ['window.testString\n', "".concat(window.testString, "\n")]);
      });
    });
    it('should assign variables', function () {
      window.testString = 'old';
      (0, _Console.exec)('window.testString = "new"');

      _assert["default"].strictEqual(window.testString, 'new');
    });
    it('should not execute functions', function () {
      var testVar = 'old';

      window.testFn = function () {
        return testVar = 'new';
      };

      (0, _Console.exec)('window.testFn()');

      _assert["default"].strictEqual(testVar, 'old');
    });
    it('should catch errors and error it out', function () {
      var _this = this;

      _testConsole.stderr.inspectSync(function (output) {
        _assert["default"].deepStrictEqual(output.length, 0, _this.setupError);

        var notAString = 123;
        (0, _Console.exec)(notAString);

        _assert["default"].deepStrictEqual(output.length, 1);
      });
    });
  });
  describe('#parseCommand()', function () {
    before(function () {
      this.testParseCommand = function (command) {
        _assert["default"].strictEqual((0, _Console.parseCommand)(command), new Function("return ".concat(command))() // eslint-disable-line no-new-func
        );
      };
    });
    it('should evaluate valid global objects using dot notation', function () {
      window.testString = 'value';
      this.testParseCommand('window.location.href');
      this.testParseCommand('window.testString');
    });
    it('should evaluate valid global objects using bracket notation', function () {
      window.testArray = ['value'];
      this.testParseCommand("window['location']['href']");
      this.testParseCommand("window['testArray'][0]");
    });
    it('should evaluate valid global objects using dot and bracket notation', function () {
      window.testObj = {
        arrayOfObjs: [{
          key1: 'value1'
        }, {
          key2: 'value2'
        }],
        1: 'one',
        'stringkey': 1,
        nestedArray: [[[1, 2, 3], [4, 5, 6]], [['one', 'two', 'three'], ['four', 'five', 'six']], {
          one: 1
        }]
      };
      this.testParseCommand('window.testObj.arrayOfObjs[0]');
      this.testParseCommand("window.testObj['arrayOfObjs'][1].key2");
      this.testParseCommand('window.testObj.stringkey');
      this.testParseCommand('window.testObj.nestedArray[0][0][0]');
      this.testParseCommand("window.testObj['nestedArray'][1][0][2]");
      this.testParseCommand("window.testObj.nestedArray[2]['one']");
    });
    it('should evaluate strings', function () {
      this.testParseCommand("'single quotes'");
      this.testParseCommand('"double quotes"');
    });
    it('should handle assignments', function () {
      window.testValue = 'old';
      this.testParseCommand('window.testValue = "new"');

      _assert["default"].strictEqual(window.testValue, 'new');
    });
    it('should handle multiple assignments', function () {
      window.testValue1 = 'old1';
      window.testValue2 = 'old2';
      this.testParseCommand('window.testValue1 = window.testValue2 = "new"');

      _assert["default"].strictEqual(window.testValue1, 'new');

      _assert["default"].strictEqual(window.testValue2, 'new');
    });
    it('should handle nested assignments', function () {
      window.testObject = {
        key1: {
          key2: 'old'
        }
      };
      this.testParseCommand("window.testObject.key1.key2 = 'new'");

      _assert["default"].strictEqual(window.testObject.key1.key2, 'new');
    });
  });
});