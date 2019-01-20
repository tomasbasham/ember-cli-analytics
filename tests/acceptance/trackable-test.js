import { visit } from '@ember/test-helpers';
import Sinon from 'sinon';

import { get } from '@ember/object';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'ember-qunit';

let sandbox;

module('Acceptance | trackable', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('#trackPage is called for every route transition', async function(assert) {
    const analytics = get(this.owner.lookup('router:main'), 'analytics');
    const spy = sandbox.spy(analytics, 'trackPage');

    await visit('/index');

    assert.ok(spy.withArgs({ page: '/index', title: '/index'}).calledOnce);
  });
});
