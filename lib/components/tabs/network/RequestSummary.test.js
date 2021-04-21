"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _preact2 = require("@testing-library/preact");

var _RequestSummary = _interopRequireDefault(require("./RequestSummary"));

var _utilities = require("../../../../test/utilities");

var request = {
  data: null,
  endTime: new Date().getTime() + 1000,
  endTimeStamp: 0,
  headers: [],
  headersRaw: '',
  method: 'GET',
  response: {},
  responseHeaders: [],
  responseHeadersRaw: '',
  responseStatus: 200,
  responseText: 'data',
  responseType: 'responseType',
  startTime: new Date().getTime(),
  startTimeStamp: 1000,
  url: 'http://localhost',
  xhr: 'xhr'
};
describe('Requestsummary', function () {
  it('should select on enter',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var selected, onSelect, _render, container;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selected = false;

            onSelect = function onSelect(event, request) {
              return selected = true;
            };

            _render = (0, _preact2.render)((0, _preact.h)(_RequestSummary["default"], {
              onSelect: onSelect,
              request: request
            })), container = _render.container;
            (0, _utilities.dispatchKeyboardEvent)('keydown', 'Enter', container.firstChild); // dispatchKeyboardEvent('keydown', 'ArrowUp', this.inputBox);

            _assert["default"].strictEqual(selected, true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should select previous sibling on arrow up',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var row1clicked, row2clicked, _render2, container, rows;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            row1clicked = false;
            row2clicked = false;
            _render2 = (0, _preact2.render)((0, _preact.h)("div", null, (0, _preact.h)(_RequestSummary["default"], {
              isSelected: false,
              onSelect: function onSelect() {
                return row1clicked = true;
              },
              request: request
            }), (0, _preact.h)(_RequestSummary["default"], {
              isSelected: true,
              onSelect: function onSelect() {
                return row2clicked = true;
              },
              request: request
            }))), container = _render2.container;
            _context2.next = 5;
            return (0, _utilities.findAllByClassName)(container, 'requestSummary');

          case 5:
            rows = _context2.sent;
            (0, _utilities.dispatchKeyboardEvent)('keydown', 'ArrowUp', rows[1]);
            (0, _assert["default"])(row1clicked);
            (0, _assert["default"])(!row2clicked);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should select next sibling on arrow down',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var row1clicked, row2clicked, _render3, container, rows;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            row1clicked = false;
            row2clicked = false;
            _render3 = (0, _preact2.render)((0, _preact.h)("div", null, (0, _preact.h)(_RequestSummary["default"], {
              isSelected: true,
              onSelect: function onSelect() {
                return row1clicked = true;
              },
              request: request
            }), (0, _preact.h)(_RequestSummary["default"], {
              isSelected: false,
              onSelect: function onSelect() {
                return row2clicked = true;
              },
              request: request
            }))), container = _render3.container;
            _context3.next = 5;
            return (0, _utilities.findAllByClassName)(container, 'requestSummary');

          case 5:
            rows = _context3.sent;
            (0, _utilities.dispatchKeyboardEvent)('keydown', 'ArrowDown', rows[0]);
            (0, _assert["default"])(!row1clicked);
            (0, _assert["default"])(row2clicked);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});