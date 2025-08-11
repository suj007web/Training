import RegisterForm from '../components/register-form';
import { registerAction } from './actions';

export default function RegisterPage() {
  return <RegisterForm registerAction={registerAction} />;
}
