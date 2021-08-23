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