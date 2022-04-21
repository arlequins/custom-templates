import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@app/layouts/DefaultLayout';
import LoginPage from '@app/pages/auth/LoginPage';
import ProtectedPage from '@app/pages/auth/ProtectedPage';
import PublicPage from '@app/pages/auth/PublicPage';
import RequireAuth from '@app/pages/auth/RequireAuth';

const BrowserRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default BrowserRoutes;
