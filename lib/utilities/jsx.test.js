"use strict";

var _jsx = _interopRequireDefault(require("./jsx"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

describe('#jsx()', function () {
  describe('dom elements', function () {
    it('should handle simple elements without props', function () {
      var el = (0, _jsx["default"])("div", null);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with props', function () {
      var el = (0, _jsx["default"])("div", {
        id: "test"
      });

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 1);

      _assert["default"].strictEqual(el.getAttribute('id'), 'test');
    });
    it('should handle simple elements with text content', function () {
      var el = (0, _jsx["default"])("div", null, "text");

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 1);

      _assert["default"].strictEqual(el.attributes.length, 0);

      var textNode = el.childNodes[0];

      _assert["default"].strictEqual(textNode.constructor.name, 'Text');

      _assert["default"].strictEqual(textNode.textContent, 'text');
    });
    it('should handle simple elements with number content', function () {
      var el = (0, _jsx["default"])("div", null, 3);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 1);

      _assert["default"].strictEqual(el.attributes.length, 0);

      var textNode = el.childNodes[0];

      _assert["default"].strictEqual(textNode.constructor.name, 'Text');

      _assert["default"].strictEqual(textNode.textContent, '3');
    });
    it('should handle simple elements with boolean content (false)', function () {
      var el = (0, _jsx["default"])("div", null, false);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with boolean content (true)', function () {
      var el = (0, _jsx["default"])("div", null, true);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with null content', function () {
      var el = (0, _jsx["default"])("div", null, null);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 0);
    });
    it('should handle simple elements with function content', function () {
      var el = (0, _jsx["default"])("div", null, function () {
        return 'test';
      });

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 0);
    });
    it('should handle simple element fragments', function () {
      var els = (0, _jsx["default"])('fragment', null, (0, _jsx["default"])("div", {
        id: "div1"
      }), (0, _jsx["default"])("div", {
        id: "div2"
      }));

      _assert["default"].strictEqual(els instanceof Array, true);

      _assert["default"].strictEqual(els[0].id, 'div1');

      _assert["default"].strictEqual(els[1].id, 'div2');
    });
    it('should handle simple element with child nodes', function () {
      var el = (0, _jsx["default"])("div", null, (0, _jsx["default"])("span", {
        id: "span"
      }));

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 1);

      _assert["default"].strictEqual(el.attributes.length, 0);

      var span = el.childNodes[0];

      _assert["default"].strictEqual(span instanceof HTMLSpanElement, true);

      _assert["default"].strictEqual(span.childNodes.length, 0);

      _assert["default"].strictEqual(span.attributes.length, 1);
    });
  });
  describe('custom components', function () {
    before(function () {
      this.Component = function (_ref) {
        var attr = _ref.attr,
            children = _ref.children;
        return (0, _jsx["default"])("div", {
          id: attr
        }, _toConsumableArray(children));
      };

      this.ObjComponent = function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            attr = _ref2.attr,
            _ref2$children = _ref2.children,
            children = _ref2$children === void 0 ? [] : _ref2$children;

        return {
          key: 'value',
          el: (0, _jsx["default"])("div", {
            id: attr
          }, _toConsumableArray(children))
        };
      };
    });
    it('should handle custom components without props', function () {
      var el = (0, _jsx["default"])(this.Component, null);

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 1);
    });
    it('should handle custom components with props', function () {
      var el = (0, _jsx["default"])(this.Component, {
        attr: 'idAttr'
      });

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 0);

      _assert["default"].strictEqual(el.attributes.length, 1);

      _assert["default"].strictEqual(el.getAttribute('id'), 'idAttr');
    });
    it('should handle custom components with text content', function () {
      var el = (0, _jsx["default"])(this.Component, {
        attr: 'idAttr'
      }, "I am text");

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 1);

      _assert["default"].strictEqual(el.attributes.length, 1);

      var textNode = el.childNodes[0];

      _assert["default"].strictEqual(textNode.constructor.name, 'Text');

      _assert["default"].strictEqual(textNode.textContent, 'I am text');
    });
    it('should handle custom component fragments', function () {
      var els = (0, _jsx["default"])('fragment', null, (0, _jsx["default"])(this.Component, {
        attr: 'comp1'
      }), (0, _jsx["default"])(this.Component, {
        attr: 'comp2'
      }));

      _assert["default"].strictEqual(els instanceof Array, true);

      _assert["default"].strictEqual(els[0].id, 'comp1');

      _assert["default"].strictEqual(els[1].id, 'comp2');
    });
    it('should handle custom component with child nodes', function () {
      var el = (0, _jsx["default"])(this.Component, {
        attr: 'idAttr'
      }, (0, _jsx["default"])("span", {
        id: "span"
      }));

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].strictEqual(el.childNodes.length, 1);

      _assert["default"].strictEqual(el.attributes.length, 1);

      var span = el.childNodes[0];

      _assert["default"].strictEqual(span instanceof HTMLSpanElement, true);

      _assert["default"].strictEqual(span.childNodes.length, 0);

      _assert["default"].strictEqual(span.attributes.length, 1);
    });
    it('should be accessible via ref prop', function () {
      var refEl;
      var el = (0, _jsx["default"])(this.Component, {
        ref: function ref(_ref3) {
          return refEl = _ref3;
        }
      });

      _assert["default"].deepStrictEqual(el, refEl);
    });
    it('should support custom components that return an object', function () {
      var component = this.ObjComponent();
      var el = (0, _jsx["default"])(this.ObjComponent, null);

      _assert["default"].strictEqual(component instanceof Object, true);

      _assert["default"].strictEqual(component.key, 'value');

      _assert["default"].strictEqual(el instanceof HTMLDivElement, true);

      _assert["default"].deepStrictEqual(el, component.el);
    });
  });
});