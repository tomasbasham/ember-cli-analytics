import $ from 'jquery';

import Base from 'ember-cli-analytics/integrations/base';
import canUseDOM from 'ember-cli-analytics/utils/can-use-dom';
import without from 'ember-cli-analytics/utils/without';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { copy } from '@ember/object/internals';
import { isPresent } from '@ember/utils';

export default Base.extend({

  /*
   * Send the current page URL to
   * the analytics engine.
   *
   * @method trackPage
   */
  trackPage() {
    if (canUseDOM) {
      window.fbq('track', 'PageView');
    }
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
    const { event } = options;
    const properties = without(options, 'event');

    assert('You must pass an event name', event);

    if (canUseDOM) {
      if (isPresent(Object.keys(properties))) {
        window.fbq('track', event, properties);
      } else {
        window.fbq('track', event);
      }
    }
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
    this.trackEvent(options);
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
    const config = copy(get(this, 'config'));
    const { id } = config;

    assert('You must pass a valid `id` to the Bing adapter', id);

    if (!canUseDOM) return

    if (!window.fbq) {
      /* eslint-disable */
      (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
        n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
        t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window,document,'script','//connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    }

    window.fbq('init', id);
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
      $('script[src*="facebook"]').remove();
      delete window.fbq;
    }
  })
});
