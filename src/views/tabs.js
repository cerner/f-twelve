import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import Tab from './Tab';

/**
 * Tab bar with content
 */
export default ({ setContent, console }) => {
  return (
    <>
      <Tab
        label='Console'
        onclick={() => setContent(console)}
      />
    </>
  );
};
