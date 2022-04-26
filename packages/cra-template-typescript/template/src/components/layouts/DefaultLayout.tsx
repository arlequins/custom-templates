import { useEffect } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import AuthStatus from '@app/components/templates/AuthStatus';
import { useAuth } from '@app/contexts/Auth';
import { LoginStatus } from '@typings/app/index.types';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const loginStatus = auth.check();
    if (loginStatus === LoginStatus.EXPIRES) {
      alert('expires! force logout!');
      navigate('/', { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default DefaultLayout;
