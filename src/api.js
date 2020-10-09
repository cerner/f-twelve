import { createRef, h, render } from 'preact';
import App from './components/App';
import xhrHook from './utilities/hooks/xhrHook';
import consoleHook from './utilities/hooks/consoleHook';

/**
 * Main F-Twelve API
 */
const el = document.createElement('div');
const ref = createRef();
const app = <App id={'f-twelve'} ref={ref}/>;

let customOnAttach;
let customOnDetach;
let keyDownStack;
let attached;
let active;

const enable = ({ show = true } = {}) => {
  active = true;
  if (show) {
    attach();
  }
  enableKeyboardTrigger();
  consoleHook.enable();
  xhrHook.enable();
};

const disable = () => {
  active = false;
  detach();
  disableKeyboardTrigger();
  consoleHook.disable();
  xhrHook.disable();
};

const attach = () => {
  if (attached === true || active !== true) {
    return;
  }
  document.body.appendChild(el);
  render(app, document.body, el);
  attached = true;
  if (typeof customOnAttach === 'function') {
    customOnAttach();
  }
};

const detach = () => {
  if (attached !== true) {
    return;
  }
  document.body.removeChild(ref.current.base);
  attached = false;
  if (typeof customOnDetach === 'function') {
    customOnDetach();
  }
};

const enableKeyboardTrigger = () => {
  keyDownStack = '';
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
};

const disableKeyboardTrigger = () => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
};

const onKeyDown = (event) => {
  keyDownStack += event.key;
  if (event.key === 'F12' || keyDownStack.toUpperCase() !== 'F12') {
    return;
  }
  if (attached) {
    detach();
  } else {
    attach();
  }
};

const onKeyUp = () => {
  keyDownStack = '';
};

const getKeyDownStack = () => keyDownStack;
const onAttach = callback => (customOnAttach = callback);
const onDetach = callback => (customOnDetach = callback);

export {
  el,
  attach,
  detach,
  disable,
  disableKeyboardTrigger,
  enable,
  enableKeyboardTrigger,
  getKeyDownStack,
  onKeyDown,
  onKeyUp,
  onAttach,
  onDetach,
};
