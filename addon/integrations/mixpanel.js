import $ from 'jquery';

import Base from 'ember-cli-analytics/integrations/base';
import canUseDOM from 'ember-cli-analytics/utils/can-use-dom';
import without from 'ember-cli-analytics/utils/without';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { copy } from '@ember/object/internals';
import { merge } from '@ember/polyfills';
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
    const sendEvent = { event: 'pageView' };
    const event = merge(sendEvent, options);
    this.trackEvent(event);
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
        window.mixpanel.track(event, properties);
      } else {
        window.mixpanel.track(event);
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
    const { value } = options;
    const properties = without(options, 'value');

    assert('You must pass a value', value);

    if (canUseDOM) {
      if (isPresent(Object.keys(properties))) {
        window.mixpanel.people.track_charge(value, properties);
      } else {
        window.mixpanel.people.track_charge(value);
      }
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
    const properties = without(options, 'id');

    assert('You must pass a distinct id', id);

    if (canUseDOM) {
      if (isPresent(Object.keys(properties))) {
        window.mixpanel.identify(id, properties);
      } else {
        window.mixpanel.identify(id);
      }
    }
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
    const { alias, original } = options;

    assert('You must pass an alias', alias);

    if (canUseDOM) {
      if (isPresent(original)) {
        window.mixpanel.alias(alias, original);
      } else {
        window.mixpanel.alias(alias);
      }
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
    const config = copy(get(this, 'config'));
    const { token } = config;

    assert('You must pass a valid `token` to the Mixpanel adapter', token);

    if (canUseDOM && !window.mixpanel) {
      /* eslint-disable */
      const regex = /^\/\//;
      (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
      for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement('script');a.type='text/javascript';a.async=!0;a.src='undefined'!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:'file:'===e.location.protocol&&'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(regex)?'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js':'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';f=e.getElementsByTagName('script')[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
      mixpanel.init(token);
      /* eslint-enable */
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
      $('script[src*="mxpnl"]').remove();
      delete window.mixpanel;
    }
  })
});
