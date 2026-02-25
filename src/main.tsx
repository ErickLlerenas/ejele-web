import './global.css';

import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Router } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <HashRouter>
      <Suspense>
        <Router />
      </Suspense>
    </HashRouter>
  </HelmetProvider>
);
