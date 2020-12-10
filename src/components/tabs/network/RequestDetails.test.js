import { h } from 'preact';
import assert from 'assert';
import { render } from '@testing-library/preact';
import RequestDetails from './RequestDetails';

const request = {
  data: null,
  endTime: new Date().getTime() + 1000,
  endTimeStamp: 0,
  headers: { 'accept': 'application/json' },
  headersRaw: '',
  method: 'GET',
  response: {},
  responseHeaders: { 'content-type': 'application/json' },
  responseHeadersRaw: '',
  responseStatus: 200,
  responseText: 'data',
  responseType: 'responseType',
  startTime: new Date().getTime(),
  startTimeStamp: 1000,
  url: 'http://localhost',
  xhr: 'xhr',
};

describe('RequestDetails', function() {
  it('should render successfully', function() {
    const { container } = render(<RequestDetails request={request}/>);
    assert(container.childNodes[0].classList.contains('details'));
  });
});
