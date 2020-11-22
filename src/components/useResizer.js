import { h } from 'preact';
import styles from './Resizer.module.scss';
import { useState } from 'preact/hooks';
import cn from '../utilities/className';

/**
 * Add a line that can be clicked and dragged to resize a target element
 * Defaults to height but also supports width
 */
export default ({ defaultSize, targetRef, resizeWidth = false }) => {
  const [size, setSize] = useState(defaultSize);

  const getSizeStyleProperty = () => {
    if (targetRef.current.parentElement && getComputedStyle(targetRef.current.parentElement).display === 'flex') {
      return 'flex-basis';
    } else {
      return resizeWidth ? 'width' : 'height';
    }
  };

  const onMouseDown = (event) => {
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
  };

  const onMouseMove = (event) => {
    const maxSize = resizeWidth
      ? Math.min(window.innerWidth - 20, event.clientX)
      : Math.min(window.innerHeight, window.innerHeight - event.clientY);
    const size = `${Math.max(maxSize, 4)}px`;
    targetRef.current && (targetRef.current.style[getSizeStyleProperty()] = size);
  };

  const onMouseUp = (event) => {
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    setSize(parseFloat(targetRef.current.style[getSizeStyleProperty()]) || defaultSize);
  };

  const classname = cn(styles.resizer, resizeWidth ? styles.widthMode : styles.heightMode);
  const resizer = <div className={classname} onMouseDown={onMouseDown}/>;

  return [
    resizer,
    size,
  ];
};
