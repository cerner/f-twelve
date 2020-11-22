import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import Network from './Network';
import { update } from '../../../../test/utilities';

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
  it('Should render successfully', function() {
    const { container } = render(<Network networkData={[{}, {}, {}]}/>);
    assert(container.childNodes[0].classList.contains('network'));
  });
  it('Should display details and select row on click', async function() {
    const { container } = render(<Network networkData={networkData}/>);
    assert(container.getElementsByClassName('details').length === 0);
    container.getElementsByClassName('row')[0].click();
    await update();
    assert(container.getElementsByClassName('details').length === 1);
    assert(container.getElementsByClassName('row')[0].classList.contains('selected'));
  });
});
