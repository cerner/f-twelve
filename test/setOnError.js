/**
 * Provide an original window.onerror to test the override functionality
 */
window.onErrorCallCount = 0;
window.onerror = () => {
  window.onErrorCallCount = window.onErrorCallCount + 1;
};
