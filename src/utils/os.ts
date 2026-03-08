/** Nombres de assets en GitHub Releases (ErickLlerenas/ejele-releases). */
export const RELEASE_ASSETS = {
  windowsX64: "ejele-windows-x64.zip",
  windowsArm64: "ejele-windows-arm64.zip",
  android: "ejele-android.apk",
} as const;

export type OperatingSystem = "macOS" | "Windows" | "Android" | "Unknown";

export function detectOS(): OperatingSystem {
  if (typeof window === "undefined") return "Unknown";

  const ua = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() ?? "";

  if (ua.includes("android")) return "Android";
  if (platform.includes("mac") || ua.includes("mac os x")) return "macOS";
  if (platform.includes("win") || ua.includes("windows")) return "Windows";

  return "Unknown";
}

const GITHUB_RELEASES_API =
  "https://api.github.com/repos/ErickLlerenas/ejele-releases/releases/latest";

export type ReleaseUrls = {
  windowsX64: string;
  windowsArm64: string;
  android: string;
};

/** Obtiene las URLs de descarga de la última release (una sola llamada a la API). */
export async function fetchLatestReleaseUrls(): Promise<ReleaseUrls> {
  const res = await fetch(GITHUB_RELEASES_API);
  const data = await res.json();
  const assets: Array<{ name: string; browser_download_url: string }> =
    data?.assets ?? [];

  const byName = (name: string) =>
    assets.find((a) => a.name === name)?.browser_download_url ?? "";

  return {
    windowsX64: byName(RELEASE_ASSETS.windowsX64),
    windowsArm64: byName(RELEASE_ASSETS.windowsArm64),
    android: byName(RELEASE_ASSETS.android),
  };
}

/** URL directa al asset (sin API). Útil como fallback si la API falla. */
export function getFallbackDownloadUrl(asset: keyof typeof RELEASE_ASSETS): string {
  const name = RELEASE_ASSETS[asset];
  return `https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/${name}`;
}

/** Para el botón principal: devuelve la URL según OS (solo Windows y Android; Mac/Unknown → null). */
export async function getMainDownloadUrl(): Promise<string | null> {
  const os = detectOS();
  if (os !== "Windows" && os !== "Android") return null;

  try {
    const urls = await fetchLatestReleaseUrls();
    if (os === "Windows") return urls.windowsX64 || getFallbackDownloadUrl("windowsX64");
    return urls.android || getFallbackDownloadUrl("android");
  } catch (e) {
    console.error("Error fetching latest release:", e);
    if (os === "Windows") return getFallbackDownloadUrl("windowsX64");
    return getFallbackDownloadUrl("android");
  }
}

export function getDownloadButtonText(os: OperatingSystem): string {
  switch (os) {
    case "macOS":
      return "Próximamente";
    case "Windows":
      return "Descargar para Windows";
    case "Android":
      return "Descargar para Android";
    default:
      return "Descargar Ejele gratis";
  }
}
