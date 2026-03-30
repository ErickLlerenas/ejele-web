import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { APP_STORE_URL } from "@/constants/store";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Logo & Desc */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/favicon.ico"
                alt="Ejele Logo"
                className="w-10 h-10 rounded-xl shadow-2xl"
              />
              <span className="text-2xl font-black text-white tracking-tighter">
                Ejele
              </span>
            </div>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed mb-8">
              Punto de venta completo para restaurantes en México. Gratis para
              siempre y completamente funcional. Funciones premium disponibles
              cuando las necesites.
            </p>
          </div>

          {/* Col 2: Producto */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Producto
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/#features"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline"
                >
                  Funciones
                </Link>
              </li>
              <li>
                <Link
                  to="/#platforms"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline"
                >
                  Descargar
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline"
                >
                  Preguntas
                </Link>
              </li>
              <li>
                <Link
                  to="/programa-referidos"
                  className="text-gray-400 hover:text-amber-300 transition-colors text-sm font-medium no-underline"
                >
                  Referidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Descargas */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Descargas
            </h3>
            <p className="text-gray-500 text-xs mb-3">Equipo principal</p>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  to="/#platforms"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline"
                >
                  <Icon
                    icon="lucide:monitor"
                    className="w-4 h-4 shrink-0 text-blue-400"
                  />{" "}
                  Windows
                </Link>
              </li>
              <li>
                <Link
                  to="/#platforms"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline"
                >
                  <Icon
                    icon="lucide:apple"
                    className="w-4 h-4 shrink-0 text-gray-200"
                  />{" "}
                  macOS
                </Link>
              </li>
              <li>
                <Link
                  to="/#platforms"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline"
                >
                  <Icon icon="logos:android-icon" className="w-4 h-4" />{" "}
                  Terminal POS Android
                </Link>
              </li>
            </ul>
            <p className="text-gray-500 text-xs mb-3">
              App remota (meseros, cocina)
            </p>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-500 text-sm font-medium flex items-center gap-2 cursor-not-allowed">
                  <Icon icon="logos:google-play-icon" className="w-4 h-4 grayscale opacity-50" />{" "}
                  Play Store (Próximamente)
                </span>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 no-underline"
                >
                  <Icon icon="logos:apple-app-store" className="w-4 h-4" /> App
                  Store
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/terminos-y-condiciones"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidad"
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium no-underline"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm font-medium">
            © 2026 Ejele. Punto de venta freemium para restaurantes.
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Funciona Offline
          </div>
        </div>
      </div>
    </footer>
  );
}
