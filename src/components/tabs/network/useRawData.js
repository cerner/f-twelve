import { useState } from 'preact/hooks';

/**
 * Determine the 'raw string' representation of arbitrary data
 */
export default (raw) => {
  // Use state for async reads e.g. blobs
  const [data, setData] = useState(raw);

  // If it's a text or json blob convert it to a string
  if (data instanceof Blob && (data.type === 'application/json' || data.type === 'text/plain')) {
    const reader = new window.FileReader();
    reader.onload = (event) => {
      setData(event.target.result);
    };
    reader.readAsText(data);
  }

  // if it's a Document return the HTML
  if (data && Object.getPrototypeOf(data).constructor.name === 'HTMLDocument') {
    setData(data.documentElement.outerHTML);
  }

  // Return a string only if we managed to get one
  return typeof data === 'string' ? data : null;
};
