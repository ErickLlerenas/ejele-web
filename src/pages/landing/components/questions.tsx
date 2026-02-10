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
      answer: 'Todos los que necesites. No hay límites. Tu software es ilimitado para que tu negocio crezca sin frenos.',
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
      answer: 'Sí, completamente gratis. No hay costos ocultos, no hay suscripciones, no hay límites. Descarga y usa el software sin restricciones.',
      icon: 'solar:gift-bold-duotone',
      color: 'orange'
    },
    {
      question: '¿Qué pasa si se me va el internet?',
      answer: 'El sistema entra en Modo Offline de inmediato. Puedes seguir tomando pedidos y sacando tickets; cuando el internet vuelve, todo se sincroniza solo.',
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
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-lg border border-white/5 bg-[#0a0a0a] reveal hover:border-white/10 transition-colors">
              <div className="mb-4 text-gray-400">
                <Icon icon={faq.icon} className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
