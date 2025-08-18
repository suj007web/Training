import LoginForm from '@/src/components/user/login-form';
import { loginAction } from './action';


export default function LoginPage() {
  return <LoginForm loginAction={loginAction} />;
}
