export type OperatingSystem = 'macOS' | 'Windows' | 'Linux' | 'Unknown';

export function detectOS(): OperatingSystem {
  if (typeof window === 'undefined') {
    return 'Unknown';
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  if (platform.includes('mac') || userAgent.includes('mac os x')) {
    return 'macOS';
  }

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'Windows';
  }

  return 'Unknown';
}

export function getDownloadUrl(os: OperatingSystem): string {
  switch (os) {
    case 'macOS':
      return 'https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/Ejele-arm64.dmg';
    case 'Windows':
      return 'https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/Ejele.exe';
    default:
      return 'https://github.com/ErickLlerenas/ejele-releases/releases/latest/download/Ejele.exe';
  }
}

export async function fetchLatestDownloadUrl(os: OperatingSystem): Promise<string> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/ErickLlerenas/ejele-releases/releases/latest'
    );
    const data = await response.json();
    const assets = data.assets || [];

    let asset;
    if (os === 'macOS') {
      asset = assets.find((a: any) => a.name.endsWith('.dmg') && a.name.includes('arm64'));
    } else if (os === 'Windows') {
      asset = assets.find((a: any) => a.name.endsWith('.exe') && a.name.includes('Setup'));
    }

    if (asset) {
      return asset.browser_download_url;
    }
  } catch (error) {
    console.error('Error fetching latest release:', error);
  }

  return getDownloadUrl(os);
}

export function getDownloadButtonText(os: OperatingSystem): string {
  switch (os) {
    case 'macOS':
      return 'Descargar para Mac';
    case 'Windows':
      return 'Descargar para Windows';
    default:
      return 'Descargar';
  }
}
