import $ from 'jquery';

import Base from 'ember-cli-analytics/integrations/base';
import canUseDOM from 'ember-cli-analytics/utils/can-use-dom';

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { copy } from '@ember/object/internals';

export default Base.extend({

  /*
   * Send the current page URL to
   * the analytics engine.
   *
   * @method trackPage
   */
  trackPage() {
    if (canUseDOM) {
      window.uetq.push('pageLoad');
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
    const sendEvent = { ec: 'purchase', gv: value };

    assert('You must pass a value', value);

    if (canUseDOM) {
      window.uetq.push(sendEvent);
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

    assert('You must pass a valid `id` to the Bing adapter', id);

    if (!canUseDOM) return

    if (!window.uetq) {
      /* eslint-disable */
      (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){
        var o={ti:id};o.q=w[u],w[u]=new UET(o),w[u].push('pageLoad')},
        n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){
          var s=this.readyState;s&&s!=='loaded'&&s!=='complete'||(f(),n.onload=n.onreadystatechange=null)
        },i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
      })(window,document,'script','//bat.bing.com/bat.js','uetq');
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
      $('script[src*="bing"]').remove();
      delete window.uetq;
    }
  })
});
