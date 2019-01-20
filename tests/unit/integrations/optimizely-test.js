import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox, config;

module('Unit | Integration | optimizely', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXX'
    };
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it can be configured with an id', function(assert) {
    let integration = this.owner.factoryFor('integration:optimizely').create({ config });
    assert.ok(integration);
  });

  test('#trackPage calls optimizely with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:optimizely').create({ config });

    const stub = sandbox.stub(window.optimizely, 'push').callsFake(function() {
      return true;
    });

    integration.trackPage({
      experiment: 123
    });

    assert.ok(stub.calledWith(['activate', 123]));
  });

  test('#trackEvent calls optimizely with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:optimizely').create({ config });

    const stub = sandbox.stub(window.optimizely, 'push').callsFake(function() {
      return true;
    });

    integration.trackEvent({
      event: 'The Battle of Sector 001'
    });

    assert.ok(stub.calledWith(['trackEvent', 'The Battle of Sector 001']));
  });
});
