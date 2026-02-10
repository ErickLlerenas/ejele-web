import { Icon } from '@iconify/react';
import { detectOS, fetchLatestDownloadUrl } from '@/utils/os';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      const os = detectOS();
      const url = await fetchLatestDownloadUrl(os);
      setDownloadUrl(url);
      setLoading(false);
    };
    fetchUrl();
  }, []);

  return (
    <section className="relative min-h-screen pt-32 md:pt-48 pb-32 px-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="reveal active">
          {/* Logo grande centrado */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
              <img 
                src="/favicon.ico" 
                alt="Ejele Logo" 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 md:mb-10 text-white">
            El mejor software gratuito<br/>
            <span className="text-blue-400">para restaurantes en México</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed px-4 md:px-0">
            Software de punto de venta completo y gratuito. Funciona en cualquier dispositivo, sin límites ni suscripciones.
          </p>
        
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 px-4">
            {loading ? (
              <div className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-8 py-4 rounded-lg font-medium text-base flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <a
                href={downloadUrl || '#'}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors duration-200 no-underline flex items-center justify-center gap-2"
              >
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                Descargar Ejele gratis
              </a>
            )}
          </div>
        </div>

        {/* Hero Image (KDS) */}
        <div className="relative reveal delay-300 max-w-5xl mx-auto px-2 md:px-0">
          <div className="relative bg-[#0a0a0a] rounded-2xl md:rounded-3xl p-3 md:p-4 border border-white/10 group overflow-hidden">
            <img 
              src="/assets/images/screenshots/KDS.png" 
              alt="Ejele KDS" 
              className="rounded-xl md:rounded-2xl w-full relative z-10"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
