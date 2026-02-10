import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Hero from './components/hero';
import Header from './components/header';
import Features from './components/features';
import Platforms from './components/platforms';
import Questions from './components/questions';
import Footer from './components/footer';

export default function LandingPage() {
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    let observer: IntersectionObserver | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const initObserver = () => {
      const observerOptions = { 
        threshold: 0.01,
        rootMargin: '50px'
      };
      
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer?.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer?.observe(el));

      // Fallback: show all after 500ms
      timeout = setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
          if (!el.classList.contains('active')) {
            el.classList.add('active');
          }
        });
      }, 500);
    };

    requestAnimationFrame(initObserver);

    return () => {
      if (observer) observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="landing-premium min-h-screen overflow-x-hidden">
      <Helmet title="Ejele - Punto de venta gratis para restaurantes" />
      <Header />
      <Hero />
      <Features />
      <Platforms />
      <Questions />
      <Footer />
    </div>
  );
}
