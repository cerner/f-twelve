import jsx from '../utilities/jsx';
import styles from './CopyButton.module.scss';

/**
 * Copy icon made of CSS rectangles
 */
export default ({ getText, title = 'Copy' }) => {
  return (
    <div className={styles.copyButton} onclick={event => onClickCopy(event, getText)} title={title}>
      <div className={styles.back}/>
      <div className={styles.front}/>
    </div>
  );
};

/**
 * Copy the output of getText() to the clipboard and indicate success
 */
const onClickCopy = (event, getText) => {
  const copyButton = event.currentTarget;
  const text = getText();

  // Create an invisible textarea with the text, highlight, copy, remove the textarea
  const textArea = <textarea className={styles.tempTextArea} value={text}/>;
  copyButton.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  copyButton.removeChild(textArea);

  // Temporarily show a checkmark on the copy icon
  const successEl = <span className={styles.successMessage} title='Copied'>✔</span>;
  copyButton.appendChild(successEl);
  setTimeout(() => copyButton.removeChild(successEl), 2000);
};
