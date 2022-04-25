import React from 'react';

import { createRoot } from 'react-dom/client';

import App from '@app/App';
import worker from '@app/api/mocks';
import { USE_MOCK_API } from '@app/constants/env.constants';
import reportWebVitals from '@app/reportWebVitals';
import '@app/styles/index.scss';

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
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
