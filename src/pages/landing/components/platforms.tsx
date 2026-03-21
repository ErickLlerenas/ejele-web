import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  APP_STORE_COMING_SOON,
  APP_STORE_URL,
  PLAY_STORE_COMING_SOON,
  PLAY_STORE_URL,
} from "@/constants/store";
import {
  DOWNLOAD_FILENAMES,
  fetchLatestReleaseUrls,
  getFallbackDownloadUrl,
} from "@/utils/os";

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const mainCardBg = {
  blue: "bg-blue-900",
  slate: "bg-slate-800",
  green: "bg-green-900",
};

const mainIconBg = {
  blue: "bg-blue-800",
  slate: "bg-slate-700",
  green: "bg-green-800",
};

const mainIconColors = {
  blue: "text-blue-300",
  slate: "text-slate-300",
  green: "text-green-300",
};

const mainButtonColors = {
  blue: "bg-blue-600 hover:bg-blue-500",
  slate: "bg-slate-600 hover:bg-slate-500",
  green: "bg-green-600 hover:bg-green-500",
};

// Paleta del logo (teal/cyan): distintas de arriba (blue, slate, green) y hacen match con Ejele
const remoteCardBg = {
  green: "bg-teal-900/80",
  blue: "bg-cyan-900/80",
};

const remoteIconBg = {
  green: "bg-teal-800/90",
  blue: "bg-cyan-800/90",
};

const remoteIconColors = {
  green: "text-teal-300",
  blue: "text-cyan-300",
};

const remoteButtonColors = {
  green: "bg-teal-600 hover:bg-teal-500",
  blue: "bg-cyan-600 hover:bg-cyan-500",
};

type MainPlatformKey = "windows" | "macos" | "android";

const mainPlatforms: Array<{
  key: MainPlatformKey;
  name: string;
  icon: string;
  description: string;
  color: "blue" | "slate" | "green";
}> = [
  {
    key: "windows",
    name: "Windows",
    icon: "logos:microsoft-windows",
    description: "Compatible con ",
    color: "blue",
  },
  {
    key: "macos",
    name: "macOS",
    icon: "logos:apple",
    description: "Diseñado para Apple Silicon.",
    color: "slate",
  },
  {
    key: "android",
    name: "Android",
    icon: "logos:android-icon",
    description: "Para terminales como Sunmi o Nexgo.",
    color: "green",
  },
];

const remoteApps = [
  {
    name: "Play Store",
    icon: "logos:google-play-icon",
    color: "green" as const,
    href: PLAY_STORE_URL,
    storeLabel: "Ver en Play Store",
    deviceLabel: "Celulares y tablets",
  },
  {
    name: "App Store",
    icon: "logos:apple-app-store",
    color: "blue" as const,
    href: APP_STORE_URL,
    storeLabel: "Ver en App Store",
    deviceLabel: "iPhone y iPads",
  },
];

export default function Platforms() {
  const [loading, setLoading] = useState<
    "windows-x64" | "windows-arm" | "android" | "macos" | null
  >(null);
  const [windowsVariant, setWindowsVariant] = useState<"x64" | "arm">("x64");

  const handleWindowsDownload = async () => {
    await handleWindowsDownloadVariant(windowsVariant);
  };

  const handleWindowsDownloadVariant = async (variant: "x64" | "arm") => {
    setLoading(variant === "x64" ? "windows-x64" : "windows-arm");
    try {
      const urls = await fetchLatestReleaseUrls();
      const url = variant === "x64" ? urls.windowsX64 : urls.windowsArm64;
      const fallback = getFallbackDownloadUrl(
        variant === "x64" ? "windowsX64" : "windowsArm64",
      );
      const key = variant === "x64" ? "windowsX64" : "windowsArm64";
      triggerDownload(url || fallback, DOWNLOAD_FILENAMES[key]);
    } finally {
      setLoading(null);
    }
  };

  const handleAndroidDownload = async () => {
    setLoading("android");
    try {
      const urls = await fetchLatestReleaseUrls();
      const url = urls.android || getFallbackDownloadUrl("android");
      triggerDownload(url, DOWNLOAD_FILENAMES.android);
    } finally {
      setLoading(null);
    }
  };

  const handleMacOsDownload = async () => {
    setLoading("macos");
    try {
      const urls = await fetchLatestReleaseUrls();
      const url = urls.macos || getFallbackDownloadUrl("macos");
      triggerDownload(url, DOWNLOAD_FILENAMES.macos);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="platforms" className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Plataformas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descarga e instala Ejele en tu equipo principal.
          </p>
        </div>

        {/* Equipo principal: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {mainPlatforms.map((platform) => (
            <div
              key={platform.key}
              className={`p-8 rounded-lg ${mainCardBg[platform.color]} reveal transition-all hover:scale-[1.02] text-center`}
            >
              <div
                className={`w-20 h-20 rounded-lg ${mainIconBg[platform.color]} flex items-center justify-center mb-6 mx-auto`}
              >
                <Icon
                  icon={platform.icon}
                  className={`${mainIconColors[platform.color]} w-12 h-12`}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {platform.name}
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                {platform.description}
              </p>
              {platform.key === "windows" && (
                <div className="relative w-full flex rounded-xl overflow-hidden shadow-lg shadow-blue-900/30">
                  <button
                    type="button"
                    onClick={handleWindowsDownload}
                    disabled={loading !== null}
                    className={`flex-1 ${mainButtonColors[platform.color]} text-white py-3 px-5 rounded-l-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 min-w-0`}
                  >
                    <Icon
                      icon="solar:download-bold-duotone"
                      className="w-5 h-5 shrink-0 opacity-95"
                    />
                    <span className="truncate">
                      {loading === "windows-x64" || loading === "windows-arm"
                        ? "Descargando…"
                        : "Descargar"}
                    </span>
                  </button>
                  <div className="relative flex items-stretch border-l border-white/20 bg-white/10 rounded-r-xl min-w-[5rem]">
                    <select
                      value={windowsVariant}
                      onChange={(e) =>
                        setWindowsVariant(e.target.value as "x64" | "arm")
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="appearance-none bg-transparent text-white text-xs font-semibold cursor-pointer pl-3 pr-8 py-3 focus:outline-none focus:ring-0 [&>option]:bg-slate-800 [&>option]:text-white"
                      aria-label="Arquitectura Windows"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.8)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundSize: "1rem",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.5rem center",
                      }}
                    >
                      <option value="x64">x64</option>
                      <option value="arm">ARM</option>
                    </select>
                  </div>
                </div>
              )}
              {platform.key === "macos" && (
                <button
                  onClick={handleMacOsDownload}
                  disabled={loading !== null}
                  className={`w-full ${mainButtonColors[platform.color]} text-white py-3 px-5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-lg ${platform.color === "slate" ? "shadow-slate-900/30" : "shadow-blue-900/30"}`}
                >
                  <Icon
                    icon="solar:download-bold-duotone"
                    className="w-5 h-5 shrink-0"
                  />
                  {loading === "macos" ? "Descargando…" : "Descargar"}
                </button>
              )}
              {platform.key === "android" && (
                <button
                  onClick={handleAndroidDownload}
                  disabled={loading !== null}
                  className={`w-full ${mainButtonColors[platform.color]} text-white py-3 px-5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-lg shadow-green-900/30`}
                >
                  <Icon
                    icon="solar:download-bold-duotone"
                    className="w-5 h-5 shrink-0"
                  />
                  {loading === "android" ? "Descargando…" : "Descargar"}
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-300 text-lg mb-6 reveal">
          Aplicación para meseros y cocina
        </p>

        {/* App remota: 2 cards más pequeñas y tono suave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {remoteApps.map((platform, index) => {
            const isAppStore = platform.name === "App Store";
            const isPlayStore = platform.name === "Play Store";
            const comingSoon =
              (isPlayStore && PLAY_STORE_COMING_SOON) ||
              (isAppStore && APP_STORE_COMING_SOON);
            const Wrapper = comingSoon ? "div" : "a";
            const linkProps =
              Wrapper === "a"
                ? {
                    href: platform.href,
                    target: "_blank" as const,
                    rel: "noopener noreferrer" as const,
                  }
                : {};
            return (
              <Wrapper
                key={index}
                {...linkProps}
                className={`relative p-6 rounded-lg ${remoteCardBg[platform.color]} reveal transition-all text-center w-full border border-white/5 ${comingSoon ? "opacity-95" : "hover:scale-[1.02] hover:border-white/10 cursor-pointer"}`}
              >
                <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Premium
                </div>
                <div
                  className={`w-16 h-16 rounded-lg ${remoteIconBg[platform.color]} flex items-center justify-center mb-4 mx-auto`}
                >
                  <Icon
                    icon={platform.icon}
                    className={`${remoteIconColors[platform.color]} w-10 h-10`}
                  />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">
                  {platform.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3">
                  {platform.deviceLabel}
                </p>
                <p className="text-gray-400 text-sm mb-4 flex items-center justify-center gap-2 flex-wrap">
                  <Icon
                    icon="solar:users-group-two-rounded-bold-duotone"
                    className="w-4 h-4 text-gray-500"
                    aria-hidden
                  />
                  <span>meseros</span>
                  <Icon
                    icon="solar:chef-hat-bold-duotone"
                    className="w-4 h-4 text-gray-500"
                    aria-hidden
                  />
                  <span>pantalla en cocina</span>
                </p>
                <span
                  className={`inline-flex items-center justify-center gap-2 w-full ${remoteButtonColors[platform.color]} text-white py-2 px-5 rounded-lg font-semibold text-sm ${comingSoon ? "opacity-90" : ""}`}
                >
                  {comingSoon ? "Próximamente" : platform.storeLabel}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
