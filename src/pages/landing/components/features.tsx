import { Icon } from '@iconify/react';

export default function Features() {
  const features = [
    {
      icon: 'solar:shop-2-bold-duotone',
      title: 'Comandero de Alta Velocidad',
      description: 'Interfaz amigable para que cualquier mesero tome comandas en segundos sin capacitación previa. Mayor rotación, menos errores.',
      color: 'blue'
    },
    {
      icon: 'solar:qr-code-bold-duotone',
      title: 'Facturación 100% Autónoma',
      description: 'Automatiza la emisión de facturas. Tus clientes escanean, ingresan sus datos y reciben su CFDI al instante.',
      color: 'green'
    },
    {
      icon: 'solar:monitor-bold-duotone',
      title: 'Pantallas de Cocina (KDS)',
      description: 'Adiós a los tickets de papel. Convierte cualquier tablet o monitor con internet en una pantalla inteligente de producción sincronizada.',
      color: 'indigo'
    },
    {
      icon: 'solar:wi-fi-router-bold-duotone',
      title: 'Modo Offline Real',
      description: 'Sigue vendiendo sin internet. Tu restaurante opera al 100% y se sincroniza automáticamente cuando vuelve la conexión.',
      color: 'orange'
    },
    {
      icon: 'solar:smartphone-bold-duotone',
      title: 'App para Meseros',
      description: 'Toma pedidos desde cualquier smartphone. Sin instalar nada, tus meseros operan desde el navegador con sincronización inmediata.',
      color: 'purple'
    },
    {
      icon: 'solar:printer-bold-duotone',
      title: 'Logística de Despacho',
      description: 'Despacho inteligente de pedidos: bebidas directo a barra y alimentos a cocina de forma automatizada.',
      color: 'cyan'
    },
    {
      icon: 'solar:lock-password-bold-duotone',
      title: 'Protección de Caja',
      description: 'Control estricto por perfiles de usuario. Autorización vía PIN para cancelaciones, descuentos y cortes.',
      color: 'pink'
    },
    {
      icon: 'solar:chart-2-bold-duotone',
      title: 'Inteligencia de Ventas',
      description: 'Suite completa de reportes financieros y operativos para identificar platillos rentables y eficiencia.',
      color: 'yellow'
    },
  ];

  return (
    <section id="features" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Funciones principales</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Todo lo que necesitas para operar tu restaurante.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
              green: 'bg-green-500/10 border-green-500/20 hover:border-green-500/40',
              indigo: 'bg-blue-600/10 border-blue-600/20 hover:border-blue-600/40',
              orange: 'bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40',
              purple: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40',
              cyan: 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40',
              pink: 'bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40',
              yellow: 'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40'
            };
            
            const iconColors = {
              blue: 'text-blue-400',
              green: 'text-green-400',
              indigo: 'text-blue-500',
              orange: 'text-orange-400',
              purple: 'text-purple-400',
              cyan: 'text-cyan-400',
              pink: 'text-pink-400',
              yellow: 'text-yellow-400'
            };
            
            return (
              <div key={index} className={`p-6 rounded-lg border ${colorClasses[feature.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02]`}>
                <div className={`w-10 h-10 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                  <Icon icon={feature.icon} className={`${iconColors[feature.color as keyof typeof iconColors]} w-5 h-5`} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
