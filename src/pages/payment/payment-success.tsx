import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from '../landing/components/header';

export default function PaymentSuccess() {
  return (
    <div className="landing-premium min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-xl mx-auto text-center">
          <div className="reveal active">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full"></div>
                <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold-duotone" className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              ¡Pago exitoso!
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              Tu compra ha sido procesada correctamente. Ya puedes usar tu producto en Ejele.
            </p>

            {/* Action Button */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white transition-colors duration-200 hover:scale-105 cursor-pointer"
            >
              <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
