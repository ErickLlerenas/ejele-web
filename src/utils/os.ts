/** Asset names as published on GitHub Releases (must match release uploads). */
export const RELEASE_ASSETS = {
  android: "ejele-android.apk",
  macos: "ejele-macos.zip",
} as const;

/** Filenames used when saving the download. */
export const DOWNLOAD_FILENAMES: Record<keyof typeof RELEASE_ASSETS, string> = {
  android: "ejele-android.apk",
  macos: "ejele-macos.zip",
};

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
  android: string;
  macos: string;
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
    android: byName(RELEASE_ASSETS.android),
    macos: byName(RELEASE_ASSETS.macos),
  };
}

/** URL directa al asset (sin API). Útil como fallback si la API falla. */
export function getFallbackDownloadUrl(
  asset: keyof typeof RELEASE_ASSETS,
): string {
  const name = RELEASE_ASSETS[asset];
  return `https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/${name}`;
}

/** Para el botón principal: devuelve la URL según OS (Windows, Android, macOS; Unknown → null). */
export async function getMainDownloadUrl(): Promise<string | null> {
  const os = detectOS();
  if (os === "Unknown") return null;

  if (os === "Windows") {
    return "https://apps.microsoft.com/detail/9NSP89GKSFLN";
  }

  try {
    const urls = await fetchLatestReleaseUrls();
    if (os === "Android")
      return urls.android || getFallbackDownloadUrl("android");
    if (os === "macOS") return urls.macos || getFallbackDownloadUrl("macos");
    return null;
  } catch (e) {
    console.error("Error fetching latest release:", e);
    if (os === "Android") return getFallbackDownloadUrl("android");
    if (os === "macOS") return getFallbackDownloadUrl("macos");
    return null;
  }
}

export function getDownloadButtonText(os: OperatingSystem): string {
  switch (os) {
    case "macOS":
      return "Descargar para macOS";
    case "Windows":
      return "Descargar para Windows";
    case "Android":
      return "Descargar para Android";
    default:
      return "Descargar Ejele gratis";
  }
}
