# ember-cli-analytics [![Build Status](https://travis-ci.org/tomasbasham/ember-cli-analytics.svg?branch=master)](https://travis-ci.org/tomasbasham/ember-cli-analytics)

An [Ember CLI](https://ember-cli.com/) addon to interface with analytics
services and external integrations.

Being able to track what your users are doing provides valuable insights into
how your application is performing. However if you are trying to support
multiple analytics integrations it can quickly become unmanageable.

This addon provides a simple `analytics` service allowing your applications to
support multiple analytics integrations without having to clutter your code
base with tracking codes. This addon bundles a series of adapters requiring
that you only have to manage a single API.

This addon is built upon the
[ember-cli-adapter-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern)
allowing you to easily create your own analytics integration adapters.

## Installation

From within your Ember CLI project directory run:
```
ember install ember-cli-analytics
```

### Options for higher-security implementations

Some higher-security sites want to prohibit all script-based access to
third-party sites. If this is the case for your site, you might prefer to
download the analytics scripts to your `vendor` location first and then
incorporate them into your ember application via the build process. For example,
for google analytics, you would do the following:

```sh
  curl https://www.google-analytics.com/analytics.js > vendor/google-analytics.js
```

Then, to load the script as part of the build process, add a command to your
`ember-cli-build.js` file. For the Google Analytics example, you would do the
following:

```js
  app.import('vendor/google-analytics.js')
```

If you have loaded the scripts into your application via the build process,
`ember-cli-analytics` will _not_ attempt to download them when necessary.

## Usage

This addon implements a service to interface with several analytics integration
by providing an abstract API that hides the implementation details of each
analytics integration adapter.

### Configuration

Before the `analytics` service can be used it first must be configured through
`config/environment`. This allows you to define which of the integrations you
want to make available to your application through the `analytics` service.

##### Configuration Example

```JavaScript
// config/environment.js
module.exports = function(environment) {
  let ENV = {
    analytics: {
      integrations: [
        {
          name: 'Bing',
          config: {
            id: 'XXXXXXX'
          }
        },
        {
          name: 'Facebook',
          config: {
            id: 'XXXXXXXXXXXXXXXX'
          }
        },
        {
          name: 'GoogleAdwords',
          config: {
            id: 'XXXXXXXXXX',
            label: 'XXXXXXXXXXXXXXXXXXX'
          }
        },
        {
          name: 'GoogleAnalytics',
          config: {
            id: 'UA-XXXXXXXX-Y',
            remarketing: true,
            ecommerce: true,
            enhancedEcommerce: false,
            set: {
              anonymizeIp: true
            }
          }
        },
        {
          name: 'Mixpanel',
          config: {
            token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
          }
        },
        {
          name: 'Optimizely',
          config: {
            id: 'XXXXXXXXXX'
          }
        }
      ]
    }
  };

  return ENV;
};
```

This configures your application to use all 6 adapters bundled with this addon.

#### Integrations

The integrations array takes a series of objects defining the configuration of
each adapter. This is a requirement of
[ember-cli-adapter-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern)
where each object may take an additional series of key/value pairs. Alongside
the name of each adapter, in pascal case, this addon also requires a
configuration object typically defining the `id` or `token` required to
authenticate with the external service.

### Injection

This addon makes no assumptions about what ember objects you want to make the
`analytics` service available. Therefore in order to make the service available
you need to implement you own injections.

##### Injection Initializer Example

```JavaScript
// app/initializers/analytics.js
export function initialize(application) {
  application.inject('controller', 'analytics', 'service:analytics');
  application.inject('route', 'analytics', 'service:analytics');
};

export default { initialize };
```

This will make the `analytics` service available to all controllers and routes.
It is however unlikely that you will require the service to be injected into
every controller or route of your applications. Therefore it is recommended
that you include the service on a per object basis.

##### Injection Controller Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  analytics: inject()
});
```

This will create a dependency on the application controller and inject the
`analytics` service into this controller only. This can be repeated across all
objects that need access to the service.

### Analytics Service

The `analytics` service implements an abstract API that currently supports the
following methods:

* `trackPage`
* `trackEvent`
* `trackConversion`
* `identify`
* `alias`

When using this API, by default the service will call the corresponding method
on each of the adapters unless a specific adapter is specified. This means that
if you were to call `trackEvent` on the service, it would in turn call
`trackEvent` on each of the adapters that implement it.

##### All Adapters Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';

import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  analytics: inject(),

  actions: {
    playVideo() {
      const analytics = get(this, 'analytics');
      analytics.trackEvent({ action: 'videoPlayed' });
    }
  }
});
```

This is great behaviour if you have setup multiple analytics integrations in
`config/environment` and is a consequence of the
[ember-cli-adapter-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern).
However if you only want to send events to a single analytics integration you
must specify its name.

##### Single Adapter Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';

import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  analytics: inject(),

  actions: {
    playVideo() {
      const analytics = get(this, 'analytics');
      analytics.trackEvent('Mixpanel', { action: 'videoPlayed' });
    }
  }
});
```

This will only send the event to the `Mixpanel` adapter.

### Trackable Mixin

To track page views this addon provides a `trackable` mixin. This mixin should
be used to augment the ember router and will invoke the `trackPage` method on
each of the configured adapters.

##### Trackable Example

```JavaScript
// app/router.js
import EmberRouter from '@ember/routing/router';
import Trackable from 'ember-cli-analytics/mixins/trackable';
import config from './config/environment';

const Router = EmberRouter.extend(Trackable, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index');
});

export default Router;
```

## Development

### Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-analytics`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember
  versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit
[https://ember-cli.com/](https://ember-cli.com/).
