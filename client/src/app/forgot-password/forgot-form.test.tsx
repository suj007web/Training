import { fireEvent, render, screen } from "@testing-library/react";
import ForgotForm from "@/src/components/user/forgot-password";

describe('Forgot Password Form', () => {
    it('renders email field', () => {
        const spy = jest.fn(async () => {});
        render(<ForgotForm forgotAction={spy} />);
        
    const email = screen.getByLabelText(/email/i);
    const submit = screen.getByRole('button', { name: /continue/i });
    
        fireEvent.change(email, { target: { value: 'sujal@gmail.com' } });
        expect((email as HTMLInputElement).value).toBe('sujal@gmail.com');
        expect(submit).not.toBeNull();
    });
});
