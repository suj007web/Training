import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "../components/user/register-form";

jest.mock('../components/utils/TogglePasswordFields', () => {
  return function MockTogglePasswordFields(props: any) {
    return (
      <>
        <input
          name={props.passwordName || 'password'}
          aria-label={props.passwordLabel || 'Password'}
          type="password"
        />
        {props.showConfirmPassword && (
          <input
            name={props.confirmPasswordName || 'confirmPassword'}
            aria-label={props.confirmPasswordLabel || 'Confirm Password'}
            type="password"
          />
        )}
      </>
    );
  };
});


describe('Register Form', ()=>{
    it('renders username and password fields', () => {
        const spy = jest.fn(async () => {});
        render(<RegisterForm registerAction={spy} />);
        const username = screen.getByLabelText(/username/i);
        const email = screen.getByLabelText(/email address/i);
  const password = screen.getByLabelText(/^password$/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

  const submit = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(username, { target: { value: 'sujal' } });
        fireEvent.change(email, { target: { value: 'sujal@gmail.com'} });
        fireEvent.change(password, { target: { value: 'secret' } });
        fireEvent.change(confirmPassword, { target: { value: 'secret' } });

        expect((username as HTMLInputElement).value).toBe('sujal');
        expect((email as HTMLInputElement).value).toBe('sujal@gmail.com');
        expect((password as HTMLInputElement).value).toBe('secret');
        expect((confirmPassword as HTMLInputElement).value).toBe('secret');
        expect(submit).not.toBeNull();
    })
})