import { useState } from 'preact/hooks';

/**
 * Attempt to parse whatever this is and return a JS object
 * It can go both ways, it will calculate raw if it's a json blob
 */
export default (data, raw) => {
  // Use state for async reads e.g. blobs
  const [object, setParsed] = useState(data);
  const [string, setString] = useState(raw);

  // If it's a json blob read it as a string
  if (object instanceof Blob && object.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (event) => {
      setParsed(event.target.result);
      setString(event.target.result);
    };
    reader.readAsText(object);
  }

  // Parse the string as json
  if (typeof object === 'string') {
    setParsed(parse(object) || parse(raw));
  }

  // Return an object if we managed to get an object, same with the string
  return [
    typeof object === 'object' ? object : null,
    typeof string === 'string' ? string : null
  ];
};

/**
 * Attempt to parse JSON data
 */
const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
