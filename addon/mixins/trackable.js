import Mixin from '@ember/object/mixin';

import { getOwner } from '@ember/application'
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
    let limitRouteInformation = false
    const owner = getOwner(this)
    if (owner) {
      const config = owner.resolveRegistration('config:environment')
      limitRouteInformation = get(config, 'analytics.options.limitRouteInformation')
    }
    const routeData = limitRouteInformation ? get(this, 'currentRouteName') : get(this, 'url')
    analytics.trackPage({ page: routeData, title: routeData });
  })
});
