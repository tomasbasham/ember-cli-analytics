import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox, config;

module('Unit | Integration | google adwords', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXX',
      label: 'XXXXXXXXXXXXXXXXXXX'
    };
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it can be configured with an id', function(assert) {
    let integration = this.owner.factoryFor('integration:google-adwords').create({ config });
    assert.ok(integration);
  });

  test('#trackConversion calls google_trackConversion with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:google-adwords').create({ config });

    const stub = sandbox.stub(window, 'google_trackConversion').callsFake(function() {
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
});
