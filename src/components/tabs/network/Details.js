import { h } from 'preact';
import styles from './Details.module.scss';

/**
 * Request details
 */
export default ({ request }) => {
  return (
    <div className={styles.details}>
      <pre>
        {JSON.stringify(request, null, 2)}
      </pre>
    </div>
  );
};
