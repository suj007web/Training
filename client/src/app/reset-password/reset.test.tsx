import { fireEvent, render, screen } from "@testing-library/react";

import ResetPasswordForm from '@/src/components/user/reset-form';

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


describe('Reset Password Form', ()=>{
    it('renders password fields', () => {
        const spy = jest.fn(async () => {});
        render(<ResetPasswordForm resetAction={spy} token="hello1234"/>);
        const password = screen.getByLabelText(/^password$/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

        const reset = screen.getByRole('button', { name: /reset/i });
        const submit = screen.getByRole('button', { name: /submit/i });
        fireEvent.change(password, { target: { value: 'secret' } });
        fireEvent.change(confirmPassword, { target: { value: 'secret' } });

        expect((password as HTMLInputElement).value).toBe('secret');
        expect((confirmPassword as HTMLInputElement).value).toBe('secret');
        expect(submit).not.toBeNull();
        expect(reset).not.toBeNull();
    })
})
