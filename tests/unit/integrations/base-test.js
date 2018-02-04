import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox;

moduleFor('integration:base', 'Unit | Integration | base', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it implements trackPage', function(assert) {
  let integration = this.subject();

  const spy = sandbox.spy(integration, 'trackPage');

  integration.trackPage();
  assert.ok(spy.called);
});

test('it implements trackEvent', function(assert) {
  let integration = this.subject();

  const spy = sandbox.spy(integration, 'trackEvent');

  integration.trackEvent();
  assert.ok(spy.called);
});

test('it implements trackConversion', function(assert) {
  let integration = this.subject();

  const spy = sandbox.spy(integration, 'trackConversion');

  integration.trackConversion();
  assert.ok(spy.called);
});

test('it implements identify', function(assert) {
  let integration = this.subject();

  const spy = sandbox.spy(integration, 'identify');

  integration.identify();
  assert.ok(spy.called);
});

test('it implements alias', function(assert) {
  let integration = this.subject();

  const spy = sandbox.spy(integration, 'alias');

  integration.alias();
  assert.ok(spy.called);
});
