import { h } from 'preact';
import styles from './RequestDetails.module.scss';
import ResponseStatus from './ResponseStatus';
import Tree from '../../dataTree/Tree';
import { useState } from 'preact/hooks';
import useRawData from './useRawData';

const noneDiv = <div className={styles.none}>(none)</div>;

/**
 * Request details
 */
export default ({ request }) => {
  if (!request) return;
  const formatTime = epoch => new Date(epoch).toISOString().replace('T', ' ');
  const elapsed = Math.round(request.endTimeStamp - request.startTimeStamp);
  return (
    <div className={styles.details} key={request}>
      <div className={styles.header}>Request</div>
      <NameValue name="Method" value={request.method}/>
      <NameValue name="URL" value={request.url}/>
      <NameValue name="Time" value={formatTime(request.startTime)}/>
      <Headers parsed={request.headers} raw={request.headersRaw}/>
      <Data raw={request.data}/>
      <hr/>
      <div className={styles.header}>Response</div>
      <NameValue name="Status" value={<ResponseStatus code={request.responseStatus}/>}/>
      <NameValue name="Time" value={`${formatTime(request.endTime)} (${elapsed}ms)`}/>
      <Headers parsed={request.responseHeaders} raw={request.responseHeadersRaw}/>
      <Data raw={request.responseText || request.response}/>
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
  const [isParsed, toggleParsedButton] = useToggleParsedButton();
  const isEmpty = typeof parsed !== 'object' || !Object.keys(parsed).length;
  const value = isEmpty ? noneDiv : toggleParsedButton;
  const child = !isParsed ? <pre>{raw}</pre> : Object.keys(parsed)
    .map(key => <NameValue name={key} value={parsed[key]}/>);
  return <NameValue child={!isEmpty && child} name="Headers" value={value}/>;
};

/**
 * A NameValue that handles dynamic data of various types
 */
const Data = ({ raw }) => {
  const string = useRawData(raw);
  const parsed = parse(string);
  const [isParsed, toggleParsedButton] = useToggleParsedButton();
  const value = parsed && isParsed ? <Tree data={parsed}/> : (string && <pre>{string}</pre>);
  const toggleButton = parsed && toggleParsedButton;
  return <NameValue child={value} name="Data" value={value ? toggleButton : noneDiv}/>;
};

/**
 * Provide a toggle button and the toggle state
 */
const useToggleParsedButton = () => {
  const [isParsed, setIsParsed] = useState(true);
  const toggleParsedButton = (
    <div className={styles.toggleParsedButton} onClick={() => setIsParsed(!isParsed)}>
      {isParsed ? 'view raw' : 'view parsed'}
    </div>
  );
  return [isParsed, toggleParsedButton];
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
