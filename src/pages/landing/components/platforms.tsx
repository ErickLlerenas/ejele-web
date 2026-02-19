import { Icon } from '@iconify/react';
import { useState } from 'react';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/constants/store';
import ComingSoonDialog from './coming-soon-dialog';

const mainCardBg = {
  blue: 'bg-blue-900',
  slate: 'bg-slate-800',
  green: 'bg-green-900',
};

const mainIconBg = {
  blue: 'bg-blue-800',
  slate: 'bg-slate-700',
  green: 'bg-green-800',
};

const mainIconColors = {
  blue: 'text-blue-300',
  slate: 'text-slate-300',
  green: 'text-green-300',
};

const mainButtonColors = {
  blue: 'bg-blue-600 hover:bg-blue-500',
  slate: 'bg-slate-600 hover:bg-slate-500',
  green: 'bg-green-600 hover:bg-green-500',
};

// Tonos más suaves para las apps satélite
const remoteCardBg = {
  green: 'bg-green-900/60',
  gray: 'bg-gray-800/60',
};

const remoteIconBg = {
  green: 'bg-green-800/80',
  gray: 'bg-gray-700/80',
};

const remoteIconColors = {
  green: 'text-green-300',
  gray: 'text-gray-300',
};

const remoteButtonColors = {
  green: 'bg-green-600/90 hover:bg-green-500',
  gray: 'bg-gray-600/90 hover:bg-gray-500',
};

const mainPlatforms = [
  { name: 'Windows', icon: 'logos:microsoft-windows', description: 'Windows 10 y Windows 11', color: 'blue' as const },
  { name: 'macOS', icon: 'logos:apple', description: 'Compatible con Apple Silicon', color: 'slate' as const },
  { name: 'Terminal POS Android', icon: 'logos:android-icon', description: 'Ideal para terminales Sunmi o Nexgo', color: 'green' as const },
];

const remoteApps = [
  { name: 'Android', icon: 'logos:android-icon', color: 'green' as const, href: PLAY_STORE_URL, storeLabel: 'Ver en Play Store' },
  { name: 'iOS', icon: 'logos:apple', color: 'gray' as const, href: APP_STORE_URL, storeLabel: 'Ver en App Store' },
];

export default function Platforms() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section id="platforms" className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Plataformas</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Instala Ejele en tu equipo principal (Windows, macOS o Terminal POS Android).
          </p>
        </div>

        {/* Sticker fila superior */}
        <div className="flex justify-center mb-4 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium">
            Donde vive tu base de datos y cobras
          </span>
        </div>

        {/* Equipo principal: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {mainPlatforms.map((platform, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg ${mainCardBg[platform.color]} reveal transition-all hover:scale-[1.02] text-center`}
            >
              <div className={`w-20 h-20 rounded-lg ${mainIconBg[platform.color]} flex items-center justify-center mb-6 mx-auto`}>
                <Icon icon={platform.icon} className={`${mainIconColors[platform.color]} w-12 h-12`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{platform.name}</h3>
              <p className="text-gray-300 text-sm mb-6">{platform.description}</p>
              <button
                onClick={() => setShowDialog(true)}
                className={`w-full ${mainButtonColors[platform.color]} text-white py-2 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer`}
              >
                <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                Descargar
              </button>
            </div>
          ))}
        </div>

        {/* Sticker fila inferior */}
        <div className="flex justify-center mb-4 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium">
            Extiende tu operación a todo el local
          </span>
        </div>

        {/* App remota: 2 cards más pequeñas y tono suave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {remoteApps.map((platform, index) => (
            <a
              key={index}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-lg ${remoteCardBg[platform.color]} reveal transition-all hover:scale-[1.02] text-center block no-underline border border-white/5 hover:border-white/10`}
            >
              <div className={`w-16 h-16 rounded-lg ${remoteIconBg[platform.color]} flex items-center justify-center mb-4 mx-auto`}>
                <Icon icon={platform.icon} className={`${remoteIconColors[platform.color]} w-10 h-10`} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">{platform.name}</h3>
              <p className="text-gray-400 text-sm mb-4 flex items-center justify-center gap-2 flex-wrap">
                <Icon icon="solar:users-group-two-rounded-bold-duotone" className="w-4 h-4 text-gray-500" aria-hidden />
                <span>meseros</span>
                <Icon icon="solar:chef-hat-bold-duotone" className="w-4 h-4 text-gray-500" aria-hidden />
                <span>pantalla en cocina</span>
              </p>
              <span className={`inline-flex items-center justify-center gap-2 w-full ${remoteButtonColors[platform.color]} text-white py-2 px-5 rounded-lg font-semibold text-sm`}>
                {platform.storeLabel}
              </span>
            </a>
          ))}
        </div>
      </div>

      <ComingSoonDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </section>
  );
}
