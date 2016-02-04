import Ember from 'ember';
import TrackableMixin from '../../../mixins/trackable';
import { module, test } from 'qunit';
import Sinon from 'sinon';

const {
  set
} = Ember;

let sandbox;

module('Unit | Mixin | trackable', {
  beforeEach: function() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach: function() {
    sandbox.restore();
  }
});

test('#trackPage is called on didTransition', function(assert) {
  let TrackableObject = Ember.Object.extend(TrackableMixin);
  let subject = TrackableObject.create();

  const analytics = { trackPage: Ember.K };
  const spy = sandbox.spy(analytics, 'trackPage');

  set(subject, 'analytics', analytics);
  subject.trackPageView();

  assert.ok(spy.calledOnce);
});
