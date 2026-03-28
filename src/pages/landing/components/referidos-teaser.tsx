import { useState } from "react";
import { Icon } from "@iconify/react";
import { getSupabase } from "@/lib/supabase";

export default function ReferidosTeaser() {
  const [busy, setBusy] = useState(false);

  const signInWithGoogle = async () => {
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/referidos`,
        },
      });
      if (error) window.alert(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden border-t border-white/10 bg-black">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[min(110vw,48rem)] -translate-x-1/2 rounded-full bg-amber-400/14 blur-[88px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-amber-300/8 blur-[70px]"
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-slate-500/35 bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-800/85 p-8 md:p-12 shadow-xl shadow-slate-950/30 ring-1 ring-white/10">
          {/* Viñeta clara arriba del card */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-3xl"
            aria-hidden
          />

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-300/35 mb-6 mx-auto shadow-md shadow-amber-900/15">
              <Icon
                icon="solar:gift-bold-duotone"
                className="w-8 h-8 text-amber-300"
              />
            </div>
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="text-amber-300/95 text-xs font-bold uppercase tracking-[0.2em]">
                Referidos
              </span>
              <span className="inline-flex items-center justify-center rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-50/95">
                Próximamente
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-50 tracking-tight mb-4">
              Refiere y gana
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
              Gana el 30% de la primera compra de cada restaurante premium que
              recomiendes.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void signInWithGoogle()}
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-400 disabled:opacity-60 disabled:pointer-events-none text-slate-900 font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-amber-950/25"
            >
              <Icon icon="logos:google-icon" className="w-5 h-5" />
              {busy ? "Conectando…" : "Comenzar"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
