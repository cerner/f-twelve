"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _preact2 = require("@testing-library/preact");

var _Network = _interopRequireDefault(require("./Network"));

var _utilities = require("../../../../test/utilities");

var networkData = [{
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
}];
describe('Network', function () {
  it('should render successfully', function () {
    var _render = (0, _preact2.render)((0, _preact.h)(_Network["default"], {
      networkData: [{}, {}, {}]
    })),
        container = _render.container;

    (0, _assert["default"])(container.childNodes[0].classList.contains('network'));
  });
  it('should display details and select row on click',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _render2, container;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _render2 = (0, _preact2.render)((0, _preact.h)(_Network["default"], {
              networkData: networkData
            })), container = _render2.container;
            (0, _assert["default"])(container.getElementsByClassName('details').length === 0);
            container.getElementsByClassName('requestSummary')[0].click();
            _context.next = 5;
            return (0, _utilities.update)();

          case 5:
            (0, _assert["default"])(container.getElementsByClassName('details').length === 1);
            (0, _assert["default"])(container.getElementsByClassName('requestSummary')[0].classList.contains('selected'));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('resizer', function () {
    it('should resize to a minimum of 4px',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var _render3, container, list, resizer;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _render3 = (0, _preact2.render)((0, _preact.h)(_Network["default"], {
                networkData: networkData
              })), container = _render3.container;
              _context2.next = 3;
              return (0, _utilities.findByClassName)(container, 'list');

            case 3:
              list = _context2.sent;
              list.parentElement.style.display = 'flex'; // Assign manually since stylesheets don't apply in tests

              _context2.next = 7;
              return (0, _utilities.findByClassName)(container, 'resizer');

            case 7:
              resizer = _context2.sent;
              resizer.dispatchEvent(new MouseEvent('mousedown'));
              window.dispatchEvent(new MouseEvent('mousemove', {
                clientX: -10
              }));
              window.dispatchEvent(new MouseEvent('mouseup'));

              _assert["default"].strictEqual(list.style.flexBasis, "4px");

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});