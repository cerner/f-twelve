import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import styles from './App.module.css';

/**
 * Single tab for the tab bar
 */
export default ({ setContent, label, content }) => {
  return (
    <div
      className={styles.tab}
      onclick={() => setContent(content)}
    >
      {label}
    </div>
  );
};
