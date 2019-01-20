import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox, config;

module('Unit | Integration | bing', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXX'
    };
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it can be configured with an id', function(assert) {
    let integration = this.owner.factoryFor('integration:bing').create({ config });
    assert.ok(integration);
  });

  test('#trackPage calls uetq with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:bing').create({ config });

    const stub = sandbox.stub(window.uetq, 'push').callsFake(function() {
      return true;
    });

    integration.trackPage();
    assert.ok(stub.calledWith('pageLoad'));
  });

  test('#trackConversion calls uetq with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:bing').create({ config });

    const stub = sandbox.stub(window.uetq, 'push').callsFake(function() {
      return true;
    });

    integration.trackConversion({ value: '42' });
    assert.ok(stub.calledWith({ ec: 'purchase', gv: '42' }));
  });
});
