import parseStack from '../parseStack';

const originalConsole = Object.assign({}, window.console);
const originalOnError = window.onerror && typeof window.onerror === 'function' ? window.onerror.bind({}) : null;

/**
 * Is executed when a `console[level]` is executed (when hook is enabled)
 */
let consoleCallback;

/**
 * Override the 4 level functions on the window console and execute a callback before calling the original
 */
export const overrideWindowConsole = () => {
  const levels = ['log', 'warn', 'error', 'info'];
  levels.forEach((level) => {
    window.console[level] = (...args) => {
      const isError = args.length === 1 && args[0] instanceof Error;
      const stackPreFtwelve = getStack().split('\n').splice(3).join('\n');
      const stack = parseStack(isError ? args[0].stack : stackPreFtwelve);
      if (typeof consoleCallback === 'function') {
        consoleCallback({ level: level, args, stack });
      }
      return originalConsole[level] && originalConsole[level].apply(window.console, args);
    };
  });
};

/**
 * Only way to get a stack in IE is throw an actual error!
 */
const getStack = () => {
  try {
    throw Error();
  } catch (error) {
    return error.stack || '';
  }
};

export const restoreWindowConsole = () => {
  window.console = Object.assign({}, originalConsole);
};

export const overrideWindowOnError = () => {
  window.onerror = (message, source, lineNo, colNo, error) => {
    if (typeof originalOnError === 'function') {
      originalOnError.call(this, message, source, lineNo, colNo, error);
    }
    console.error(error);
    return true;
  };
};

export const restoreWindowOnError = () => {
  window.onerror = originalOnError ? originalOnError.bind({}) : null;
};

const enable = (callback) => {
  overrideWindowConsole(callback);
  overrideWindowOnError();
};

const disable = () => {
  restoreWindowConsole();
  restoreWindowOnError();
};

const onConsole = callback => (consoleCallback = callback);

export default {
  enable,
  disable,
  onConsole
};
