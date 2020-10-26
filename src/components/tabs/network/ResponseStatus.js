import { h } from 'preact';
import styles from './ResponseStatus.module.scss';
import cn from '../../../utilities/className';

/**
 * Response Status
 */
export default ({ code }) => {
  const className = cn([
    styles.status,
    code >= 400 && styles.error,
    code < 400 && code >= 200 && styles.success,
  ]);
  return (
    <div className={className}>{code || '...'}</div>
  );
}
;
