import { Icon } from '@iconify/react';

export default function KeyFeatures() {
  const keyFeatures = [
    {
      icon: 'solar:shop-2-bold-duotone',
      title: 'Comandas Rápidas',
      description: 'Toma pedidos en segundos con una interfaz intuitiva. Tus meseros aprenderán a usarlo en menos de 5 minutos.',
      color: 'blue'
    },
    {
      icon: 'solar:chart-2-bold-duotone',
      title: 'Control de Inventarios',
      description: 'Gestiona tu inventario en tiempo real. Recibe alertas cuando los productos se agotan y lleva un control preciso de tus costos.',
      color: 'green'
    },
    {
      icon: 'solar:document-text-bold-duotone',
      title: 'Reportes de Ventas',
      description: 'Analiza tus ventas diarias, semanales y mensuales. Identifica tus platillos más rentables y optimiza tu menú.',
      color: 'orange'
    },
  ];

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">3 Funciones Clave</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Todo lo esencial para operar tu restaurante desde el primer día.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyFeatures.map((feature, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/10 border-blue-500/30',
              green: 'bg-green-500/10 border-green-500/30',
              orange: 'bg-orange-500/10 border-orange-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-400',
              green: 'text-green-400',
              orange: 'text-orange-400'
            };
            
            return (
              <div key={index} className={`p-8 rounded-lg border ${colorClasses[feature.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02]`}>
                <div className={`w-14 h-14 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-6`}>
                  <Icon icon={feature.icon} className={`${iconColors[feature.color as keyof typeof iconColors]} w-7 h-7`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
