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
      description: 'Adiós a los tickets de papel. Convierte cualquier tablet o monitor en una pantalla inteligente de producción. Todo funciona en tu red local.',
      color: 'indigo'
    },
    {
      icon: 'solar:wi-fi-router-bold-duotone',
      title: '100% Offline',
      description: 'Todo funciona sin internet. Tu restaurante opera al 100% de forma local. Todos tus datos se guardan en tu computadora.',
      color: 'orange'
    },
    {
      icon: 'solar:smartphone-bold-duotone',
      title: 'App para Meseros',
      description: 'Toma pedidos desde cualquier smartphone. Sin instalar nada, tus meseros operan desde el navegador en tu red local.',
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
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Todo lo que necesitas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Todas las funciones que necesitas para operar tu restaurante. <span className="text-white font-semibold">Gratis y funciona perfecto</span>.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/20 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/30',
              green: 'bg-green-500/20 border-green-500/50 hover:border-green-500 hover:bg-green-500/30',
              indigo: 'bg-blue-600/20 border-blue-600/50 hover:border-blue-600 hover:bg-blue-600/30',
              orange: 'bg-orange-500/20 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/30',
              purple: 'bg-purple-500/20 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/30',
              cyan: 'bg-cyan-500/20 border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/30',
              pink: 'bg-pink-500/20 border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/30',
              yellow: 'bg-yellow-500/20 border-yellow-500/50 hover:border-yellow-500 hover:bg-yellow-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              green: 'text-green-300',
              indigo: 'text-blue-400',
              orange: 'text-orange-300',
              purple: 'text-purple-300',
              cyan: 'text-cyan-300',
              pink: 'text-pink-300',
              yellow: 'text-yellow-300'
            };
            
            return (
              <div key={index} className={`p-6 rounded-lg border-2 ${colorClasses[feature.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02]`}>
                <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                  <Icon icon={feature.icon} className={`${iconColors[feature.color as keyof typeof iconColors]} w-6 h-6`} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
