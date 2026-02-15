import { useSearchParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from '../landing/components/header';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="landing-premium min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal active">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full"></div>
                <div className="relative w-24 h-24 bg-green-600 rounded-full flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold-duotone" className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              ¡Pago exitoso!
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
              Tu plan premium ha sido activado correctamente. Ya puedes disfrutar de todas las funciones premium de Ejele.
            </p>

            {/* Session ID (if available) */}
            {sessionId && (
              <div className="mb-8 p-4 bg-[#1e1e1e] rounded-lg border border-white/10">
                <p className="text-gray-500 text-xs mb-2">ID de sesión</p>
                <p className="text-gray-300 text-sm font-mono break-all">{sessionId}</p>
              </div>
            )}

            {/* Features List */}
            <div className="mb-10 p-6 bg-[#1e1e1e] rounded-lg border border-white/10 text-left">
              <h3 className="text-white font-bold mb-4 text-lg">Funciones premium activadas:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Pantallas de Cocina (KDS)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>App para Meseros</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Multi Dispositivos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Control de Inventario</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Y todas las funciones premium</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 overflow-hidden transition-colors duration-200 sm:hover:scale-105 bg-blue-600 hover:bg-blue-700 active:bg-blue-700 cursor-pointer"
              >
                <Icon icon="solar:home-bold-duotone" className="w-6 h-6 text-white" />
                <span className="text-white">Volver al inicio</span>
              </Link>
              <Link
                to="/#features"
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 overflow-hidden transition-colors duration-200 sm:hover:scale-105 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-white/10 cursor-pointer"
              >
                <Icon icon="solar:star-bold-duotone" className="w-6 h-6 text-white" />
                <span className="text-white">Ver funciones</span>
              </Link>
            </div>

            {/* Help Text */}
            <p className="text-gray-500 text-sm mt-8">
              Si tienes alguna pregunta, revisa nuestras <Link to="/#faq" className="text-blue-400 hover:text-blue-300 underline">preguntas frecuentes</Link> o contáctanos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
