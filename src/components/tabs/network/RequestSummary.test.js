import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import RequestSummary from './RequestSummary';
import { dispatchKeyboardEvent, findAllByClassName } from '../../../../test/utilities';

const request = {
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
};

describe('Requestsummary', function() {
  it('should select on enter', async function() {
    let selected = false;
    const onSelect = (event, request) => (selected = true);
    const { container } = render(<RequestSummary onSelect={onSelect} request={request}/>);
    dispatchKeyboardEvent('keydown', 'Enter', container.firstChild);
    // dispatchKeyboardEvent('keydown', 'ArrowUp', this.inputBox);
    assert.strictEqual(selected, true);
  });
  it('should select previous sibling on arrow up', async function() {
    let row1clicked = false;
    let row2clicked = false;
    const { container } = render(<div>
      <RequestSummary isSelected={false} onSelect={() => (row1clicked = true)} request={request}/>
      <RequestSummary isSelected={true} onSelect={() => (row2clicked = true)} request={request}/>
    </div>);
    const rows = await findAllByClassName(container, 'requestSummary');
    dispatchKeyboardEvent('keydown', 'ArrowUp', rows[1]);
    assert(row1clicked);
    assert(!row2clicked);
  });
  it('should select next sibling on arrow down', async function() {
    let row1clicked = false;
    let row2clicked = false;
    const { container } = render(<div>
      <RequestSummary isSelected={true} onSelect={() => (row1clicked = true)} request={request}/>
      <RequestSummary isSelected={false} onSelect={() => (row2clicked = true)} request={request}/>
    </div>);
    const rows = await findAllByClassName(container, 'requestSummary');
    dispatchKeyboardEvent('keydown', 'ArrowDown', rows[0]);
    assert(!row1clicked);
    assert(row2clicked);
  });
});
