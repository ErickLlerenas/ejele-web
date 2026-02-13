import { Icon } from '@iconify/react';
import { useState } from 'react';
import ComingSoonDialog from './coming-soon-dialog';

export default function Platforms() {
  const [showDialog, setShowDialog] = useState(false);

  const platforms = [
    {
      name: 'Windows',
      icon: 'logos:microsoft-windows',
      description: 'Windows 10 y Windows 11',
      color: 'blue',
      isUserOS: false
    },
    {
      name: 'macOS',
      icon: 'logos:apple',
      description: 'Compatible con Apple Silicon',
      color: 'slate',
      isUserOS: false
    },
    {
      name: 'Android',
      icon: 'logos:android-icon',
      description: 'Funciona en cualquier dispositivo Android',
      color: 'green',
      downloadUrl: '',
      isUserOS: false
    },
    {
      name: 'iOS',
      icon: 'logos:apple',
      description: 'iPhone y iPad',
      color: 'gray',
      downloadUrl: '',
      isUserOS: false
    },
  ];

  return (
    <section id="platforms" className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Plataformas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Funciona en todos tus dispositivos</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/20 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/30',
              slate: 'bg-slate-500/20 border-slate-500/50 hover:border-slate-500 hover:bg-slate-500/30',
              gray: 'bg-gray-500/20 border-gray-500/50 hover:border-gray-500 hover:bg-gray-500/30',
              green: 'bg-green-500/20 border-green-500/50 hover:border-green-500 hover:bg-green-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              slate: 'text-slate-300',
              gray: 'text-gray-300',
              green: 'text-green-300'
            };
            
            const buttonColors = {
              blue: 'bg-blue-600 hover:bg-blue-500',
              slate: 'bg-slate-600 hover:bg-slate-500',
              gray: 'bg-gray-600 hover:bg-gray-500',
              green: 'bg-green-600 hover:bg-green-500'
            };
            
            return (
              <div 
                key={index} 
                className={`p-8 rounded-lg border-2 ${
                  platform.isUserOS 
                    ? 'border-blue-500 bg-blue-500/10' 
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
                        ? 'text-blue-400' 
                        : iconColors[platform.color as keyof typeof iconColors]
                    } w-12 h-12`} 
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{platform.name}</h3>
                <p className="text-gray-300 text-sm mb-6">{platform.description}</p>
                
                <button
                  onClick={() => setShowDialog(true)}
                  className={`w-full ${buttonColors[platform.color as keyof typeof buttonColors]} text-white py-2 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                  Descargar
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <ComingSoonDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}
