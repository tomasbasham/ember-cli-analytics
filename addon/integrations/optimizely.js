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
   *
   * @param {Object} options
   *   Options to send the analytics engine.
   */
  trackPage(options = {}) {
    const { experiment } = options;

    if (canUseDOM) {
      if (isPresent(experiment)) {
        window.optimizely.push(['activate', experiment]);
      } else {
        window.optimizely.push(['activate']);
      }
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
         window.optimizely.push(['trackEvent', event, properties]);
       } else {
         window.optimizely.push(['trackEvent', event]);
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
    const { id } = config;

    assert('You must pass a valid `id` to the Optimizely adapter', id);

    if (canUseDOM && !window.optimizely) {
      /* eslint-disable */
      (function(i,s,o,g,r,a,m){
        i['OptimizrlyObject']=r;i[r]=i[r]||[];a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=0;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script',`//cdn.optimizely.com/js/${id}.js`,'optimizely');
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
      $(`script[src*="optimizely"]`).remove();
      delete window.ga;
    }
  })
});
