// Types for compiled templates
declare module 'front/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
interface RegisterForm {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
interface LoginForm{
  email:string,
  password:string,
}

interface User {
  id: number,
  creationDate : Date,
  updateDate : Date,
  deletionDate : Date,
  firstName : string,
  lastName : string,
  email : string,
  friendRequest : FriendRequest[],
  friendsList : User[],
  conversations : Conversations[],
  // messages : Messages[],
}

interface FriendRequest{
  id: number,
  creationDate : Date,
  updateDate : Date,
  deletionDate : Date,
  fromUserId: number,
  toUserId : number,
}

interface Conversations{
  id: number,
  creationDate : Date,
  updateDate : Date,
  deletionDate : Date,
  messages: Messages[],
}

interface Messages{
  id: number,
  creationDate : Date,
  updateDate : Date,
  deletionDate : Date,
  authot : User,
  content : string,
  conversation: Conversations
}