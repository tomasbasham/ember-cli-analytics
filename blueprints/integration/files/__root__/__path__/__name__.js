import Ember from 'ember';
import Base from 'ember-cli-analytics/integrations/base';

const {
  on
} = Ember;

export default Base.extend({

  /*
   * Send the current page URL to
   * the analytics engine.
   *
   * @method trackPage
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  trackPage(options = {}) {

  },

  /*
   * Send an arbitrary event to the
   * anlytics engine.
   *
   * @method trackEvent
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  trackEvent(options = {}) {

  },

  /*
   * Send a conversion completion
   * event to the analytics engine.
   *
   * @method trackConversion
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  trackConversion(options = {}) {

  },

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
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  identify(options = {}) {

  },

  /*
   * For those platforms that support
   * it, map an anonymous user id to a
   * registered user. This is useful
   * when you wish to associate events
   * made before the user registerd
   * with a newly created user account.
   *
   * @method alias
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  alias(options = {}) {

  },

  /*
   * Insert the JavaScript tag into the
   * page, and perform any necessary
   * setup.
   *
   * @method insertTag
   * @on init
   */
  insertTag: on('init', function() {

  }),

  /*
   * Remove the JavaScript tag from the
   * page, and perform any necessary
   * teardown.
   *
   * @method removeTag
   * @on willDestroy
   */
  removeTag: on('willDestroy', function() {

  })
});
