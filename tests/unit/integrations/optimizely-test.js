import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox, config;

moduleFor('integration:optimizely', 'Unit | Integration | optimizely', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXX'
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

test('#trackPage calls optimizely with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.optimizely, 'push', function() {
    return true;
  });

  integration.trackPage({
    experiment: 123
  });

  assert.ok(stub.calledWith(['activate', 123]));
});

test('#trackEvent calls optimizely with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.optimizely, 'push', function() {
    return true;
  });

  integration.trackEvent({
    event: 'The Battle of Sector 001'
  });

  assert.ok(stub.calledWith(['trackEvent', 'The Battle of Sector 001']));
});
