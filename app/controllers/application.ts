import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import UserService from 'front/services/user';

export default class Application extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  @service declare user : UserService;
 
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}
