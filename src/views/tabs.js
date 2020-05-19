import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import Tab from './Tab';

/**
 * Tab bar with content
 */
export default ({ setContent, console }) => {
  return (
    <div>
      <Tab
        setContent={setContent}
        label='Console'
        content={console}
      />
    </div>
  );
};
