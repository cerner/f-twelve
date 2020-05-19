import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
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
