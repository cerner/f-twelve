"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _App = _interopRequireDefault(require("./App"));

var _preact = require("preact");

var _preact2 = require("@testing-library/preact");

var _utilities = require("../../test/utilities");

var renderAndOpen =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _render, container, icon, app;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _render = (0, _preact2.render)((0, _preact.h)(_App["default"], null)), container = _render.container;
            _context.next = 3;
            return (0, _utilities.findByClassName)(container, 'icon');

          case 3:
            icon = _context.sent;
            _context.next = 6;
            return (0, _utilities.findByClassName)(container, 'app');

          case 6:
            app = _context.sent;
            icon.click();
            _context.next = 10;
            return (0, _utilities.update)();

          case 10:
            (0, _assert["default"])(app.classList.contains('open'), _utilities.setupError);
            return _context.abrupt("return", app);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderAndOpen() {
    return _ref.apply(this, arguments);
  };
}();

describe('App', function () {
  describe('#setContent()', function () {
    it('should toggle content visibility when a tab is clicked',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var _render2, container, tabs, _i, _tabs, tab, message, contents, content;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _render2 = (0, _preact2.render)((0, _preact.h)(_App["default"], null)), container = _render2.container;
              tabs = Array.from(container.getElementsByClassName('tab'));
              _i = 0, _tabs = tabs;

            case 3:
              if (!(_i < _tabs.length)) {
                _context2.next = 15;
                break;
              }

              tab = _tabs[_i];
              message = 'Clicked tab did not display content: ' + tab.textContent;
              tab.click();
              _context2.next = 9;
              return (0, _utilities.findAllByClassName)(container, 'content');

            case 9:
              contents = _context2.sent;
              content = contents[0];

              _assert["default"].strictEqual(content.getElementsByClassName(tab.textContent.toLowerCase()).length, 1, message);

            case 12:
              _i++;
              _context2.next = 3;
              break;

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('icon', function () {
    describe('#toggleOpen', function () {
      it('should open the tool if closed',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var _render3, container, icon, app;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _render3 = (0, _preact2.render)((0, _preact.h)(_App["default"], null)), container = _render3.container;
                _context3.next = 3;
                return (0, _utilities.findByClassName)(container, 'icon');

              case 3:
                icon = _context3.sent;
                _context3.next = 6;
                return (0, _utilities.findByClassName)(container, 'app');

              case 6:
                app = _context3.sent;
                (0, _assert["default"])(!app.classList.contains('open'), _utilities.setupError);
                icon.click();
                _context3.next = 11;
                return (0, _utilities.update)();

              case 11:
                (0, _assert["default"])(app.classList.contains('open'));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      it('should close the tool if open',
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var container, icon;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return renderAndOpen();

              case 2:
                container = _context4.sent;
                _context4.next = 5;
                return (0, _utilities.findByClassName)(container, 'icon');

              case 5:
                icon = _context4.sent;
                icon.click();
                _context4.next = 9;
                return (0, _utilities.update)();

              case 9:
                (0, _assert["default"])(!container.classList.contains('open'));

                _assert["default"].strictEqual(container.style.height, '0px');

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
  });
  describe('resizer', function () {
    it('should not resize above the top of the screen',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var container, resizer;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return renderAndOpen();

            case 2:
              container = _context5.sent;
              _context5.next = 5;
              return (0, _utilities.findByClassName)(container, 'resizer');

            case 5:
              resizer = _context5.sent;
              resizer.dispatchEvent(new MouseEvent('mousedown'));
              window.dispatchEvent(new MouseEvent('mousemove', {
                clientY: -10
              }));
              window.dispatchEvent(new MouseEvent('mouseup'));

              _assert["default"].strictEqual(container.style.height, "".concat(window.innerHeight, "px"));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});