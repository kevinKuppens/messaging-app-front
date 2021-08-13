import Service from '@ember/service';

interface RegisterForm {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
export default class RegisterService extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
  errors = {
    firstName: {
      active: false,
      message: 'fn'
    }
    ,
    lastName: {
      active: false,
      message: 'ln'
    }
    ,
    email: {
      active: false,
      message: 'em'
    }
    ,
    password: {
      active: false,
      message: 'pw'
    }
  };
  setErrors(response: Array<Object>) {
    response.forEach((error: any) => {
      if (Object.keys(this.errors).includes(error.param) === true) {
        this.set(`errors.${error.param}.active`, true);
        this.set(`errors.${error.param}.message`, error.msg);
      } else {
        console.log(error.param)
        this.set(`errors.${error.param}.active`, false);
        this.set(`errors.${error.param}.message`, '');
      }
    })
  }
  resetErrors() {
    Object.keys(this.errors).forEach((key: any) => this.set(`errors.${key}.active`, false));
  }
  async register(data: RegisterForm) {
    try {

      this.resetErrors();
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      const rawResponse = await fetch("http://localhost:3000/api/v1/users", fetchOptions)
      const response = await rawResponse.json();
      console.log(rawResponse);
      if (rawResponse.status !== 200) {
        if (response.errors) {
          this.setErrors(response.errors)
        }
      } else {
        // REDIRECT HERE
      }
    } catch (e) {
      console.log(e)
    }

  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'register': RegisterService;
  }
}
