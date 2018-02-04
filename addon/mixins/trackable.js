import Mixin from '@ember/object/mixin';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject } from '@ember/service';

export default Mixin.create({

  /*
   * Inject the analytics service
   * so we may make use of multiple
   * analytics integrations.
   */
  analytics: inject(),

  /*
   * Push the page transition to all
   * analytics adapters.
   *
   * @method trackPageView
   * @on didTransition
   */
  trackPageView: on('didTransition', function() {
    const analytics = get(this, 'analytics');

    assert('Could not find the analytics service.', analytics);
    analytics.trackPage({ page: get(this, 'url'), title: get(this, 'url') });
  })
});
