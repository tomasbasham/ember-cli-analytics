import without from '../../../utils/without';
import { module, test } from 'qunit';

module('Unit | Utility | without');

test('it returns an object without specified keys', function(assert) {
  const crew = {
    captain: 'Jean-Luc Picard',
    commander: 'William Thomas Riker',
    ensign: 'Wesley Crusher'
  };

  const expectedResult = {
    captain: 'Jean-Luc Picard',
    commander: 'William Thomas Riker'
  };

  let result = without(crew, 'ensign'); // Shut up Wesley!
  assert.deepEqual(result, expectedResult);
});
