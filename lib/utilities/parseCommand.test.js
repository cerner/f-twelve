"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _parseCommand = _interopRequireDefault(require("./parseCommand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('#parseCommand()', function () {
  before(function () {
    this.testParseCommand = function (command) {
      _assert["default"].strictEqual((0, _parseCommand["default"])(command), new Function("return ".concat(command))() // eslint-disable-line no-new-func
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