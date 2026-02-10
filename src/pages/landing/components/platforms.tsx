import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { detectOS, fetchLatestDownloadUrl, type OperatingSystem } from '@/utils/os';

export default function Platforms() {
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

  const platforms = [
    {
      name: 'Windows',
      icon: 'logos:microsoft-windows',
      description: 'Windows 10 y Windows 11',
      color: 'blue',
      downloadUrl: windowsUrl,
      isUserOS: userOS === 'Windows'
    },
    {
      name: 'macOS',
      icon: 'logos:apple',
      description: 'Compatible con Apple Silicon',
      color: 'gray',
      downloadUrl: macUrl,
      isUserOS: userOS === 'macOS'
    },
    {
      name: 'Android',
      icon: 'logos:android-icon',
      description: 'Funciona en cualquier dispositivo Android',
      color: 'green',
      downloadUrl: 'https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/Ejele.apk',
      isUserOS: false
    },
    {
      name: 'iOS',
      icon: 'logos:apple',
      description: 'iPhone y iPad',
      color: 'gray',
      downloadUrl: 'https://apps.apple.com/app/ejele',
      isUserOS: false
    },
  ];

  return (
    <section id="platforms" className="py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Plataformas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Funciona en todos tus dispositivos</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/20 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/30',
              gray: 'bg-gray-500/20 border-gray-500/50 hover:border-gray-500 hover:bg-gray-500/30',
              green: 'bg-green-500/20 border-green-500/50 hover:border-green-500 hover:bg-green-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              gray: 'text-gray-300',
              green: 'text-green-300'
            };
            
            const buttonColors = {
              blue: 'bg-blue-600 hover:bg-blue-500',
              gray: 'bg-gray-600 hover:bg-gray-500',
              green: 'bg-green-600 hover:bg-green-500'
            };
            
            return (
              <div 
                key={index} 
                className={`p-8 rounded-lg border-2 ${
                  platform.isUserOS 
                    ? 'border-blue-500/60 bg-blue-500/10' 
                    : colorClasses[platform.color as keyof typeof colorClasses]
                } bg-[#0a0a0a] reveal transition-all hover:scale-[1.02] text-center relative`}
              >
                {platform.isUserOS && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Tu Sistema
                  </div>
                )}
                <div className={`w-20 h-20 rounded-lg ${
                  platform.isUserOS 
                    ? 'bg-blue-500/20' 
                    : colorClasses[platform.color as keyof typeof colorClasses]
                } flex items-center justify-center mb-6 mx-auto`}>
                  <Icon 
                    icon={platform.icon} 
                    className={`${
                      platform.isUserOS 
                        ? 'text-blue-300' 
                        : iconColors[platform.color as keyof typeof iconColors]
                    } w-12 h-12`} 
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{platform.name}</h3>
                <p className="text-gray-300 text-sm mb-6">{platform.description}</p>
                
                {loading && (platform.name === 'Windows' || platform.name === 'macOS') ? (
                  <div className="w-full h-12 bg-white/5 rounded-lg animate-pulse" />
                ) : (
                  <a
                    href={platform.downloadUrl || '#'}
                    className={`w-full ${buttonColors[platform.color as keyof typeof buttonColors]} text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 no-underline`}
                  >
                    <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                    Descargar
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
