import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RegisterService from 'front/services/register';
export default class Register extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service declare register: RegisterService;
  // normal class body definition here
  model() {

    return this.register.errors;
  }
}
