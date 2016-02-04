import Ember from 'ember';

const {
  assert,
  get,
  inject,
  on
} = Ember;

export default Ember.Mixin.create({

  /*
   * Inject the analytics service
   * so we may make use of multiple
   * analytics integrations.
   */
  analytics: inject.service(),

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
