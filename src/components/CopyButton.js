import { createRef, h } from 'preact';
import styles from './CopyButton.module.scss';
import { useState } from 'preact/hooks';

/**
 * Copy icon made of CSS rectangles
 */
export default ({ getText, title = 'Copy' }) => {
  const ref = createRef();
  const [success, setSucces] = useState(false);

  /**
   * Copy the output of getText() to the clipboard and indicate success
   */
  const onClick = () => {
    // Create an invisible textarea with the text, highlight, copy, remove the textarea
    const textArea = document.createElement('textarea');
    textArea.classList.add(styles.tempTextArea);
    textArea.value = getText();
    ref.current.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    ref.current.removeChild(textArea);

    // Temporarily show a checkmark on the copy icon
    setSucces(true);
    setTimeout(() => setSucces(false), 2000);
  };

  return (
    <div className={styles.copyButton} onClick={onClick} ref={ref} title={title}>
      <div className={styles.back}/>
      <div className={styles.front}/>
      {success && <span className={styles.successMessage} title='Copied'>✔</span>}
    </div>
  );
};
