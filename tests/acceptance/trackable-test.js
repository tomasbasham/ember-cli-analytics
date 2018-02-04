import Sinon from 'sinon';

import { get } from '@ember/object';
import { test } from 'qunit';

import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let sandbox;

moduleForAcceptance('Acceptance | trackable', {
  beforeEach: function() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach: function() {
    sandbox.restore();
  }
});

test('#trackPage is called for every route transition', function(assert) {
  const router = this.application.__container__.lookup('router:main');
  const analytics = get(router, 'analytics');
  const spy = sandbox.spy(analytics, 'trackPage');

  visit('/index');

  andThen(function() {
    assert.ok(spy.withArgs({ page: '/index', title: '/index'}).calledOnce);
  });
});
