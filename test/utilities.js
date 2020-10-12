import { waitFor } from '@testing-library/dom';

/**
 * Message for assertions used in setup, before the catual test
 */
export const setupError = 'Unable to complete test, prerequisite condition failed';

/**
 * Wrap waitFor but with no callback argument
 */
export const update = async (options) => await waitFor(() => null, options);

/**
 * Custom query function
 * https://testing-library.com/docs/dom-testing-library/api-queries#findallby
 */
export const findAllByClassName = async (container, className) =>
  waitFor(() => container.getElementsByClassName(className));

/**
 * Return first item with findAllByClassName
 */
export const findByClassName = async (container, className) =>
  (await findAllByClassName(container, className))[0];

/**
 * Dispatch a keyboard event
 */
export const dispatchKeyboardEvent = (type, key, target) => {
  (target || window.document).dispatchEvent(new KeyboardEvent(type, { key: key }));
};
