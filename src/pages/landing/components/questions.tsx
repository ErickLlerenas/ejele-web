import { Icon } from '@iconify/react';

export default function Questions() {
  const faqs = [
    {
      question: '¿En qué equipos puedo usarlo?',
      answer: 'Solo necesitas una computadora central (Windows o Mac) para la caja. Todos los demás dispositivos, como el Monitor de Cocina y la App de Meseros, funcionan directamente en el navegador de cualquier PC, Celular o Tablet.',
      icon: 'solar:laptop-bold-duotone',
      color: 'blue'
    },
    {
      question: '¿Cuántos dispositivos puedo conectar?',
      answer: 'Todos los que necesites. No hay límites. Ejele es ilimitado para que tu negocio crezca sin frenos.',
      icon: 'solar:users-group-two-rounded-bold-duotone',
      color: 'green'
    },
    {
      question: '¿Cómo funciona la facturación?',
      answer: 'Tus clientes se facturan solos. Solo tienen que escanear el código QR que sale en su ticket de venta, ingresar sus datos y listo. El CFDI les llega al instante.',
      icon: 'solar:document-text-bold-duotone',
      color: 'indigo'
    },
    {
      question: '¿Es realmente gratis?',
      answer: 'Sí, todo lo esencial es gratis para siempre. Puedes tomar pedidos, usar la app de meseros y generar reportes básicos sin pagar nada. Las funciones avanzadas como KDS, inventario y facturación están disponibles con planes opcionales.',
      icon: 'solar:gift-bold-duotone',
      color: 'orange'
    },
    {
      question: '¿Necesito internet para usarlo?',
      answer: 'No. Ejele funciona completamente offline. Todo se guarda localmente en tu computadora. Solo necesitas internet si quieres usar funciones premium como facturación CFDI.',
      icon: 'solar:wi-fi-router-bold-duotone',
      color: 'purple'
    },
    {
      question: '¿Es muy difícil de usar?',
      answer: 'Para nada. Ejele es tan intuitivo como usar WhatsApp. Tus meseros aprenderán a usarlo en menos de 5 minutos sin necesidad de cursos ni manuales.',
      icon: 'solar:magic-stick-3-bold-duotone',
      color: 'pink'
    },
  ];

  return (
    <section id="faq" className="py-32 md:py-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Preguntas frecuentes</h2>
          <p className="text-gray-400 text-lg">Resolvemos tus dudas.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const colorClasses = {
              blue: 'bg-blue-500/20 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/30',
              green: 'bg-green-500/20 border-green-500/50 hover:border-green-500 hover:bg-green-500/30',
              indigo: 'bg-blue-600/20 border-blue-600/50 hover:border-blue-600 hover:bg-blue-600/30',
              orange: 'bg-orange-500/20 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/30',
              purple: 'bg-purple-500/20 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/30',
              pink: 'bg-pink-500/20 border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/30'
            };
            
            const iconColors = {
              blue: 'text-blue-300',
              green: 'text-green-300',
              indigo: 'text-blue-400',
              orange: 'text-orange-300',
              purple: 'text-purple-300',
              pink: 'text-pink-300'
            };
            
            return (
              <div key={index} className={`p-6 rounded-lg border-2 ${colorClasses[faq.color as keyof typeof colorClasses]} bg-[#0a0a0a] reveal transition-all hover:scale-[1.02]`}>
                <div className={`mb-4 ${iconColors[faq.color as keyof typeof iconColors]}`}>
                  <Icon icon={faq.icon} className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
