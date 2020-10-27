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
  return (
    <div className={styles.details}>
      <div className={styles.header}>Request</div>
      <NameValue name="Method" value={request.method}/>
      <NameValue name="URL" value={request.url}/>
      <Headers parsed={request.headers} raw={request.headersRaw}/>
      <Data data={request.data} raw={request.data}/>
      <hr/>
      <div className={styles.header}>Response</div>
      <NameValue name="Status" value={<ResponseStatus code={request.responseStatus}/>}/>
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
  const parsed = typeof data === 'object' ? data : (parse(data) || parse(raw));
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
 * Attempt to parse JSON data
 */
const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
