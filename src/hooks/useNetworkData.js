import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to the xhrHook and provide the latest network data
 */
export default () => {

  const [networkData, dispatchNetworkData] = useReducer(reducer, []);

  useEffect(() => {
    // Every time an XHR readystatechange event occurs, store the data
    xhrHook.onOpened((xhr) => dispatchNetworkData([XMLHttpRequest.OPENED, xhr]));
    xhrHook.onHeadersReceived((xhr) => dispatchNetworkData([XMLHttpRequest.HEADERS_RECEIVED, xhr]));
    xhrHook.onLoading((xhr) => dispatchNetworkData([XMLHttpRequest.LOADING, xhr]));
    xhrHook.onDone((xhr) => dispatchNetworkData([XMLHttpRequest.DONE, xhr]));
  }, []);

  return networkData;
};

/**
 * Update the current requests (state) based on XHR readystatechange events
 */
const reducer = (state, action) => {
  const [actionName, request] = action;
  switch (actionName) {
    case XMLHttpRequest.OPENED:
      return state.concat(request);
    case XMLHttpRequest.HEADERS_RECEIVED:
    case XMLHttpRequest.LOADING:
    case XMLHttpRequest.DONE:
      // TODO: Update state with appropriate values
      return state;
    default:
      throw new Error('Unexpected actionType');
  }
};
