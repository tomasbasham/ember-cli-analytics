import Sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

let sandbox, config;

moduleFor('integration:facebook', 'Unit | Integration | facebook', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXXXXXXXXXXX'
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

test('#trackEvent calls fbq with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'fbq', function() {
    return true;
  });

  integration.trackEvent({ event: 'The Battle of Sector 001' });
  assert.ok(stub.calledWith('track', 'The Battle of Sector 001'));
});

test('#trackConversion calls fbq with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window, 'fbq', function() {
    return true;
  });

  integration.trackConversion({ event: 'The Battle of Sector 001' });
  assert.ok(stub.calledWith('track', 'The Battle of Sector 001'));
});
