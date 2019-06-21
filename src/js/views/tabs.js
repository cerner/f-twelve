import Tab from './tab';
import Console from '../views/content/console/console';

/**
 * Tab bar with content
 */
class Tabs {
  constructor({ setContent }) {
    this.el = document.createElement('div');
    this.setContent = setContent;
  }

  render() {
    const tabs = this.getTabs();
    tabs.forEach((tab) => {
      this.el.appendChild(tab.render());
    });
    return this.el;
  }

  getTabs() {
    const onClick = this.setContent.bind(this);
    return [
      new Tab({
        onClick: onClick,
        label: 'Console',
        content: new Console()
      })
    ];
  }
}

export default Tabs;
