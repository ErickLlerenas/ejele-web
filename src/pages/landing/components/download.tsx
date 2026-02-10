import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { detectOS, fetchLatestDownloadUrl, type OperatingSystem } from '@/utils/os';

export default function Download() {
  const [macUrl, setMacUrl] = useState('');
  const [windowsUrl, setWindowsUrl] = useState('');
  const [userOS, setUserOS] = useState<OperatingSystem>('Unknown');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      const os = detectOS();
      setUserOS(os);
      
      const mac = await fetchLatestDownloadUrl('macOS');
      const windows = await fetchLatestDownloadUrl('Windows');
      setMacUrl(mac);
      setWindowsUrl(windows);
      setLoading(false);
    };
    fetchUrls();
  }, []);

  return (
    <section id="download" className="py-32 md:py-48 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Descarga Ejele gratis
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
            Instala en tu computadora. Funciona en Windows y Mac.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* macOS Download */}
          <div
            className={`p-8 rounded-lg border bg-[#0a0a0a] reveal transition-all relative ${
              userOS === 'macOS' ? 'border-blue-600/40' : 'border-white/5'
            }`}
          >
            {userOS === 'macOS' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                Tu Sistema
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                <Icon icon="logos:apple" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">macOS</h3>
              <p className="text-gray-400 text-sm mb-8">
                Compatible con Apple Silicon
              </p>
              
              {loading ? (
                <div className="w-full h-12 bg-white/5 rounded-lg animate-pulse" />
              ) : (
                  <a
                    href={macUrl || '#'}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 no-underline"
                  >
                  <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                  Descargar Ejele gratis
                </a>
              )}
            </div>
          </div>

          {/* Windows Download */}
          <div
            className={`p-8 rounded-lg border bg-[#0a0a0a] reveal transition-all relative ${
              userOS === 'Windows' ? 'border-blue-600/40' : 'border-white/5'
            }`}
          >
            {userOS === 'Windows' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                Tu Sistema
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                <Icon icon="logos:microsoft-windows" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Windows</h3>
              <p className="text-gray-400 text-sm mb-8">
                Windows 10 y Windows 11
              </p>
              
              {loading ? (
                <div className="w-full h-12 bg-white/5 rounded-lg animate-pulse" />
              ) : (
                  <a
                    href={windowsUrl || '#'}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 no-underline"
                  >
                  <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                  Descargar Ejele gratis
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
