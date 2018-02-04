import canUseDom from 'dummy/utils/can-use-dom';
import { module, test } from 'qunit';

module('Unit | Utility | can use dom');

test('it returns true when the window object exists and can create elements', function(assert) {
  let result = canUseDom;
  assert.ok(result);
});
