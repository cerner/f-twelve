import { h } from 'preact';
import styles from './ResponseStatus.module.scss';
import cn from '../../../utilities/className';

/**
 * Response Status
 */
export default ({ code }) => {
  const className = cn(
    styles.status,
    (code === -1 || code >= 400) && styles.error,
    code >= 200 && code < 400 && styles.success,
  );
  const display = code === -1 ? '⚠' : (code || '...');
  const title = code === -1 ? { title: 'Request failed' } : {};
  return (
    <div className={className} {...title}>{display}</div>
  );
}
;
