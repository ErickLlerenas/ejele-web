import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer no-underline">
          <img src="/favicon.ico" alt="Ejele Logo" className="w-8 h-8 rounded-lg transition-opacity group-hover:opacity-80" />
          <span className="text-xl font-black tracking-tight text-white">Ejele</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors no-underline">Funciones</a>
          <a href="#download" className="text-sm text-gray-400 hover:text-white transition-colors no-underline">Descargar</a>
          <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors no-underline">FAQ</a>
        </div>
      </div>
    </nav>
  );
}
