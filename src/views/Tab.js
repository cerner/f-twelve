import jsx from '../utilities/jsx';
import styles from './App.module.css';

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
