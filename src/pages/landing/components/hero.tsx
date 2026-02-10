import { Icon } from '@iconify/react';
import { detectOS, fetchLatestDownloadUrl, type OperatingSystem } from '@/utils/os';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [userOS, setUserOS] = useState<OperatingSystem>('Unknown');

  useEffect(() => {
    const fetchUrl = async () => {
      setLoading(true);
      const os = detectOS();
      setUserOS(os);
      const url = await fetchLatestDownloadUrl(os);
      setDownloadUrl(url);
      setLoading(false);
    };
    fetchUrl();
  }, []);

  const getDownloadText = () => {
    if (userOS === 'macOS') return 'Descargar Ejele gratis';
    if (userOS === 'Windows') return 'Descargar Ejele gratis';
    return 'Descargar Ejele gratis';
  };

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
            {loading ? (
              <div className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-8 py-4 rounded-lg font-medium text-base flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <a
                href={downloadUrl || '#'}
                className="w-full sm:w-auto bg-blue-500 text-white px-12 py-6 rounded-lg font-bold text-xl hover:bg-blue-400 transition-all duration-200 no-underline flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
              >
                <Icon icon="solar:download-bold-duotone" className="w-7 h-7" />
                {getDownloadText()}
              </a>
            )}
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
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
