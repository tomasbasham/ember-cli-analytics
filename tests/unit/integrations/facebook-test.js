import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox, config;

module('Unit | Integration | facebook', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXXXXXXXX'
    };
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it can be configured with an id', function(assert) {
    let integration = this.owner.factoryFor('integration:facebook').create({ config });
    assert.ok(integration);
  });

  test('#trackEvent calls fbq with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:facebook').create({ config });

    const stub = sandbox.stub(window, 'fbq').callsFake(function() {
      return true;
    });

    integration.trackEvent({ event: 'The Battle of Sector 001' });
    assert.ok(stub.calledWith('track', 'The Battle of Sector 001'));
  });

  test('#trackConversion calls fbq with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:facebook').create({ config });

    const stub = sandbox.stub(window, 'fbq').callsFake(function() {
      return true;
    });

    integration.trackConversion({ event: 'The Battle of Sector 001' });
    assert.ok(stub.calledWith('track', 'The Battle of Sector 001'));
  });
});
