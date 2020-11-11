import { h } from 'preact';
import styles from './Resizer.module.scss';
import { useState } from 'preact/hooks';

export default ({ close, defaultHeight, targetRef }) => {
  const [height, setHeight] = useState(defaultHeight);

  const resizeMouseDown = (event) => {
    window.addEventListener('mousemove', resizeMouseMove, false);
    window.addEventListener('mouseup', resizeMouseUp, false);
  };

  const resizeMouseMove = (event) => {
    const height = Math.min(window.innerHeight, window.innerHeight - event.clientY);
    targetRef.current && (targetRef.current.style.height = `${height}px`);
    if (height < 20) {
      close(); // toggleOpen();
      resizeMouseUp();
      setHeight(defaultHeight);
    }
  };

  const resizeMouseUp = (event) => {
    window.removeEventListener('mousemove', resizeMouseMove, false);
    window.removeEventListener('mouseup', resizeMouseUp, false);
    setHeight(parseFloat(targetRef.current.style.height) || defaultHeight);
  };

  return [
    <div className={styles.resizer} onMouseDown={resizeMouseDown}/>,
    height,
  ];
};
