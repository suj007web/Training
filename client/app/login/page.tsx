
import LoginForm from '../components/login-form';
import { loginAction } from './action';


export default function LoginPage() {
  return <LoginForm loginAction={loginAction} />;
}
