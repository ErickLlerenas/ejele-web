import { Icon } from '@iconify/react';
import { useState } from 'react';
import ComingSoonDialog from './coming-soon-dialog';

export default function Hero() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-32 px-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="reveal active">
          {/* Logo reducido */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
              <img 
                src="/favicon.ico" 
                alt="Ejele Logo" 
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 md:mb-8 text-white">
            Tu restaurante<br/>
            <span className="text-blue-400">funcionando hoy</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed px-4 md:px-0">
            Completo, <span className="font-bold text-white">gratis</span> y sin límites. Empieza a vender hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 px-4">
            <button
              onClick={() => setShowDialog(true)}
              className="group relative w-full sm:w-auto px-6 py-4 sm:px-12 sm:py-6 rounded-xl font-bold text-base sm:text-xl flex items-center justify-center gap-2 sm:gap-3 overflow-hidden transition-all duration-300 hover:scale-105 bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-700/40 rounded-xl blur-2xl transition-all duration-300 -z-10"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white">Descargar Ejele gratis</span>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl transition-transform duration-700"></div>
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
