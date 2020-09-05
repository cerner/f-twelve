/**
 * Determine the data type of any JS variable
 * @param value The variable to check
 * @returns {"null"|"array"|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
export default (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};
