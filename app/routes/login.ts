import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import UserService from 'front/services/user';

export default class Login extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  @service declare user : UserService;

  model(){
    return this.user.errors;
  }

}
