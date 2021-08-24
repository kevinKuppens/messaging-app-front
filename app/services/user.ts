import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Router from 'front/router';
import { tracked } from '@glimmer/tracking'


export default class UserService extends Service.extend({
  // anything which *must* be merged to prototype here
}) {

  @service declare router: Router;

  // normal class body definition here
  @tracked currentUser:User | null = null;
  @tracked foundUsers = [];
  @tracked friendRequestUsers = [];

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

  @tracked friendRequestLength:number | undefined = this.currentUser?.friendRequest.length;
 
  get currentUserId(){
    return parseInt(localStorage.getItem('userId') as string);
  }
  get userToken(){
    return localStorage.getItem('token');
  }
  get isAuthenticated(){
    return this.userToken;
  }
  
  async getAllUsers(){
    const fetchoptions = {
      method : 'GET',
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json",
        'Authorization' : `Bearer ${this.userToken}`
      }
    };
    const rawResponse = await fetch('http://localhost:3000/api/v1/admin/users', fetchoptions);
    return await rawResponse.json();
  }
  async findUser(input:string){       
    const data = await this.getAllUsers()
    this.set('foundUsers',data.filter((user:any) => 
    {    
        user.friendRequest.forEach((req:any) => req.fromUserId == this.currentUserId ? this.set(`requestSent${user.id}`, true) : "");
      if(this.currentUserId != null){  
          return user.id !== this.currentUserId && ( user.firstName.toLowerCase().includes(input.toLowerCase()) 
          || user.lastName.toLowerCase().includes(input.toLowerCase()))} 
        }
    ));
    if(input === ""){
      this.set('foundUsers', null);
    }
  }
  async getRequestUsers(){
    const usersRequestId:any[] = [];
    const usersResquest:User[]= [];
    if(this.currentUser){
      this.currentUser?.friendRequest.map(request => usersRequestId.push({fromUserId : request.fromUserId, requestId : request.id}) );
    }
    const fetchOptions = {
      method : 'GET',
      headers: {
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${this.userToken}`
      },
    }
    await usersRequestId.forEach(async (request:any )=> {
      const rawResponse = await fetch(`http://localhost:3000/api/v1/users/${request.fromUserId}`,fetchOptions)  
      const response = await rawResponse.json();
      usersResquest.push({ ...response, requestId : request.requestId});
      this.set('friendRequestUsers', usersResquest);
    })
  }
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

  async authenticate(data:LoginForm){
    this.resetErrors();
      const fetchOptions = {
        method : 'POST',
        headers : {
          Acccept : 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      }
      const rawResponse = await fetch("http://localhost:3000/api/v1/login", fetchOptions);
      if(rawResponse.ok){
        const response = await rawResponse.json();
        const userId = JSON.parse(atob(response.split('.')[1])).data.id;
        localStorage.setItem('token', response)
        localStorage.setItem('userId', userId)
        
        this.router.transitionTo('dashboard');
      }else{
        const response = await rawResponse.json();
        if(rawResponse.status==404){
          this.set('errors.email.active', true);
          this.set('errors.email.message', response.message);
        }else{
          this.set('errors.password.active', true);
          this.set('errors.password.message', response.message);
        }
      }
  }

  logout = ()=> {
    localStorage.clear();
    this.set("currentUser", null);
    this.router.transitionTo('/')
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
      if (rawResponse.status !== 200) {
        if (response.errors) {
          this.setErrors(response.errors)
        }
      } else {
        // REDIRECT HERE
        this.router.transitionTo('success');
      }
    } catch (e) {
      console.log(e)
    }

  }

  async loadCurrentUser(){
    const { currentUserId } = this;
    const fetchOptions = {
      method : 'GET',
      headers: {
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${this.userToken}`
      },
    }
    const rawResponse = await fetch(`http://localhost:3000/api/v1/users/${currentUserId}`,fetchOptions)  
    this.set('currentUser', await rawResponse.json());
  }

  async sendFriendRequest(userId:number){
    const data = {
      fromUserId : this.currentUserId,
    }
    console.log(data);
    const fetchOptions={
      method : 'POST',
      headers : {
        Accept : 'application/json',
        "Content-Type" : "application/json",
        "Authorizations" : `Bearer ${this.userToken}`
      },
      body : JSON.stringify(data)
    }
    const rawResponse = await fetch(`http://localhost:3000/api/v1/addFriend/${userId}`, fetchOptions);
    const response = await rawResponse.json();
    console.log(response);
  }
  async treatFriendRequest(requestId:number, method:string){
    const fetchOptions={
      method,
      headers : {
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        'Authorizations': `Bearer ${this.userToken}`,
      },
    };
    const rawResponse = await fetch(`http://localhost:3000/api/v1/request/${requestId}`, fetchOptions);
    await rawResponse.json();
    const request= this.friendRequestUsers.find((req:any) => req.requestId === requestId);
  
    if(request){
      this.friendRequestUsers.splice(this.friendRequestUsers.indexOf(request), 1);
    }
    this.set('friendRequestUsers', this.friendRequestUsers)
    this.set('friendRequestLength', this.friendRequestUsers.length)

    // await this.getRequestUsers();
  }
}
// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'register': UserService;
  }
}
