import { h } from 'preact';
import styles from './RequestDetails.module.scss';
import ResponseStatus from './ResponseStatus';
import Tree from '../../dataTree/Tree';

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
      <Headers headers={request.headers}/>
      <Data data={request.data}/>
      <hr/>
      <div className={styles.header}>Response</div>
      <NameValue name="Status" value={<ResponseStatus code={request.responseStatus}/>}/>
      <Headers headers={request.responseHeaders}/>
      <Data data={request.response || request.responseText}/>
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
const Headers = ({ headers }) => {
  const isEmpty = typeof headers !== 'object' || !Object.keys(headers).length;
  const value = isEmpty && <div className={styles.none}>(none)</div>;
  const child = !isEmpty && Object.keys(headers)
    .map(key => <NameValue name={key} value={headers[key]}/>);
  return <NameValue child={child} name="Headers" value={value}/>;
};

/**
 * A NameValue that handles dynamic data of various types
 */
const Data = ({ data }) => {
  const value = typeof data === 'object'
    ? <Tree data={data}/>
    : data;
  return <NameValue name="Data" value={value}/>;
};
