import jsx from '../utilities/jsx';
import styles from './Tab.module.scss';

/**
 * Single tab for the tab bar
 */
export default ({ label, onclick }) => {
  return (
    <div className={styles.tab} onclick={onclick}>
      {label}
    </div>
  );
};
