import { Icon } from '@iconify/react';
import { useState } from 'react';
import ComingSoonDialog from './coming-soon-dialog';

export default function Hero() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section className="relative pt-24 md:pt-32 pb-24 px-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="reveal active">
          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full hidden md:block"></div>
              <img 
                src="/favicon.ico" 
                alt="Ejele Logo" 
                className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-white">
            Tu restaurante<br/>
            <span className="text-blue-400">funcionando hoy</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed px-4 md:px-0">
            Completo, <span className="font-bold text-white">gratis</span> y sin límites. Empieza a vender hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 px-4">
            <button
              onClick={() => setShowDialog(true)}
              className="group relative w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 overflow-hidden transition-colors duration-200 sm:hover:scale-105 bg-blue-600 hover:bg-blue-700 active:bg-blue-700 cursor-pointer"
            >
              {/* Glow effect - solo en desktop */}
              <div className="hidden sm:block absolute inset-0 bg-blue-600/0 group-hover:bg-blue-700/40 rounded-xl blur-2xl transition-all duration-300 -z-10"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5 sm:w-7 sm:h-7 text-white sm:group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white">Descargar Ejele gratis</span>
              </div>
              
              {/* Shine effect on hover - solo en desktop */}
              <div className="hidden sm:block absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl transition-transform duration-700"></div>
            </button>
          </div>

          {/* Prueba social */}
          <p className="text-gray-500 text-sm mb-12">
            <span className="text-white font-semibold">+100 restaurantes</span> en México • Instalación en 2 minutos
          </p>
        </div>

        {/* Hero Image (KDS) */}
        <div className="relative reveal delay-300 max-w-5xl mx-auto px-2 md:px-0">
          <div className="relative bg-[#0a0a0a] rounded-2xl md:rounded-3xl p-3 md:p-4 border border-white/10 group overflow-hidden">
            <img 
              src="/assets/images/screenshots/KDS.png" 
              alt="Ejele KDS" 
              className="rounded-xl md:rounded-2xl w-full relative z-10"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      
      <ComingSoonDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}
