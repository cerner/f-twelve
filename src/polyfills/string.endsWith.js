/**
 * Polyfill for String.endsWith
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
 */
if (!String.prototype.endsWith) {
  // eslint-disable-next-line no-extend-native
  String.prototype.endsWith = function(search, thisLen) {
    if (thisLen === undefined || thisLen > this.length) {
      thisLen = this.length;
    }
    return this.substring(thisLen - search.length, thisLen) === search;
  };
}
