import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/user/login-form';

jest.mock('../components/utils/TogglePasswordFields', () => {
  return function MockTogglePasswordFields(props: any) {
    return (
      <input
        name={props.passwordName || 'password'}
        aria-label={props.passwordLabel || 'Password'}
        type="password"
      />
    );
  };
});

describe('LoginForm', () => {
  it('renders username and password fields', () => {
    const spy = jest.fn(async () => {});
    render(<LoginForm loginAction={spy} />);


    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /continue/i });


    fireEvent.change(username, { target: { value: 'sujal' } });
    fireEvent.change(password, { target: { value: 'secret' } });

  expect((username as HTMLInputElement).value).toBe('sujal');
  expect((password as HTMLInputElement).value).toBe('secret');
  expect(submit).not.toBeNull();
  });
});

// Tests for server action logic

// const setMock = jest.fn();
// const getMock = jest.fn();
// jest.mock('next/headers', () => ({
//   cookies: jest.fn(() => Promise.resolve({ set: setMock, get: getMock })),
// }));


// jest.mock('@/fetch', () => ({
//   _fetch: jest.fn(),
// }));



// describe('loginAction', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   function makeFormData(username: string, password: string) {
//     const fd = new FormData();
//     fd.set('username', username);
//     fd.set('password', password);
//     return fd;
//   }

//   it('sets cookies and redirects on success', async () => {
//   const fetchMock: any = _fetch as any;
//   fetchMock.mockResolvedValueOnce({
//       data: { accessToken: 'token123' },
//       error: undefined,
//     });
//   fetchMock.mockResolvedValueOnce({
//       data: { id: 1, name: 'theme2', userId: 'u1' },
//       error: undefined,
//     });

//   setMock.mockReset();
//   getMock.mockReset();
//   getMock.mockReturnValue({ value: 'token123' });

//   const fd = makeFormData('john', 'secret');
//   const { loginAction } = await import('./action');
//   await loginAction(fd);


//   expect(setMock).toHaveBeenCalledWith('token', 'token123', expect.any(Object));
//   expect(setMock).toHaveBeenCalledWith(
//       'selectedTheme',
//       'theme2',
//       expect.objectContaining({ httpOnly: true })
//     );

//     expect(redirect).toHaveBeenCalledWith('/?success=Logged+in+successfully');
//   });

//   it('redirects to /login with error on failure', async () => {
//   const fetchMock: any = _fetch as any;
//   fetchMock.mockResolvedValueOnce({
//       data: null,
//       error: 'Bad credentials',
//     });

//   setMock.mockReset();
//   getMock.mockReset();

//   const fd = makeFormData('john', 'wrong');
//   const { loginAction } = await import('./action');
//   await loginAction(fd);

//     expect(redirect).toHaveBeenCalledWith(
//       expect.stringMatching(/^\/login\?error=/)
//     );

//   expect(fetchMock).toHaveBeenCalledTimes(1);
//   });
// });
