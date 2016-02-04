import Ember from 'ember';

export default Ember.Object.extend({

  /*
   * Send the current page URL to
   * the analytics engine.
   *
   * @method trackPage
   */
  trackPage: Ember.K,

  /*
   * Send an arbitrary event to the
   * anlytics engine.
   *
   * @method trackEvent
   */
  trackEvent: Ember.K,

  /*
   * Send a conversion completion
   * event to the analytics engine.
   *
   * @method trackConversion
   */
  trackConversion: Ember.K,

  /*
   * Identify an anonymous user with a
   * unique ID. This is useful when a
   * user returns to the application
   * an we wish to further track them.
   *
   * This should not be called in
   * conjunction with alias.
   *
   * @method identity
   */
  identify: Ember.K,

  /*
   * For those platforms that support
   * it, map an anonymous user id to a
   * registered user. This is useful
   * when you wish to associate events
   * made before the user registerd
   * with a newly created user account.
   *
   * @method alias
   */
  alias: Ember.K
});
