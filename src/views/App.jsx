import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import styles from './App.module.css';
import Tabs from './tabs';
import Console from './content/console/console';

/**
 * F-Twelve entrypoint
 */

const console = new Console();

let el;
let onAttach;
let onDetach;
let keyDownStack;
let contentWrapper = <div/>;
let content;
let attached;
let active;

const id = 'f-twelve';

const setContent = (el) => {
  if (content) {
    contentWrapper.removeChild(content);
  }
  if (!el.isSameNode(content)) {
    contentWrapper.appendChild(el);
    content = el;
  } else {
    content = undefined;
  }
};

const enable = ({ show = true }) => {
  active = true;
  if (show) {
    attach();
  }
  enableKeyboardTrigger();
  console.overrideWindowConsole();
  console.overrideWindowOnError();
};

const disable = () => {
  active = false;
  detach();
  disableKeyboardTrigger();
  console.restoreWindowConsole();
  console.restoreWindowOnError();
};

const attach = () => {
  if (attached === true || active !== true) {
    return;
  }
  const body = document.getElementsByTagName('body')[0];
  el = el || render(); // TODO: Move things to api.js to hold the instance
  body.appendChild(el);
  attached = true;
  if (typeof onAttach === 'function') {
    onAttach();
  }
};

const detach = () => {
  if (attached !== true) {
    return;
  }
  const attachedEl = document.getElementById(id);
  attachedEl.parentNode.removeChild(attachedEl);
  attached = false;
  if (typeof onDetach === 'function') {
    onDetach();
  }
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

const enableKeyboardTrigger = () => {
  keyDownStack = '';
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
};

const disableKeyboardTrigger = () => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
};

const getKeyDownStack = () => keyDownStack;
const setOnAttach = callback => (onAttach = callback);
const setOnDetach = callback => (onDetach = callback);
const render = () => (
  <div id={id} className={styles.fTwelve}>
    {new Tabs({ console, setContent }).render()}
    {contentWrapper}
  </div>
);

export {
  setContent,
  enable,
  disable,
  attach,
  detach,
  onKeyDown,
  onKeyUp,
  enableKeyboardTrigger,
  disableKeyboardTrigger,
  getKeyDownStack,
  setOnAttach,
  setOnDetach,
};

export default render;
