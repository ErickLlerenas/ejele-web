import { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import Hero from './components/hero';
import Header from './components/header';

// Lazy load non-critical sections
const Features = lazy(() => import('./components/features'));
const Platforms = lazy(() => import('./components/platforms'));
const Questions = lazy(() => import('./components/questions'));
const Footer = lazy(() => import('./components/footer'));

export default function LandingPage() {
  useEffect(() => {
    const observerOptions = { 
      threshold: 0.01,
      rootMargin: '100px 0px 400px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('active')) {
          el.classList.add('active');
        }
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="landing-premium min-h-screen overflow-x-hidden">
      <Helmet title="Ejele - Punto de venta gratis para restaurantes" />
      <Header />
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <Features />
        <Platforms />
        <Questions />
        <Footer />
      </Suspense>
    </div>
  );
}
