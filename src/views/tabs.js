import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import Tab from './tab';

/**
 * Tab bar with content
 */
export default ({ setContent, console }) => {

  const onClick = setContent.bind(this);
  const tabsObjs = [
    new Tab({
      onClick: onClick,
      label: 'Console',
      content: console
    })
  ];

  const tabs = tabsObjs.map(tab => tab.render());
  return (
    <div>
      {tabs}
    </div>
  );
};
