import { moduleFor, test } from 'ember-qunit';
import Sinon from 'sinon';

let sandbox, config;

moduleFor('integration:google-adwords', 'Unit | Integration | google adwords', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXX',
      label: 'XXXXXXXXXXXXXXXXXXX'
    };
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it can be configured with an id', function(assert) {
  let integration = this.subject({ config });
  assert.ok(integration);
});

test('#trackConversion calls google_trackConversion with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'google_trackConversion', function() {
    return true;
  });

  integration.trackConversion({ value: '42' });

  assert.ok(stub.calledWith({
      'google_conversion_id': 'XXXXXXXXXX',
      'google_conversion_language': 'en',
      'google_conversion_format': '3',
      'google_conversion_color': 'ffffff',
      'google_conversion_label': 'XXXXXXXXXXXXXXXXXXX',
      'google_conversion_value': '42',
      'google_remarketing_only': false
  }));
});
