import { Link } from "react-router-dom";

interface HeaderProps {
  /** Si es true, solo muestra el logo (sin enlaces Funciones, Descargar, Preguntas). */
  minimal?: boolean;
  /** Si es true, usa fondo claro y texto oscuro (para página de factura en light mode). */
  light?: boolean;
}

export default function Header({
  minimal = false,
  light = false,
}: HeaderProps) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-8 py-6 ${
        light
          ? "bg-white/90 backdrop-blur-sm border-b border-gray-200/80"
          : "bg-black/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 group cursor-pointer no-underline"
        >
          <img
            src="/favicon.ico"
            alt="Ejele Logo"
            className="w-8 h-8 rounded-lg transition-opacity group-hover:opacity-80"
          />
          <span
            className={`text-xl font-black tracking-tight ${light ? "text-gray-900" : "text-white"}`}
          >
            Ejele
          </span>
        </Link>
        {!minimal && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#features"
              className="text-sm text-gray-400 hover:text-white transition-colors no-underline"
            >
              Funciones
            </Link>
            <Link
              to="/#platforms"
              className="text-sm text-gray-400 hover:text-white transition-colors no-underline"
            >
              Descargar
            </Link>
            <Link
              to="/#faq"
              className="text-sm text-gray-400 hover:text-white transition-colors no-underline"
            >
              Preguntas
            </Link>
            <Link
              to="/programa-referidos"
              className="text-sm text-amber-400/90 hover:text-amber-300 transition-colors no-underline"
            >
              Referidos
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
