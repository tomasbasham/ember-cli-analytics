import Sinon from 'sinon';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox;

module('Unit | Integration | base', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it implements trackPage', function(assert) {
    let integration = this.owner.lookup('integration:base');

    const spy = sandbox.spy(integration, 'trackPage');

    integration.trackPage();
    assert.ok(spy.called);
  });

  test('it implements trackEvent', function(assert) {
    let integration = this.owner.lookup('integration:base');

    const spy = sandbox.spy(integration, 'trackEvent');

    integration.trackEvent();
    assert.ok(spy.called);
  });

  test('it implements trackConversion', function(assert) {
    let integration = this.owner.lookup('integration:base');

    const spy = sandbox.spy(integration, 'trackConversion');

    integration.trackConversion();
    assert.ok(spy.called);
  });

  test('it implements identify', function(assert) {
    let integration = this.owner.lookup('integration:base');

    const spy = sandbox.spy(integration, 'identify');

    integration.identify();
    assert.ok(spy.called);
  });

  test('it implements alias', function(assert) {
    let integration = this.owner.lookup('integration:base');

    const spy = sandbox.spy(integration, 'alias');

    integration.alias();
    assert.ok(spy.called);
  });
});
