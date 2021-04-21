"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _CopyButton = _interopRequireDefault(require("./CopyButton"));

var _preact2 = require("@testing-library/preact");

var _utilities = require("../../test/utilities");

/**
 * Unable to read or write to the clipboard in unit tests
 */
describe('CopyButton', function () {
  var lastExecCommand;
  beforeEach(function () {
    lastExecCommand = null;

    global.document.execCommand = function (command) {
      return lastExecCommand = command;
    };
  });
  describe('#onClickCopy()', function () {
    it('should call execCommand with "copy"',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var _render, container, copyButton;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _render = (0, _preact2.render)((0, _preact.h)(_CopyButton["default"], {
                getText: function getText() {
                  return 'some text';
                }
              })), container = _render.container;
              copyButton = container.firstChild;
              copyButton.click();
              _context.next = 5;
              return (0, _utilities.update)();

            case 5:
              _assert["default"].strictEqual(lastExecCommand, 'copy');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should display success after successful copy',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var _render2, container, copyButton, successMessage;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _render2 = (0, _preact2.render)((0, _preact.h)(_CopyButton["default"], {
                getText: function getText() {
                  return 'some text';
                }
              })), container = _render2.container;
              copyButton = container.firstChild;
              copyButton.click();
              _context2.next = 5;
              return (0, _utilities.update)();

            case 5:
              _context2.next = 7;
              return (0, _utilities.findAllByClassName)(container, 'successMessage');

            case 7:
              successMessage = _context2.sent;

              _assert["default"].strictEqual(successMessage.length, 1);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should not display success after a failed copy',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var text, _render3, container, copyButton;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'some text';
              _render3 = (0, _preact2.render)((0, _preact.h)(_CopyButton["default"], {
                getText: function getText() {
                  return text;
                }
              })), container = _render3.container;
              copyButton = container.firstChild;

              global.document.execCommand = function () {
                return x = error;
              }; // eslint-disable-line no-undef


              try {
                copyButton.click();
              } catch (e) {// Do nothing
              }

              _context3.next = 7;
              return (0, _utilities.update)();

            case 7:
              _assert["default"].strictEqual(copyButton.classList.contains('showSuccess'), false);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});