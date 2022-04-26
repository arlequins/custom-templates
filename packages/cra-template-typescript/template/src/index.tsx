import React, { lazy, Suspense } from 'react';

import { createRoot } from 'react-dom/client';

import worker from '@app/api/mocks';
import LoadingLayout from '@app/components/layouts/LoadingLayout';
import { USE_MOCK_API } from '@app/constants/env.constants';
import reportWebVitals from '@app/reportWebVitals';

import '@app/styles/index.scss';

const App = lazy(() => import('@app/App'));

// Start the mocking conditionally.
if (USE_MOCK_API) {
  worker.printHandlers();
  worker.start({
    waitUntilReady: true,
    onUnhandledRequest: 'bypass',
    quiet: false,
  });
}

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
