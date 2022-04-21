import { useLocation, useNavigate } from 'react-router-dom';

import { postUserInfo } from '@app/api/v1/auth';
import { useAuth } from '@app/contexts/Auth';
import { LoginStatus } from '@typings/arlequin';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = location.state as any;
  const from = state?.from?.pathname || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const info = await postUserInfo({
      username,
      password,
      grantType: 'password',
    });
    console.log('1', info);

    const loginStatus = await auth.signin({
      username,
      password,
      grantType: 'password',
    });

    if (loginStatus === LoginStatus.LOGIN) {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
