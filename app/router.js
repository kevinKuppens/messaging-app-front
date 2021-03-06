import EmberRouter from '@ember/routing/router';
import config from 'front/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('/', function () {
    this.route('register');
  });
  // eslint-disable-next-line ember/no-shadow-route-definition
  this.route('register');
  this.route('login');
  this.route('success');
  this.route('dashboard');
});
