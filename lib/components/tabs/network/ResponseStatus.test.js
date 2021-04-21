"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _preact2 = require("@testing-library/preact");

var _ResponseStatus = _interopRequireDefault(require("./ResponseStatus"));

describe('ResponseStatus', function () {
  it('should handle successful response', function () {
    var _render = (0, _preact2.render)((0, _preact.h)(_ResponseStatus["default"], {
      code: 200
    })),
        container = _render.container;

    (0, _assert["default"])(container.textContent === '200');
    (0, _assert["default"])(container.childNodes[0].classList.contains('success'));
  });
  it('should handle error response', function () {
    var _render2 = (0, _preact2.render)((0, _preact.h)(_ResponseStatus["default"], {
      code: 400
    })),
        container = _render2.container;

    (0, _assert["default"])(container.textContent === '400');
    (0, _assert["default"])(container.childNodes[0].classList.contains('error'));
  });
  it('should handle pending response', function () {
    var _render3 = (0, _preact2.render)((0, _preact.h)(_ResponseStatus["default"], {
      code: undefined
    })),
        container = _render3.container;

    (0, _assert["default"])(container.textContent === '...');
  });
  it('should handle failed request', function () {
    var _render4 = (0, _preact2.render)((0, _preact.h)(_ResponseStatus["default"], {
      code: -1
    })),
        container = _render4.container;

    (0, _assert["default"])(container.textContent === '⚠');
    (0, _assert["default"])(container.childNodes[0].classList.contains('error'));
  });
});