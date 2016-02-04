import { moduleFor, test } from 'ember-qunit';
import Sinon from 'sinon';

let sandbox;

moduleFor('service:analytics', 'Unit | Service | analytics', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it registers configured integrations', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it implements standard contracts', function(assert) {
  let service = this.subject();

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
