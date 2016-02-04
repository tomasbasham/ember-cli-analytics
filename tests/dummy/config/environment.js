/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

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
            enhancedEcommerce: false
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
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
