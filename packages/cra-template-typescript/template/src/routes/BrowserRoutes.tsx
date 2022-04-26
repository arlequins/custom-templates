import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import LoadingLayout from '@app/components/layouts/LoadingLayout';
import AnonymousAuth from '@app/routes/AnonymousAuth';
import RequireAuth from '@app/routes/RequireAuth';
import routes from '@app/routes/routes.config';

interface WrapProps {
  isAuth: boolean;
  component: JSX.Element;
}

const wrapComponent = ({ isAuth, component }: WrapProps) => {
  if (isAuth) {
    return (
      <RequireAuth>
        <Suspense fallback={<LoadingLayout />}>{component}</Suspense>
      </RequireAuth>
    );
  } else {
    return (
      <AnonymousAuth>
        <Suspense fallback={<LoadingLayout />}>{component}</Suspense>
      </AnonymousAuth>
    );
  }
};

const routeWrapper = ({ path, component, isAuth }: { path: string; component: JSX.Element; isAuth: boolean }) => {
  return <Route path={path} key={path} element={wrapComponent({ isAuth, component })}></Route>;
};

const BrowserRoutes = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route element={route.layout()} key={key}>
          {route.elements.map(element => routeWrapper(element))}
        </Route>
      ))}
    </Routes>
  );
};

export default BrowserRoutes;
