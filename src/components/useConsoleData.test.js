import assert from 'assert';
import { renderHook } from '@testing-library/preact-hooks';
import useConsoleData from './useConsoleData';
import consoleHook from '../utilities/consoleHook';
import { update } from '../../test/utilities';

describe('useConsoleData', function() {
  beforeEach(function() {
    consoleHook.enable();
  });
  afterEach(function() {
    consoleHook.disable();
  });
  const testLevel = async (level) => {
    const { result } = renderHook(() => useConsoleData());
    console[level]('message');
    await update();
    assert.deepStrictEqual(result.current[0].argData[0].value, 'message');
    assert.deepStrictEqual(result.current[0].level, level);
  };
  it('should capture console.log', async function() {
    testLevel('log');
  });
  it('should capture console.info', async function() {
    testLevel('info');
  });
  it('should capture console.warn', async function() {
    testLevel('warn');
  });
  it('should capture console.error', async function() {
    testLevel('error');
  });
  it('should handle multiple arguments', async function() {
    const { result } = renderHook(() => useConsoleData());
    console.log('one', 1, true, false, [1, 2, 3], { key: 'value' }, undefined);
    await update();
    const args = result.current[0].argData;
    assert.deepStrictEqual(args[0].value, 'one');
    assert.deepStrictEqual(args[1].value, 1);
    assert.deepStrictEqual(args[2].value, true);
    assert.deepStrictEqual(args[3].value, false);
    assert.deepStrictEqual(args[4].value, [1, 2, 3]);
    assert.deepStrictEqual(args[5].value, { key: 'value' });
    assert.deepStrictEqual(args[6].value, undefined);
  });
  it('should capture fileName and line number', async function() {
    const { result } = renderHook(() => useConsoleData());
    console.log('message');
    await update();
    assert.deepStrictEqual(result.current[0].fileName, 'useConsoleData.test:49');
  });
});
