import { useEffect, useState } from 'preact/hooks';
import { console } from '../utilities/consoleHook';

/**
 * Accept an XHR instance and subscribe to the readystatechange event to keep the latest data in state
 */
export default (xhr) => {
  const getDetails = () => {
    console.log('readystatechange', xhr.readyState);
    return {
      url: xhr._url,
      readyState: xhr.readyState
    };
  };

  const [requestDetails, setRequestDetails] = useState(getDetails());

  useEffect(() => {
    console.log('listening... ', xhr.readyState);
    xhr.addEventListener('readystatechange', () => setRequestDetails(getDetails()), false);
  }, []);

  console.log('useNetworkData', requestDetails.readyState);
  return requestDetails;
};
