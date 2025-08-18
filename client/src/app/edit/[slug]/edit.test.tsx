import { fireEvent, render, screen } from "@testing-library/react";

import EditProfileForm from "@/src/components/user/edit-form";
import { User } from "@/src/interfaces/interfaces";


jest.mock('../../components/utils/TogglePasswordFields', () => {
  return function MockTogglePasswordFields(props: any) {
  const showConfirm = props?.showConfirmPassword ?? true;
    return (
      <>
        <input
          name={props.passwordName || 'password'}
          aria-label={props.passwordLabel || 'Password'}
          type="password"
        />
    {showConfirm && (
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


describe('Edit Password Form', ()=>{
  it('renders email and password fields', () => {
        const spy = jest.fn(async () => {});
    const mockUser: User = { _id: '1', username: 'sujal', email: 'sujal@example.com', password: '', role: 'user' };
    render(<EditProfileForm handleDelete={spy} handleSave={spy} userId="sujal" user={mockUser} />);
        const email = screen.getByLabelText(/new email address/i);
        const password = screen.getByLabelText(/^password$/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

    const deleteAccount = screen.getByRole('button', { name: /delete account/i });
    const reset = screen.getByRole('button', { name: /reset form/i });
    const submit = screen.getByRole('button', { name: /save changes/i });
        fireEvent.change(email, { target: { value: 'sujal@gmail.com' } });
        fireEvent.change(password, { target: { value: 'secret' } });
        fireEvent.change(confirmPassword, { target: { value: 'secret' } });

        expect((email as HTMLInputElement).value).toBe('sujal@gmail.com');
        expect((password as HTMLInputElement).value).toBe('secret');
        expect((confirmPassword as HTMLInputElement).value).toBe('secret');
        expect(submit).not.toBeNull();
        expect(reset).not.toBeNull();
        expect(deleteAccount).not.toBeNull();
    })
})
