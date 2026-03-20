import './global.css';

import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { MetaPixelRouteTracker } from './components/meta-pixel-route-tracker';
import { Router } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <MetaPixelRouteTracker />
      <Suspense>
        <Router />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
