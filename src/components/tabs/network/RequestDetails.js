import { Fragment, h } from 'preact';
import styles from './RequestDetails.module.scss';
import ResponseStatus from './ResponseStatus';

/**
 * Request details
 */
export default ({ request }) => {
  return request && (
    <div className={styles.details}>
      <div className={styles.header}>Request</div>
      <NameValue name="Method" value={request.method}/>
      <NameValue name="URL" value={request.url}/>
      <NameValue child={<Headers headers={request.headers}/>} name="Headers"/>
      <NameValue name="Request Data" value={request.data}/>
      <hr/>
      <div className={styles.header}>Response</div>
      <NameValue name="Status" value={<ResponseStatus code={request.responseStatus}/>}/>
      <NameValue child={<Headers headers={request.responseHeaders}/>} name="Headers"/>
      <NameValue name="Response Data" value={request.responseText}/>
    </div>
  );
};

const NameValue = ({ name, value, child }) => (
  <dl>
    <dt>{name}</dt>
    {value && <dd>{value}</dd>}
    {child && <div className={styles.child}>{child}</div>}
  </dl>
);

// TODO: Make this better
const Headers = ({ headers }) => (
  headers.map && headers.map(header => {
    const split = header.split(':');
    return <NameValue name={split[0]} value={split[1]}/>;
  })
);
