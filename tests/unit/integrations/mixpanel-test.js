import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox, config;

moduleFor('integration:mixpanel', 'Unit | Integration | mixpanel', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it can be configured with a token', function(assert) {
  let integration = this.subject({ config });
  assert.ok(integration);
});

test('#trackPage calls mixpanel with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.mixpanel, 'track', function() {
    return true;
  });

  integration.trackPage({ url: '/', title: '/' });
  assert.ok(stub.calledWith('pageView', { url: '/', title: '/' }));
});

test('#trackEvent calls mixpanel with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.mixpanel, 'track', function() {
    return true;
  });

  integration.trackEvent({ category: 'Starships', event: 'Warp', label: 'Enterprise' });
  assert.ok(stub.calledWith('Warp', { category: 'Starships', label: 'Enterprise' }));
});

test('#trackConversion calls mixpanel with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.mixpanel.people, 'track_charge', function() {
    return true;
  });

  integration.trackConversion({ value: '42' });
  assert.ok(stub.calledWith('42'));
});

test('#identify calls mixpanel with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.mixpanel, 'identify', function() {
    return true;
  });

  integration.identify({ id: '001' });
  assert.ok(stub.calledWith('001'));
});

test('#alias calls mixpanel with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.mixpanel, 'alias', function() {
    return true;
  });

  integration.alias({ alias: 'Borg', original: '001' });
  assert.ok(stub.calledWith('Borg', '001'));
});
