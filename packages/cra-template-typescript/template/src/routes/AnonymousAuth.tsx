import { Navigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/Auth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (auth.user) {
    // Redirect if auth to root page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
