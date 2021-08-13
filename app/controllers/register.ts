import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RegisterService from 'front/services/register';

export default class Register extends Controller.extend({
  // anything which *must* be merged to prototype here 

}) {
  // normal class body definition here
  @service declare register: RegisterService;

  @action
  launch(event: Event) {
    event.preventDefault()
    // const formData = new FormData(document.querySelector('form') as HTMLFormElement);

    const data = {
      firstName: (document.getElementById('firstname') as HTMLInputElement).value,
      lastName: (document.getElementById('lastname') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };
    this.register.register(data)
  }

}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'register': Register;
  }
}
