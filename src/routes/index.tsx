import { useRoutes } from 'react-router-dom';
import LandingPage from '@/pages/landing/landing';
import Policy from '@/pages/legal/policy';
import TermsAndConditions from '@/pages/legal/terms';

export function Router() {
  return useRoutes([
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: 'politica-de-privacidad',
      element: <Policy />,
    },
    {
      path: 'terminos-y-condiciones',
      element: <TermsAndConditions />,
    },
  ]);
}
