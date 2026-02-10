export default function Testimonial() {
  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal">
          <div className="p-10 md:p-12 rounded-2xl border border-white/10 bg-[#0a0a0a] text-center">
            <div className="text-5xl mb-6">"</div>
            <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
              Llevamos 6 meses usando Ejele y ha sido un cambio total. Empezamos con la versión gratis y funcionó perfecto para nuestras necesidades básicas. Cuando crecimos, agregamos el plan premium para el KDS y la facturación. Antes pagábamos $2,000 pesos al mes por un sistema peor. La instalación fue súper fácil y nuestros meseros lo aprendieron en un día.
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <p className="text-white font-bold text-lg">Carlos Mendoza</p>
              <p className="text-gray-400 text-sm">Dueño de La Cocina de Carlos • Ciudad de México</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
