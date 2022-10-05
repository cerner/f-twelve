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

var _useResizer3 = _interopRequireDefault(require("./useResizer"));

/**
 * Root app view
 */
var _default = function _default() {
  var ref = (0, _preact.createRef)();

  var _useState = (0, _hooks.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _hooks.useState)('console'),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      activeTab = _useState4[0],
      setActiveTab = _useState4[1];

  var consoleData = (0, _useConsoleData["default"])();
  var networkData = (0, _useNetworkData["default"])();

  var _useResizer = (0, _useResizer3["default"])({
    defaultSize: 350,
    targetRef: ref
  }),
      _useResizer2 = (0, _slicedToArray2["default"])(_useResizer, 2),
      resizer = _useResizer2[0],
      height = _useResizer2[1];

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
  }, !isOpen ? icon : (0, _preact.h)(_preact.Fragment, null, resizer, icon, (0, _preact.h)("div", {
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