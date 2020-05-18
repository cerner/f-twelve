import Console from './views/content/console/console';

/**
 * F-Twelve public API
 */

const console = new Console();

export default function() {

  let onAttach;
  let onDetach;
  let keyDownStack;
  let attached;
  let active;

  const enable = (show = true) => {
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
    const attachedEl = document.getElementById(el.id);
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

  return {
    enable,
    disable,
    attach,
    detach,
    onKeyDown,
    onKeyUp,
    enableKeyboardTrigger,
    disableKeyboardTrigger,
    getKeyDownStack: () => keyDownStack,
    onAttach: callback => (onAttach = callback),
    onDetach: callback => (onDetach = callback)
  };

  // TODO
  // return Object.freeze({
  //   enable: (show = true) => fTwelve.enable(show),
  //   disable: () => fTwelve.disable(),
  //   hide: () => fTwelve.detach(fTwelve),
  //   show: () => fTwelve.attach(fTwelve),
  //   onHide: (callback) => (fTwelve.onDetach = callback),
  //   onShow: (callback) => (fTwelve.onAttach = callback),
  // });
};
