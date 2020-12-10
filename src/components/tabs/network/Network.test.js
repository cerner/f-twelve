import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import Network from './Network';
import { findByClassName, update } from '../../../../test/utilities';

const networkData = [{
  data: null,
  endTime: new Date().getTime() + 1000,
  endTimeStamp: 0,
  headers: [],
  headersRaw: '',
  method: 'GET',
  response: {},
  responseHeaders: [],
  responseHeadersRaw: '',
  responseStatus: 200,
  responseText: 'data',
  responseType: 'responseType',
  startTime: new Date().getTime(),
  startTimeStamp: 1000,
  url: 'http://localhost',
  xhr: 'xhr',
}];

describe('Network', function() {
  it('should render successfully', function() {
    const { container } = render(<Network networkData={[{}, {}, {}]}/>);
    assert(container.childNodes[0].classList.contains('network'));
  });
  it('should display details and select row on click', async function() {
    const { container } = render(<Network networkData={networkData}/>);
    assert(container.getElementsByClassName('details').length === 0);
    container.getElementsByClassName('requestSummary')[0].click();
    await update();
    assert(container.getElementsByClassName('details').length === 1);
    assert(container.getElementsByClassName('requestSummary')[0].classList.contains('selected'));
  });
  describe('resizer', function() {
    it('should resize to a minimum of 4px', async function() {
      const { container } = render(<Network networkData={networkData}/>);
      const list = await findByClassName(container, 'list');
      list.parentElement.style.display = 'flex'; // Assign manually since stylesheets don't apply in tests
      const resizer = await findByClassName(container, 'resizer');
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: -10 }));
      window.dispatchEvent(new MouseEvent('mouseup'));
      assert.strictEqual(list.style.flexBasis, `4px`);
    });
  });
});
