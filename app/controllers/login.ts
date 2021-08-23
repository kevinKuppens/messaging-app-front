import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import UserService from 'front/services/user';


export default class Login extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  @service declare user:UserService;


  @action
  launch(event:Event){
    event.preventDefault();

    const dataToSend:LoginForm = {
      email : (document.getElementById('email') as HTMLInputElement).value,
      password : (document.getElementById('password') as HTMLInputElement).value,
    };
    this.user.authenticate(dataToSend);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'login': Login;
  }
}
