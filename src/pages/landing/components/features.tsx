import { Icon } from '@iconify/react';

export default function Features() {
  const features = [
    {
      icon: 'solar:shop-2-bold-duotone',
      title: 'Comandero de Alta Velocidad',
      description: 'Interfaz amigable para que cualquier mesero tome comandas en segundos sin capacitación previa. Mayor rotación, menos errores.',
      color: 'blue',
      premium: false
    },
    {
      icon: 'solar:qr-code-bold-duotone',
      title: 'Facturación 100% Autónoma',
      description: 'Automatiza la emisión de facturas. Tus clientes escanean, ingresan sus datos y reciben su CFDI al instante.',
      color: 'green',
      premium: true
    },
    {
      icon: 'solar:monitor-bold-duotone',
      title: 'Pantallas de Cocina (KDS)',
      description: 'Adiós a los tickets de papel. Convierte cualquier tablet o monitor en una pantalla inteligente de producción. Todo funciona en tu red local.',
      color: 'indigo',
      premium: true
    },
    {
      icon: 'solar:wi-fi-router-bold-duotone',
      title: '100% Offline',
      description: 'Opera sin internet. Tu restaurante funciona de forma local y todos tus datos se guardan en tu computadora. Solo necesitas internet para registrarte y comprar planes premium.',
      color: 'orange',
      premium: false
    },
    {
      icon: 'solar:smartphone-bold-duotone',
      title: 'App para Meseros',
      description: 'Toma pedidos desde cualquier smartphone o tablet. Instala la misma aplicación en todos tus dispositivos y conéctalos a tu computadora central.',
      color: 'purple',
      premium: true
    },
    {
      icon: 'solar:devices-bold-duotone',
      title: 'Multi Dispositivos',
      description: 'Conecta ilimitados dispositivos a tu sistema: monitores de cocina, cajas adicionales y más.',
      color: 'cyan',
      premium: false
    },
    {
      icon: 'solar:box-bold-duotone',
      title: 'Inventario',
      description: 'Control completo de tu inventario. Registra entradas, salidas y ajustes. Mantén un seguimiento preciso de tus productos y materias primas.',
      color: 'pink',
      premium: true
    },
    {
      icon: 'solar:chart-2-bold-duotone',
      title: 'Inteligencia de Ventas',
      description: 'Suite completa de reportes financieros y operativos para identificar platillos rentables y eficiencia.',
      color: 'yellow',
      premium: false
    },
    {
      icon: 'solar:chair-bold-duotone',
      title: 'Gestión de Mesas',
      description: 'Administra tus mesas de forma eficiente. Asigna meseros, controla el estado de ocupación y organiza tu restaurante.',
      color: 'teal',
      premium: false
    },
    {
      icon: 'solar:calculator-bold-duotone',
      title: 'Cortes de Caja',
      description: 'Realiza cortes de caja completos y precisos. Genera reportes de ventas, calcula diferencias y cierra turnos de forma rápida.',
      color: 'emerald',
      premium: false
    },
    {
      icon: 'solar:users-group-two-rounded-bold-duotone',
      title: 'Registro de Clientes',
      description: 'Guarda la información de tus clientes. Registra sus datos de contacto y domicilio para entregas.',
      color: 'rose',
      premium: false
    },
    {
      icon: 'solar:lock-password-bold-duotone',
      title: 'Protección de Caja',
      description: 'Control estricto por perfiles de usuario. Autorización vía PIN para cancelaciones, descuentos y cortes.',
      color: 'violet',
      premium: false
    },
  ];

  return (
    <section id="features" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Todo lo que necesitas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Funciones completas para operar tu restaurante. <span className="text-white font-semibold">La mayoría gratis</span>, funciones premium opcionales.</p>
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
              yellow: 'bg-yellow-500/20 border-yellow-500/50 hover:border-yellow-500 hover:bg-yellow-500/30',
              teal: 'bg-teal-500/20 border-teal-500/50 hover:border-teal-500 hover:bg-teal-500/30',
              emerald: 'bg-emerald-500/20 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/30',
              rose: 'bg-rose-500/20 border-rose-500/50 hover:border-rose-500 hover:bg-rose-500/30',
              violet: 'bg-violet-500/20 border-violet-500/50 hover:border-violet-500 hover:bg-violet-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              green: 'text-green-300',
              indigo: 'text-blue-400',
              orange: 'text-orange-300',
              purple: 'text-purple-300',
              cyan: 'text-cyan-300',
              pink: 'text-pink-300',
              yellow: 'text-yellow-300',
              teal: 'text-teal-300',
              emerald: 'text-emerald-300',
              rose: 'text-rose-300',
              violet: 'text-violet-300'
            };
            
            return (
              <div key={index} className={`p-6 rounded-lg border-2 ${colorClasses[feature.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02] relative`}>
                {feature.premium && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Premium
                  </div>
                )}
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
