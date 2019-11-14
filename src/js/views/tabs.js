import Tab from './tab';

/**
 * Tab bar with content
 */
class Tabs {
  constructor({ setContent, console }) {
    this.el = document.createElement('div');
    this.setContent = setContent;
    this.console = console;
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
        content: this.console
      })
    ];
  }
}

export default Tabs;
