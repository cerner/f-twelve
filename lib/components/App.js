"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _AppModule = _interopRequireDefault(require("./App.module.scss"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _Console = _interopRequireDefault(require("./tabs/console/Console"));

var _Network = _interopRequireDefault(require("./tabs/network/Network"));

var _hooks = require("preact/hooks");

var _useConsoleData = _interopRequireDefault(require("./useConsoleData"));

var _useNetworkData = _interopRequireDefault(require("./useNetworkData"));

var defaultHeight = 350;
/**
 * Root app view
 */

var _default = function _default() {
  var ref = (0, _preact.createRef)();

  var _useState = (0, _hooks.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _hooks.useState)(defaultHeight),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];

  var _useState5 = (0, _hooks.useState)('console'),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      activeTab = _useState6[0],
      setActiveTab = _useState6[1];

  var consoleData = (0, _useConsoleData["default"])();
  var networkData = (0, _useNetworkData["default"])();
  var tabContents = {
    console: (0, _preact.h)(_Console["default"], {
      consoleData: consoleData
    }),
    network: (0, _preact.h)(_Network["default"], {
      networkData: networkData
    })
  };

  var toggleOpen = function toggleOpen() {
    ref.current && (ref.current.style.height = isOpen ? '0px' : "".concat(height, "px"));
    setOpen(!isOpen);
  };

  var resizeMouseDown = function resizeMouseDown(event) {
    window.addEventListener('mousemove', resizeMouseMove, false);
    window.addEventListener('mouseup', resizeMouseUp, false);
  };

  var resizeMouseMove = function resizeMouseMove(event) {
    var height = Math.min(window.innerHeight, window.innerHeight - event.clientY);
    ref.current && (ref.current.style.height = "".concat(height, "px"));

    if (height < 20) {
      toggleOpen();
      resizeMouseUp();
      setHeight(defaultHeight);
    }
  };

  var resizeMouseUp = function resizeMouseUp(event) {
    window.removeEventListener('mousemove', resizeMouseMove, false);
    window.removeEventListener('mouseup', resizeMouseUp, false);
    setHeight(parseFloat(ref.current.style.height) || defaultHeight);
  };

  var onClickTab = function onClickTab(event) {
    return setActiveTab(event.target.textContent.toLowerCase());
  };

  var getTabClassName = function getTabClassName(tabName) {
    return "".concat(_AppModule["default"].tab, " ").concat(activeTab === tabName ? _AppModule["default"].activeTab : '').trim();
  };

  var icon = (0, _preact.h)(_Icon["default"], {
    className: _AppModule["default"].icon,
    onClick: toggleOpen,
    title: "".concat(isOpen ? 'Hide' : 'Show', " F-Twelve")
  });
  return (0, _preact.h)("div", {
    className: "".concat(_AppModule["default"].app, " ").concat(isOpen ? _AppModule["default"].open : ''),
    ref: ref
  }, !isOpen ? icon : (0, _preact.h)(_preact.Fragment, null, (0, _preact.h)("div", {
    className: _AppModule["default"].resizer,
    onMouseDown: resizeMouseDown
  }), icon, (0, _preact.h)("div", {
    className: _AppModule["default"].tabBar
  }, (0, _preact.h)("div", {
    className: getTabClassName('console'),
    onClick: onClickTab
  }, "Console"), (0, _preact.h)("div", {
    className: getTabClassName('network'),
    onClick: onClickTab
  }, "Network")), (0, _preact.h)("div", {
    className: _AppModule["default"].content
  }, tabContents[activeTab])));
};

exports["default"] = _default;