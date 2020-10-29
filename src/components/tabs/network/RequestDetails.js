import { h } from 'preact';
import styles from './RequestDetails.module.scss';
import ResponseStatus from './ResponseStatus';
import Tree from '../../dataTree/Tree';
import { useState } from 'preact/hooks';

const noneDiv = <div className={styles.none}>(none)</div>;

/**
 * Request details
 */
export default ({ request }) => {
  if (!request) return;
  const formatTime = epoch => new Date(epoch).toISOString().replace('T', ' ');
  const elapsed = Math.round(request.endTimeStamp - request.startTimeStamp);
  return (
    <div className={styles.details}>
      <div className={styles.header}>Request</div>
      <NameValue name="Method" value={request.method}/>
      <NameValue name="URL" value={request.url}/>
      <NameValue name="Time" value={formatTime(request.startTime)}/>
      <Headers parsed={request.headers} raw={request.headersRaw}/>
      <Data data={request.data} raw={request.data}/>
      <hr/>
      <div className={styles.header}>Response</div>
      <NameValue name="Status" value={<ResponseStatus code={request.responseStatus}/>}/>
      <NameValue name="Time" value={`${formatTime(request.endTime)} (${elapsed}ms)`}/>
      <Headers parsed={request.responseHeaders} raw={request.responseHeadersRaw}/>
      <Data data={request.response} raw={request.responseText}/>
    </div>
  );
};

/**
 * Key/value pair with optional child data
 */
const NameValue = ({ name, value, child }) => (
  <dl>
    <dt>{name}</dt>
    {value && <dd>{value}</dd>}
    {child && <div className={styles.child}>{child}</div>}
  </dl>
);

/**
 * A NameValue with child NameValues for each header
 */
const Headers = ({ parsed, raw }) => {
  const [isParsed, toggleParsedButton] = useToggleParsedButton(true);
  const isEmpty = typeof parsed !== 'object' || !Object.keys(parsed).length;
  const value = isEmpty ? noneDiv : toggleParsedButton;
  const child = !isParsed ? <pre>{raw}</pre> : Object.keys(parsed)
    .map(key => <NameValue name={key} value={parsed[key]}/>);
  return <NameValue child={!isEmpty && child} name="Headers" value={value}/>;
};

/**
 * A NameValue that handles dynamic data of various types
 */
const Data = ({ data, raw }) => {
  const [isParsed, toggleParsedButton] = useToggleParsedButton();
  const parsed = useParsedData(data, raw);
  const value = isParsed ? <Tree data={parsed}/> : (raw && <pre>{raw}</pre>);
  const toggleButton = parsed && toggleParsedButton;
  return <NameValue child={value} name="Data" value={value ? toggleButton : noneDiv}/>;
};

/**
 * Provide a toggle button and the toggle state
 */
const useToggleParsedButton = (initialIsParsed = false) => {
  const [isParsed, setIsParsed] = useState(initialIsParsed);
  const toggleParsedButton = (
    <div className={styles.toggleParsedButton} onClick={() => setIsParsed(!isParsed)}>
      {isParsed ? 'view raw' : 'view parsed'}
    </div>
  );
  return [isParsed, toggleParsedButton];
};

/**
 * Attempt to parse whatever this is and return a JS object
 */
const useParsedData = (data, raw) => {
  // Use state for async reads e.g. blobs
  const [parsed, setParsed] = useState(data);

  // If it's a json blob read it as a string
  if (parsed instanceof Blob && parsed.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (event) => setParsed(event.target.result);
    reader.readAsText(parsed);
  }

  // If it's a string try parsing it
  if (typeof parsed === 'string') {
    setParsed(parse(parsed) || parse(raw));
  }

  // Return an object if we managed to get an object
  return typeof parsed === 'object' ? parsed : null;
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
