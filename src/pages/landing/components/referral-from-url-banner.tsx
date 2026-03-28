import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  EJELE_PENDING_REFERRAL_STORAGE_KEY,
  normalizeReferralCode,
} from "@/constants/referral";

/**
 * Si la URL trae ?ref= o ?invite=, guarda el código, limpia la query y muestra un aviso
 * con enlace ejele:// para abrir la app de escritorio.
 */
export default function ReferralFromUrlBanner() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCode, setActiveCode] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("ref") ?? searchParams.get("invite");
    const code = normalizeReferralCode(raw);
    if (!code) return;

    localStorage.setItem(EJELE_PENDING_REFERRAL_STORAGE_KEY, code);
    setActiveCode(code);

    const next = new URLSearchParams(searchParams);
    next.delete("ref");
    next.delete("invite");
    const qs = next.toString();
    navigate({ search: qs ? `?${qs}` : "" }, { replace: true });
  }, [searchParams, navigate]);

  if (!activeCode) return null;

  const openInAppHref = `ejele://invite?code=${encodeURIComponent(activeCode)}`;

  return (
    <div className="border-b border-teal-500/40 bg-teal-950/90 text-teal-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm flex items-start gap-2">
          <Icon
            icon="solar:gift-bold-duotone"
            className="w-5 h-5 shrink-0 text-teal-300 mt-0.5"
            aria-hidden
          />
          <span>
            Invitación activa:{" "}
            <strong className="font-mono">{activeCode}</strong>. Al descargar,
            el código se copia al portapapeles para pegarlo al crear tu
            restaurante, o abre la app con el botón de la derecha.
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={openInAppHref}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 no-underline"
          >
            <Icon
              icon="solar:bolt-bold-duotone"
              className="w-4 h-4"
              aria-hidden
            />
            Abrir en Ejele
          </a>
          <button
            type="button"
            onClick={() => setActiveCode(null)}
            className="text-sm text-teal-200/90 hover:text-white px-2 py-1"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
