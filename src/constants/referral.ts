/** Misma regla que en la app: letras, números y guion bajo. */
const CODE_RE = /^[A-Z0-9_]+$/i;

export const EJELE_PENDING_REFERRAL_STORAGE_KEY = "ejele_pending_referral_code";

export function normalizeReferralCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = raw.trim().toUpperCase();
  if (t.length < 4 || t.length > 48) return null;
  if (!CODE_RE.test(t)) return null;
  return t;
}

export function copyPendingReferralToClipboard(): void {
  try {
    const code = localStorage.getItem(EJELE_PENDING_REFERRAL_STORAGE_KEY);
    if (!code) return;
    void navigator.clipboard.writeText(code);
  } catch {
    /* sin permiso o sin código */
  }
}
