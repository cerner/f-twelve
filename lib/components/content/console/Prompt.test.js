"use strict";

var _jsx = _interopRequireDefault(require("../../../utilities/jsx"));

var _assert = _interopRequireDefault(require("assert"));

var _Prompt = _interopRequireDefault(require("./Prompt"));

var _Console = _interopRequireDefault(require("./Console"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Prompt', function () {
  beforeEach(function () {
    this.console.setHistory(null, 0);
  });
  before(function () {
    var _this = this;

    this.console = (0, _Console["default"])();
    this.prompt = (0, _jsx["default"])(_Prompt["default"], {
      exec: this.console.exec,
      getHistory: this.console.getHistory,
      inputRef: function inputRef(node) {
        return _this.inputBox = node;
      }
    });

    this.pressKey = function (key) {
      return _this.dispatchKeyboardEvent('keydown', key, _this.inputBox);
    };
  });
  describe('#onKeyDown()', function () {
    // Enter
    it('should clear the prompt on enter', function () {
      this.inputBox.value = "'test'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual(this.inputBox.value, '');
    });
    it('should append command to history on enter', function () {
      this.inputBox.value = "'enter1'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual(this.console.getHistory(), ["'enter1'"]);

      this.inputBox.value = "'enter2'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual(this.console.getHistory(), ["'enter2'", "'enter1'"]);

      this.inputBox.value = "'enter3'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual(this.console.getHistory(), ["'enter3'", "'enter2'", "'enter1'"]);
    }); // Arrow keys

    it('should retrieve history on arrow up', function () {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');

      _assert["default"].strictEqual(this.inputBox.value, "'history1'");
    });
    it('should un-retrieve history on arrow up then down', function () {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');

      _assert["default"].strictEqual(this.inputBox.value, '');
    });
    it('should retrieve history on multiple arrow up', function () {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');

      _assert["default"].strictEqual(this.inputBox.value, "'history1'");
    });
    it('should retrieve latest history on double arrow up and single arrow down', function () {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');

      _assert["default"].strictEqual(this.inputBox.value, "'history2'");
    });
    it('should retrieve oldest history on more arrow up than history size', function () {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');

      _assert["default"].strictEqual(this.inputBox.value, "'history1'");
    });
    it('should retrieve current unsubmitted text on arrow up and back down', function () {
      this.inputBox.value = "'histo-'";
      this.inputBox.onchange();
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');
      this.pressKey('ArrowDown');

      _assert["default"].strictEqual(this.inputBox.value, "'histo-'");
    });
  });
});