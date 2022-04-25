import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@app/components/layouts/DefaultLayout';
import PublicPage from '@app/pages';
import LoginPage from '@app/pages/login';
import ProtectedPage from '@app/pages/protected';
import AnonymousAuth from '@app/routes/AnonymousAuth';
import RequireAuth from '@app/routes/RequireAuth';

interface WrapAuthProps {
  component: JSX.Element;
}

type WrapAnonymousAuthProps = WrapAuthProps;
type WrapRequireAuthProps = WrapAuthProps;

const WrapAnonymousAuth = ({ component }: WrapAnonymousAuthProps) => {
  return <AnonymousAuth>{component}</AnonymousAuth>;
};

const WrapRequireAuth = ({ component }: WrapRequireAuthProps) => {
  return <RequireAuth>{component}</RequireAuth>;
};

const BrowserRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<WrapAnonymousAuth component={<LoginPage />} />}></Route>
        <Route path="/protected" element={<WrapRequireAuth component={<ProtectedPage />} />}></Route>
      </Route>
    </Routes>
  );
};

export default BrowserRoutes;
