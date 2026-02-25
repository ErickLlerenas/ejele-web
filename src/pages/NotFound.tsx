import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Icon } from '@iconify/react';
import Header from '@/pages/landing/components/header';

export default function NotFound() {
  return (
    <div className="landing-premium min-h-screen">
      <Helmet title="Página no encontrada - Ejele" />
      <Header />
      <section className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-slate-600/20 blur-3xl rounded-full" />
              <div className="relative w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
                <Icon icon="solar:ghost-bold-duotone" className="w-12 h-12 text-slate-400" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Página no encontrada
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            La ruta a la que intentas acceder no existe. Revisa la dirección o vuelve al inicio.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors no-underline"
          >
            <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
