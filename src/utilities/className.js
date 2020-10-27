/**
 * Accept an array of optionally falsey classname expressions and return a string of classnames
 */
export default (expressions) =>
  expressions
    .filter(Boolean)
    .join(' ');
