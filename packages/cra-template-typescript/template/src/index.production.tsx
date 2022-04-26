import React, { lazy, Suspense } from 'react';

import { createRoot } from 'react-dom/client';

import LoadingLayout from '@app/components/layouts/LoadingLayout';

import '@app/styles/index.scss';

const App = lazy(() => import('@app/App'));

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Suspense fallback={<LoadingLayout />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
}
