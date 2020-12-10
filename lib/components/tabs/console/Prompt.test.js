"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _Prompt = _interopRequireDefault(require("./Prompt"));

var _Console = require("./Console");

var _utilities = require("../../../../test/utilities");

var _preact2 = require("@testing-library/preact");

describe('Prompt', function () {
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _this = this;

    var _render, container;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _Console.setHistory)(null, 0);
            _render = (0, _preact2.render)((0, _preact.h)(_Prompt["default"], {
              exec: _Console.exec,
              getHistory: _Console.getHistory,
              inputRef: function inputRef(node) {
                return _this.inputBox = node;
              }
            })), container = _render.container;
            _context.next = 4;
            return (0, _utilities.findByClassName)(container, 'promptInput');

          case 4:
            this.inputBox = _context.sent;

            this.pressKey = function (key) {
              return (0, _utilities.dispatchKeyboardEvent)('keydown', key, _this.inputBox);
            };

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
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

      _assert["default"].deepStrictEqual((0, _Console.getHistory)(), ["'enter1'"]);

      this.inputBox.value = "'enter2'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual((0, _Console.getHistory)(), ["'enter2'", "'enter1'"]);

      this.inputBox.value = "'enter3'";
      this.pressKey('Enter');

      _assert["default"].deepStrictEqual((0, _Console.getHistory)(), ["'enter3'", "'enter2'", "'enter1'"]);
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
    it('should retrieve current unsubmitted text on arrow up and back down',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.inputBox.value = "'histo-'";

              _preact2.fireEvent.change(this.inputBox);

              this.pressKey('ArrowUp');
              this.pressKey('ArrowUp');
              this.pressKey('ArrowDown');
              this.pressKey('ArrowDown');

              _assert["default"].strictEqual(this.inputBox.value, "'histo-'");

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
  });
  describe('#onChange()', function () {
    before(function () {
      this.testOnChangeHandler = function (eventType) {
        this.inputBox.value = "'history1'";
        this.pressKey('Enter');
        this.inputBox.value = "'history2'";
        this.pressKey('Enter');
        this.inputBox.value = "'history3'";
        this.pressKey('Enter');
        this.pressKey('ArrowUp'); // history3

        this.pressKey('ArrowUp'); // history2

        this.pressKey('ArrowUp'); // history1

        this.inputBox.dispatchEvent(new Event(eventType));
        this.pressKey('ArrowUp'); // history3

        _assert["default"].strictEqual(this.inputBox.value, "'history3'");
      };
    });
    it('should reset history pointer to beginning on change', function () {
      this.testOnChangeHandler('change');
    });
    it('should reset history pointer to beginning on input', function () {
      this.testOnChangeHandler('input');
    });
  });
});