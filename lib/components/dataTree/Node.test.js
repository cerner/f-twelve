"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _preact = require("preact");

var _Tree = require("./Tree");

var _Node = _interopRequireWildcard(require("./Node"));

var _assert = _interopRequireDefault(require("assert"));

var _preact2 = require("@testing-library/preact");

var _utilities = require("../../../test/utilities");

describe('Node', function () {
  it('should render simple values', function () {
    var _render = (0, _preact2.render)((0, _preact.h)(_Node["default"], {
      node: (0, _Tree.getNode)('simple')
    })),
        container = _render.container;

    _assert["default"].strictEqual(container.textContent, 'simple');
  });
  it('should render objects', function () {
    var _render2 = (0, _preact2.render)((0, _preact.h)(_Node["default"], {
      node: (0, _Tree.getNode)({
        objectKey: 'complex'
      })
    })),
        container = _render2.container;

    _assert["default"].strictEqual(container.textContent, 'Object(1){objectKey:…}');
  });
  it('should render arrays', function () {
    var _render3 = (0, _preact2.render)((0, _preact.h)(_Node["default"], {
      node: (0, _Tree.getNode)([1, 2, 3])
    })),
        container = _render3.container;

    _assert["default"].strictEqual(container.textContent, 'Array(3)[1, 2, 3]');
  });
  it('should display value when clicked',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _render4, container;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _render4 = (0, _preact2.render)((0, _preact.h)(_Node["default"], {
              node: (0, _Tree.getNode)({
                key: 'value'
              })
            })), container = _render4.container;

            _assert["default"].strictEqual(container.getElementsByClassName('value').length, 0, this.setupError);

            container.getElementsByClassName('caretIcon')[0].click();
            _context.next = 5;
            return (0, _utilities.update)();

          case 5:
            _assert["default"].strictEqual(container.getElementsByClassName('value').length, 1);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  describe('#formatSimpleValue', function () {
    it('should handle strings', function () {
      var formatted = (0, _Node.formatSimpleValue)('string');

      _assert["default"].strictEqual(formatted, 'string');
    });
    it('should handle child strings', function () {
      var formatted = (0, _Node.formatSimpleValue)('string', 'child');

      _assert["default"].strictEqual(formatted, '"string"');
    });
    it('should handle numbers', function () {
      var formattedInt = (0, _Node.formatSimpleValue)(123);

      _assert["default"].strictEqual(formattedInt, '123');

      var formattedFloat = (0, _Node.formatSimpleValue)(123.456789);

      _assert["default"].strictEqual(formattedFloat, '123.456789');
    });
    it('should handle boolean', function () {
      var formattedTrue = (0, _Node.formatSimpleValue)(true);

      _assert["default"].strictEqual(formattedTrue, 'true');

      var formattedFalse = (0, _Node.formatSimpleValue)(false);

      _assert["default"].strictEqual(formattedFalse, 'false');
    });
    it('should handle null', function () {
      var formatted = (0, _Node.formatSimpleValue)(null);

      _assert["default"].strictEqual(formatted, 'null');
    });
    it('should handle undefined', function () {
      var formatted = (0, _Node.formatSimpleValue)(undefined);

      _assert["default"].strictEqual(formatted, 'undefined');
    });
    it('should handle functions', function () {
      var someFunction = function someFunction(arg) {
        return console.log(arg);
      };

      var formatted = (0, _Node.formatSimpleValue)(someFunction);

      _assert["default"].strictEqual(formatted, 'function someFunction(arg) { return console.log(arg); }');
    });
  });
  describe('#getPreview', function () {
    it('should handle strings', function () {
      var preview = (0, _Node.getPreview)('key', 'one');

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle numbers', function () {
      var preview = (0, _Node.getPreview)('key', 1);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle boolean', function () {
      var preview = (0, _Node.getPreview)('key', true);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle array', function () {
      var preview = (0, _Node.getPreview)('key', [1, 2, 3]);

      _assert["default"].strictEqual(preview, '[1, 2, 3]');
    });
    it('should handle array of objects', function () {
      var preview = (0, _Node.getPreview)('key', [{
        key: 1
      }, {
        key: 2
      }]);

      _assert["default"].strictEqual(preview, '[{…}, {…}]');
    });
    it('should handle array of arrays', function () {
      var preview = (0, _Node.getPreview)('key', [[1, 2], [3, 4, 5]]);

      _assert["default"].strictEqual(preview, '[[…], […]]');
    });
    it('should handle objects', function () {
      var preview = (0, _Node.getPreview)('key', {
        'one': 1,
        'two': true,
        'three': '3ree'
      });

      _assert["default"].strictEqual(preview, '{one:…, two:…, three:…}');
    });
    it('should handle null', function () {
      var preview = (0, _Node.getPreview)('key', null);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle undefined', function () {
      var preview = (0, _Node.getPreview)('key', undefined);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle functions', function () {
      var someFunction = function someFunction(arg) {
        return console.log(arg);
      };

      var preview = (0, _Node.getPreview)('key', someFunction);

      _assert["default"].strictEqual(preview, '');
    });
    it('should handle __proto__', function () {
      var preview = (0, _Node.getPreview)('__proto__', {});

      _assert["default"].strictEqual(preview, '{…}');
    });
  });
});