import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLatestDownloadUrl } from '@/utils/os';
import { Icon } from '@iconify/react';
import { detectOS, type OperatingSystem } from '@/utils/os';

export default function Footer() {
  const [macUrl, setMacUrl] = useState('');
  const [windowsUrl, setWindowsUrl] = useState('');
  const [userOS, setUserOS] = useState<OperatingSystem>('Unknown');

  useEffect(() => {
    const fetchUrls = async () => {
      const os = detectOS();
      setUserOS(os);
      const mac = await fetchLatestDownloadUrl('macOS');
      const windows = await fetchLatestDownloadUrl('Windows');
      setMacUrl(mac);
      setWindowsUrl(windows);
    };
    fetchUrls();
  }, []);

  return (
    <>
      {/* Final CTA */}
      <section className="py-32 md:py-48 px-6 text-center">
        <div className="reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            ¿Listo para empezar?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {userOS === 'macOS' && macUrl ? (
              <a href={macUrl} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors no-underline flex items-center justify-center gap-2">
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                Descargar Ejele gratis
              </a>
            ) : userOS === 'Windows' && windowsUrl ? (
              <a href={windowsUrl} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors no-underline flex items-center justify-center gap-2">
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                Descargar Ejele gratis
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                {macUrl && (
                  <a href={macUrl} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors no-underline flex items-center justify-center gap-2">
                    <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                    Descargar Ejele gratis
                  </a>
                )}
                {windowsUrl && (
                  <a href={windowsUrl} className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                    Descargar Ejele gratis
                  </a>
                )}
              </div>
            )}
          </div>
          <p className="text-gray-400 text-sm">100% Gratis • Sin límites • Sin suscripciones</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* Col 1: Logo & Desc */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/favicon.ico" alt="Ejele Logo" className="w-10 h-10 rounded-xl shadow-2xl" />
                <span className="text-2xl font-black text-white tracking-tighter">Ejele</span>
              </div>
              <p className="text-gray-400 text-base max-w-sm leading-relaxed mb-8">
                Software gratuito para restaurantes en México. Completo, fácil de usar y sin límites.
              </p>
            </div>

            {/* Col 2: Producto */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Producto</h3>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline">Funciones</a></li>
                <li><a href="#download" className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline">Descargar</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline">FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Descargas */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Descargas</h3>
              <ul className="space-y-4">
                <li>
                  <a href={macUrl || '#'} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline">
                    <Icon icon="lucide:apple" className="w-4 h-4" /> macOS
                  </a>
                </li>
                <li>
                  <a href={windowsUrl || '#'} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline">
                    <Icon icon="lucide:monitor" className="w-4 h-4" /> Windows
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/terminos-y-condiciones" className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline">Términos</Link></li>
                <li><Link to="/politica-de-privacidad" className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline">Privacidad</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm font-medium">
              © 2026 Ejele. Software gratis para restaurantes.
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Sistemas Online
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
