import RegisterForm from '../components/user/register-form';
import { registerAction } from './actions';

export default function RegisterPage() {
  return <RegisterForm registerAction={registerAction} />;
}
