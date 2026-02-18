export default function WhyFree() {
  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Modelo Freemium
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Creemos que el software de punto de venta no debería ser un lujo.
            Por eso,{" "}
            <span className="font-bold text-white">
              todo lo esencial es completamente gratis
            </span>
            . Puedes empezar a vender hoy mismo sin pagar nada. Las funciones
            avanzadas como KDS, inventario y facturación están disponibles con
            planes opcionales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg border border-green-500/20 bg-green-500/5">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-white mb-3">
                Gratis para siempre
              </h3>
              <ul className="text-gray-400 text-sm space-y-2 text-left">
                <li>• Comandas y toma de pedidos</li>
                <li>• App para meseros</li>
                <li>• Reportes básicos de ventas</li>
                <li>• Múltiples dispositivos</li>
                <li>• Modo offline</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <div className="text-3xl mb-4">💎</div>
              <h3 className="text-lg font-bold text-white mb-3">
                Funciones Premium
              </h3>
              <ul className="text-gray-400 text-sm space-y-2 text-left">
                <li>• Pantallas en Cocina (KDS)</li>
                <li>• Control de Inventarios</li>
                <li>• Facturación CFDI</li>
                <li>• Reportes avanzados</li>
                <li>• Soporte prioritario</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
