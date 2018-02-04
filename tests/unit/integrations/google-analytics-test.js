import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox, config;

moduleFor('integration:google-analytics', 'Unit | Integration | google analytics', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'UA-XXXXXXXX-Y'
    };
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it can be configured with an id', function(assert) {
  let integration = this.subject({ config });
  assert.ok(integration);
});

test('#trackPage calls ga with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'ga').callsFake(function() {
    return true;
  });

  integration.trackPage({ url: '/', title: '/' });
  assert.ok(stub.calledWith('send', { hitType: 'pageview', url: '/', title: '/' }));
});

test('#trackEvent calls ga with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'ga').callsFake(function() {
    return true;
  });

  integration.trackEvent({ category: 'Starships', action: 'Warp', label: 'Enterprise' });

  assert.ok(stub.calledWith('send', {
    hitType: 'event',
    eventCategory: 'Starships',
    eventAction: 'Warp',
    eventLabel: 'Enterprise'
  }));
});

test('#trackEvent handles metrics and dimensions correctly', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'ga').callsFake(function() {
    return true;
  });

  integration.trackEvent({ category: 'Starships', action: 'Warp', dimension1: 'Enterprise', metric1: 'D' });

  assert.ok(stub.calledWith('send', {
    hitType: 'event',
    eventCategory: 'Starships',
    eventAction: 'Warp',
    dimension1: 'Enterprise',
    metric1: 'D'
  }));
});

test('#identify calls ga with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'ga').callsFake(function() {
    return true;
  });

  integration.identify({ id: '001' });
  assert.ok(stub.calledWith('set', 'userId', '001'));
});
