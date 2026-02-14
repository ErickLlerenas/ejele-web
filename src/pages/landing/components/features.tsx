import { Icon } from '@iconify/react';

export default function Features() {
  const features = [
    {
      icon: 'solar:shop-2-bold-duotone',
      title: 'Comandero de Alta Velocidad',
      description: 'Toma comandas en segundos sin capacitación. Mayor rotación, menos errores.',
      color: 'blue',
      premium: false
    },
    {
      icon: 'solar:qr-code-bold-duotone',
      title: 'Facturación 100% Autónoma',
      description: 'Tus clientes se facturan solos. Escanean QR y reciben su CFDI al instante.',
      color: 'green',
      premium: false,
      badge: 'compras'
    },
    {
      icon: 'solar:monitor-bold-duotone',
      title: 'Pantallas de Cocina (KDS)',
      description: 'Convierte cualquier dispositivo en pantalla de producción. Funciona en tu red local.',
      color: 'indigo',
      premium: true
    },
    {
      icon: 'solar:wi-fi-router-bold-duotone',
      title: '100% Offline',
      description: 'Opera sin internet. Todo se guarda localmente en tu computadora.',
      color: 'orange',
      premium: false
    },
    {
      icon: 'solar:smartphone-bold-duotone',
      title: 'App para Meseros',
      description: 'Toma pedidos desde cualquier smartphone o tablet conectado a tu sistema.',
      color: 'purple',
      premium: true
    },
    {
      icon: 'solar:devices-bold-duotone',
      title: 'Multi Dispositivos',
      description: 'Conecta dispositivos ilimitados: monitores, tablets y cajas adicionales.',
      color: 'cyan',
      premium: true
    },
    {
      icon: 'solar:box-bold-duotone',
      title: 'Inventario',
      description: 'Control completo. Registra entradas, salidas y ajustes de productos.',
      color: 'pink',
      premium: true
    },
    {
      icon: 'solar:chart-2-bold-duotone',
      title: 'Inteligencia de Ventas',
      description: 'Reportes financieros y operativos para identificar platillos rentables.',
      color: 'yellow',
      premium: false
    },
    {
      icon: 'solar:chair-bold-duotone',
      title: 'Gestión de Mesas',
      description: 'Administra mesas, asigna meseros y controla la ocupación.',
      color: 'teal',
      premium: false
    },
    {
      icon: 'solar:calculator-bold-duotone',
      title: 'Cortes de Caja',
      description: 'Cortes completos y precisos. Genera reportes y cierra turnos rápido.',
      color: 'emerald',
      premium: false
    },
    {
      icon: 'solar:users-group-two-rounded-bold-duotone',
      title: 'Registro de Clientes',
      description: 'Guarda información de contacto, domicilio e historial de pedidos.',
      color: 'rose',
      premium: false
    },
    {
      icon: 'solar:lock-password-bold-duotone',
      title: 'Protección de Caja',
      description: 'Control por perfiles. Autorización vía PIN para operaciones sensibles.',
      color: 'violet',
      premium: false
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Todo lo que necesitas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Todo lo esencial es <span className="text-white font-semibold">gratis para siempre</span>. Funciones premium opcionales cuando las necesites.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const cardBgColors = {
              blue: 'bg-blue-900',
              green: 'bg-green-900',
              indigo: 'bg-indigo-900',
              orange: 'bg-orange-900',
              purple: 'bg-purple-900',
              cyan: 'bg-cyan-900',
              pink: 'bg-pink-900',
              yellow: 'bg-yellow-900',
              teal: 'bg-teal-900',
              emerald: 'bg-emerald-900',
              rose: 'bg-rose-900',
              violet: 'bg-violet-900'
            };
            
            const iconBgColors = {
              blue: 'bg-blue-800',
              green: 'bg-green-800',
              indigo: 'bg-indigo-800',
              orange: 'bg-orange-800',
              purple: 'bg-purple-800',
              cyan: 'bg-cyan-800',
              pink: 'bg-pink-800',
              yellow: 'bg-yellow-800',
              teal: 'bg-teal-800',
              emerald: 'bg-emerald-800',
              rose: 'bg-rose-800',
              violet: 'bg-violet-800'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              green: 'text-green-300',
              indigo: 'text-indigo-300',
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
              <div key={index} className={`p-6 rounded-lg ${cardBgColors[feature.color as keyof typeof cardBgColors]} reveal transition-all hover:scale-[1.02] relative`}>
                {feature.premium && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Premium
                  </div>
                )}
                {(feature as any).badge === 'compras' && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Folios
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg ${iconBgColors[feature.color as keyof typeof iconBgColors]} flex items-center justify-center mb-4`}>
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
