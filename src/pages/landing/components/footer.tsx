import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLatestDownloadUrl } from '@/utils/os';
import { Icon } from '@iconify/react';

export default function Footer() {
  const [macUrl, setMacUrl] = useState('');
  const [windowsUrl, setWindowsUrl] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      const mac = await fetchLatestDownloadUrl('macOS');
      const windows = await fetchLatestDownloadUrl('Windows');
      setMacUrl(mac);
      setWindowsUrl(windows);
    };
    fetchUrls();
  }, []);

  return (
    <>
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
                Punto de venta completo para restaurantes en México. Gratis, funciona perfecto. Funciones premium opcionales.
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
                <li>
                  <a href="https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/Ejele.apk" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline">
                    <Icon icon="logos:android-icon" className="w-4 h-4" /> Android
                  </a>
                </li>
                <li>
                  <a href="https://apps.apple.com/app/ejele" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline">
                    <Icon icon="lucide:apple" className="w-4 h-4" /> iOS
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
              © 2026 Ejele. Punto de venta freemium para restaurantes.
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Funciona Offline
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
