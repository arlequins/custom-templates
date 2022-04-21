import { useNavigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/Auth';

const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      Welcome {`${auth.user.username}! `}
      <button
        onClick={async () => {
          auth.signout();
          navigate('/');
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default AuthStatus;
