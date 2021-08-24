import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import UserService from 'front/services/user';
export default class Dashboard extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  @service declare user : UserService;

  async beforeModel(transition:Transition) {
    await super.beforeModel(transition);
    if (!this.user.isAuthenticated) {
      this.transitionTo('login');
    } else {
      await this.user.loadCurrentUser();
    }
  }

  model(){
    return this.user;
  }
}
