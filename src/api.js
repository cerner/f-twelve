import jsx from './utilities/jsx';
import App from './components/App';
import * as console from './components/content/console/Console';

/**
 * Main F-Twelve API
 */

const id = 'f-twelve';
const app = App({ id });
const el = app.el;

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
  app.console.overrideWindowConsole();
  app.console.overrideWindowOnError();
};

const disable = () => {
  active = false;
  detach();
  disableKeyboardTrigger();
  app.console.restoreWindowConsole();
  app.console.restoreWindowOnError();
};

const attach = () => {
  if (attached === true || active !== true) {
    return;
  }
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(el);
  attached = true;
  if (typeof customOnAttach === 'function') {
    customOnAttach();
  }
};

const detach = () => {
  if (attached !== true) {
    return;
  }
  const attachedEl = document.getElementById(id); // TODO: use el directly?
  attachedEl.parentNode.removeChild(attachedEl); // TODO: use el directly?
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
