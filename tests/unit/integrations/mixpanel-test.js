import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox, config;

module('Unit | Integration | mixpanel', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
    config = {
      token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it can be configured with a token', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });
    assert.ok(integration);
  });

  test('#trackPage calls mixpanel with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });

    const stub = sandbox.stub(window.mixpanel, 'track').callsFake(function() {
      return true;
    });

    integration.trackPage({ url: '/', title: '/' });
    assert.ok(stub.calledWith('pageView', { url: '/', title: '/' }));
  });

  test('#trackEvent calls mixpanel with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });

    const stub = sandbox.stub(window.mixpanel, 'track').callsFake(function() {
      return true;
    });

    integration.trackEvent({ category: 'Starships', event: 'Warp', label: 'Enterprise' });
    assert.ok(stub.calledWith('Warp', { category: 'Starships', label: 'Enterprise' }));
  });

  test('#trackConversion calls mixpanel with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });

    const stub = sandbox.stub(window.mixpanel.people, 'track_charge').callsFake(function() {
      return true;
    });

    integration.trackConversion({ value: '42' });
    assert.ok(stub.calledWith('42'));
  });

  test('#identify calls mixpanel with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });

    const stub = sandbox.stub(window.mixpanel, 'identify').callsFake(function() {
      return true;
    });

    integration.identify({ id: '001' });
    assert.ok(stub.calledWith('001'));
  });

  test('#alias calls mixpanel with the correct arguments', function(assert) {
    let integration = this.owner.factoryFor('integration:mixpanel').create({ config });

    const stub = sandbox.stub(window.mixpanel, 'alias').callsFake(function() {
      return true;
    });

    integration.alias({ alias: 'Borg', original: '001' });
    assert.ok(stub.calledWith('Borg', '001'));
  });
});
