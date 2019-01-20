import EmberObject from '@ember/object';
import Sinon from 'sinon';

import TrackableMixin from 'ember-cli-analytics/mixins/trackable';

import { set } from '@ember/object';
import { module, test } from 'qunit';

let sandbox;

module('Unit | Mixin | trackable', function(hooks) {
  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('#trackPage is called on didTransition', function(assert) {
    let TrackableObject = EmberObject.extend(TrackableMixin);
    let subject = TrackableObject.create();

    const analytics = { trackPage() {} };
    const spy = sandbox.spy(analytics, 'trackPage');

    set(subject, 'analytics', analytics);
    subject.trackPageView();

    assert.ok(spy.calledOnce);
  });
});
