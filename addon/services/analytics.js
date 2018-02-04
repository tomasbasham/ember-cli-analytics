import Service from '@ember/service';

import Adaptable from 'ember-cli-adapter-pattern/mixins/adaptable';
import proxyToAdapter from 'ember-cli-adapter-pattern/utils/proxy-to-adapter';

import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { getWithDefault, set } from '@ember/object';
import { on } from '@ember/object/evented';
import { dasherize } from '@ember/string';

export default Service.extend(Adaptable, {

  /*
   * Send the current page URL to
   * the analytics engine.
   *
   * @method trackPage
   */
  trackPage: proxyToAdapter('trackPage'),

  /*
   * Send an arbitrary event to the
   * anlytics engine.
   *
   * @method trackEvent
   */
  trackEvent: proxyToAdapter('trackEvent'),

  /*
   * Send a conversion completion
   * event to the analytics engine.
   *
   * @method trackConversion
   */
  trackConversion: proxyToAdapter('trackConversion'),

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
  identify: proxyToAdapter('identify'),

  /*
   * For those platforms that support
   * it, map an anonymous user id to a
   * registered user. This is useful
   * when you wish to associate events
   * made before the user registerd
   * with a newly created user account.
   *
   * @method identify
   */
  alias: proxyToAdapter('alias'),

  /*
   * Fetch the adapter configuation and
   * ensure that we have a clean cache
   * of adapters.
   *
   * Further to this we register our
   * adapter classes with the option
   * to not instatiate them immediately.
   *
   * @method createAdapters
   * @on init
   */
  createAdapters: on('init', function() {
    const adapters = getWithDefault(this, 'config.analytics.integrations', A());
    const owner = getOwner(this);

    // Integrations should not be instantiated.
    owner.registerOptionsForType('ember-cli-analytics@integration', { instantiate: false });
    owner.registerOptionsForType('integration', { instantiate: false });

    set(this, '_adapters', {});
    set(this, 'context', {});

    this.activateAdapters(adapters);
  }),

  /*
   * Lookup adapters from the application
   * container.
   *
   * @method lookupAdapter
   *
   * @param {String} adapterName
   *   Name of the adapter.
   *
   * @return {Object}
   *   Uninstantiated adapter object.
   */
  _lookupAdapter(adapterName) {
    assert('Could not find integration without a name', adapterName);

    const owner = getOwner(this);
    const dasherizedAdapterName = dasherize(adapterName);
    const localAdapter = owner.lookup(`ember-cli-analytics@integration:${dasherizedAdapterName}`);
    const adapter = owner.lookup(`integration:${dasherizedAdapterName}`);

    return adapter ? adapter : localAdapter;
  }
});
