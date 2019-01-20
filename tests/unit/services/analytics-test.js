import Sinon from 'sinon';

import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let sandbox;

module('Unit | Service | analytics', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it registers configured integrations', function(assert) {
    let service = this.owner.lookup('service:analytics');
    assert.ok(service);
  });

  test('it passes config options to the configured integrations', function(assert) {
    let service = this.owner.lookup('service:analytics');
    assert.equal(get(service, '_adapters.GoogleAnalytics.config.id'), 'UA-XXXXXXXX-Y');
  });

  test('it implements standard contracts', function(assert) {
    let service = this.owner.lookup('service:analytics');

    delete window.mixpanel.toString;

    sandbox.stub(window.mixpanel, 'track');
    sandbox.stub(window.mixpanel, 'identify');
    sandbox.stub(window.mixpanel, 'alias');
    sandbox.stub(window.mixpanel.people, 'track_charge');
    sandbox.stub(window, 'ga');

    const spy = sandbox.spy(service, 'invoke');
    const expectedContracts = ['trackPage', 'trackEvent', 'trackConversion', 'identify', 'alias'];

    expectedContracts.forEach(function(contractName) {
      service[contractName].call(service, {
        event: 'The Battle of Sector 001', // Necessary for trackEvent.
        label: 'NCC-1071-D', // Necessary for trackConversion.
        value: '42', // Necessary for trackConversion.
        id: '001', // Necessary for identify.
        alias: 'Borg', // Necesssary for alias.
      });
    });

    assert.equal(spy.callCount, 5);
  });
});
