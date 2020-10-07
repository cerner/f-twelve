import assert from 'assert';
import Console from './Console';
import { stdout, stderr } from 'test-console';

describe('Console', function() {
  before(function() {
    this.console = Console();
  });
});
