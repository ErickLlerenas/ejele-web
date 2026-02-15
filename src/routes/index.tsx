import { useRoutes } from 'react-router-dom';
import LandingPage from '@/pages/landing/landing';
import Policy from '@/pages/legal/policy';
import TermsAndConditions from '@/pages/legal/terms';
import PaymentSuccess from '@/pages/payment/payment-success';

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
    {
      path: 'payment-success',
      element: <PaymentSuccess />,
    },
  ]);
}
