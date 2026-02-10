import { Icon } from '@iconify/react';

export default function Platforms() {
  const platforms = [
    {
      name: 'Windows',
      icon: 'logos:microsoft-windows',
      description: 'Windows 10 y Windows 11',
      color: 'blue'
    },
    {
      name: 'macOS',
      icon: 'logos:apple',
      description: 'Compatible con Apple Silicon',
      color: 'gray'
    },
    {
      name: 'Android',
      icon: 'logos:android-icon',
      description: 'Funciona en cualquier dispositivo Android',
      color: 'green'
    },
    {
      name: 'iOS',
      icon: 'logos:apple',
      description: 'iPhone y iPad',
      color: 'gray'
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
              blue: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
              gray: 'bg-gray-500/10 border-gray-500/20 hover:border-gray-500/40',
              green: 'bg-green-500/10 border-green-500/20 hover:border-green-500/40'
            };
            
            const iconColors = {
              blue: 'text-blue-400',
              gray: 'text-gray-400',
              green: 'text-green-400'
            };
            
            return (
              <div key={index} className={`p-8 rounded-lg border ${colorClasses[platform.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02] text-center`}>
                <div className={`w-16 h-16 rounded-lg ${colorClasses[platform.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 mx-auto`}>
                  <Icon icon={platform.icon} className={`${iconColors[platform.color as keyof typeof iconColors]} w-10 h-10`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{platform.name}</h3>
                <p className="text-gray-400 text-sm">{platform.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
