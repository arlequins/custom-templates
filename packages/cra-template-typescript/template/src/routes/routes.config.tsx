import { lazy } from 'react';

import DefaultLayout from '@app/components/layouts/DefaultLayout';

const PublicPage = lazy(() => import('@app/pages'));
const LoginPage = lazy(() => import('@app/pages/login'));
const ProtectedPage = lazy(() => import('@app/pages/protected'));

const routes = [
  {
    layout: DefaultLayout,
    elements: [
      {
        path: '/',
        component: <PublicPage />,
        isAuth: false,
      },
      {
        path: '/login',
        component: <LoginPage />,
        isAuth: false,
      },
      {
        path: '/protected',
        component: <ProtectedPage />,
        isAuth: true,
      },
    ],
  },
];

export default routes;
