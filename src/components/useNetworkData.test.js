import assert from 'assert';
import { renderHook } from '@testing-library/preact-hooks';
import useNetworkData from './useNetworkData';

describe('useNetworkData', function() {
  it('should default to an empty array', async function() {
    const { result } = renderHook(() => useNetworkData());
    assert.deepStrictEqual(result.current, []);
  });
});
