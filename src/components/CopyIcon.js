import jsx from '../utilities/jsx';
import styles from './CopyIcon.module.scss';

/**
 * Copy icon made of CSS rectangles
 */
export default ({ ...attributes }) => {
  return (
    <div className={styles.copyIcon} {...attributes}>
      <div className={styles.back}/>
      <div className={styles.front}/>
    </div>
  );
};
