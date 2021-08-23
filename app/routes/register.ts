import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import UserService from 'front/services/user';
export default class Register extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service declare user: UserService;
  // normal class body definition here
  model() {
    return this.user.errors;
  }
}
