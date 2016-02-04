import Ember from 'ember';
import config from './config/environment';
import Trackable from 'ember-cli-analytics/mixins/trackable';

const Router = Ember.Router.extend(Trackable, {
  location: config.locationType
});

Router.map(function() {
  this.route('index');
});

export default Router;
