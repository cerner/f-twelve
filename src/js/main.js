import FTwelve from './views/f-twelve';

/**
 * Instantiate singleton and return public API
 */
const fTwelve = new FTwelve();
window.FTwelve = Object.freeze({
  enable: (show = true) => fTwelve.enable(show),
  disable: () => fTwelve.disable(),
  hide: () => fTwelve.detach(fTwelve),
  show: () => fTwelve.attach(fTwelve),
  onHide: (callback) => (fTwelve.onDetach = callback),
  onShow: (callback) => (fTwelve.onAttach = callback),
});
