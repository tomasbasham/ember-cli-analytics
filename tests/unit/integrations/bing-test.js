import { moduleFor, test } from 'ember-qunit';
import Sinon from 'sinon';

let sandbox, config;

moduleFor('integration:bing', 'Unit | Integration | bing', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
    config = {
      id: 'XXXXXXX'
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

test('#trackPage calls uetq with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.uetq, 'push', function() {
    return true;
  });

  integration.trackPage();
  assert.ok(stub.calledWith('pageLoad'));
});

test('#trackConversion calls uetq with the correct arguments', function(assert) {
  let integration = this.subject({ config });

  const stub = sandbox.stub(window.uetq, 'push', function() {
    return true;
  });

  integration.trackConversion({ value: '42' });
  assert.ok(stub.calledWith({ ec: 'purchase', gv: '42' }));
});
