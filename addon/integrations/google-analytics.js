import $ from 'jquery';

import Base from 'ember-cli-analytics/integrations/base';
import canUseDOM from 'ember-cli-analytics/utils/can-use-dom';
import without from 'ember-cli-analytics/utils/without';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { assign } from '@ember/polyfills';
import { capitalize } from '@ember/string';
import { isPresent } from '@ember/utils';

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
    const sendEvent = { hitType: 'pageview' };
    const event = assign({}, sendEvent, options);

    if (canUseDOM) {
      window.ga('send', event);
    }
  },

  /*
   * Send an arbitrary event to the
   * analytics engine.
   *
   * @method trackEvent
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  trackEvent(options = {}) {
    const sendEvent = { hitType: 'event' };
    const gaEvent = {};

    if (options.nonInteraction) {
      gaEvent.nonInteraction = options.nonInteraction;
      delete options.nonInteraction;
    }

    for (let key in options) {
      const value = options[key];

      // If key is not a 'dimension' or 'metric', prepend with 'event'
      const shouldPrefix = !/^(dimension|metric)[0-9]{1,2}/.test(key);
      if (shouldPrefix) {
        key = `event${capitalize(key)}`;
      }

      gaEvent[key] = value;
    }

    const event = assign({}, sendEvent, gaEvent);

    if(canUseDOM) {
      window.ga('send', event);
    }
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
    const { id } = options;

    assert('You must pass a distinct id', id);

    if (canUseDOM) {
      window.ga('set', 'userId', id);
    }
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
    const config = get(this, 'config');
    const { id, remarketing, ecommerce, enhancedEcommerce, set } = assign({}, config);
    const properties = without(config, 'id', 'remarketing', 'ecommerce', 'enhancedEcommerce', 'set');

    assert('You must pass a valid `id` to the GoogleAnaltics adapter', id);

    if (!canUseDOM) {
      return;
    }

    if (!window.ga) {
      /* eslint-disable */
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      /* eslint-enable */
    }

    if (isPresent(Object.keys(properties))) {
      window.ga('create', id, properties);
    } else {
      window.ga('create', id, 'auto');
    }

    if (remarketing) {
      window.ga('require', 'displayfeatures');
    }

    if (ecommerce) {
      window.ga('require', 'ecommerce');
    }

    if (enhancedEcommerce) {
      window.ga('require', 'ecommerce');
    }

    if (set) {
      for (const attr of Object.keys(set)) {
        window.ga('set', attr, set[attr]);
      }
    }
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
    if (canUseDOM) {
      $('script[src*="google-analytics"]').remove();
      delete window.ga;
    }
  })
});
