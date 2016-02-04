import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
import Sinon from 'sinon';

const {
  get
} = Ember;

let application, sandbox;

module('Acceptance | trackable', {
  beforeEach: function() {
    application = startApp();
    sandbox = Sinon.sandbox.create();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    sandbox.restore();
  }
});

test('#trackPage is called for every route transition', function(assert) {
  const router = application.__container__.lookup('router:main');
  const analytics = get(router, 'analytics');
  const spy = sandbox.spy(analytics, 'trackPage');

  visit('/index');
  andThen(function() {
    assert.ok(spy.withArgs({ page: '/index', title: '/index'}).calledOnce);
  });
});
