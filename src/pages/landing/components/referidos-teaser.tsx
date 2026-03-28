import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { getSupabase } from "@/lib/supabase";

const MONTHLY_PLAN_MXN = 299;
const ANNUAL_PLAN_MXN = 2999;
const LIFETIME_PLAN_MXN = 5999;
const COMMISSION = 0.3;

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const MAX_RESTAURANTS = 1000;

/** Solo dígitos, máx. 4 (hasta 1000). */
function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

/** Valor numérico para el cálculo: vacío → 0 mientras escribes; 0 válido. */
function countFromRaw(raw: string): number {
  if (raw === "") return 0;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return 0;
  return Math.min(MAX_RESTAURANTS, Math.max(0, n));
}

/** Al salir del campo: vacío → 15; clamp 0–1000. */
function normalizeCountOnBlur(raw: string) {
  if (raw === "") return "15";
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return "15";
  return String(Math.min(MAX_RESTAURANTS, Math.max(0, n)));
}

type PlanRow = {
  id: string;
  label: string;
  hint: string;
  amount: number;
  suffix: string;
  barClass: string;
};

export default function ReferidosTeaser() {
  const [busy, setBusy] = useState(false);
  const [rawCount, setRawCount] = useState("15");
  const count = countFromRaw(rawCount);

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

  const rows = useMemo<PlanRow[]>(() => {
    const perMonthEachPeriod = count * MONTHLY_PLAN_MXN * COMMISSION;
    const perYearEachPeriod = count * ANNUAL_PLAN_MXN * COMMISSION;
    const lifetimeOnce = count * LIFETIME_PLAN_MXN * COMMISSION;

    return [
      {
        id: "monthly",
        label: "Plan mensual",
        hint: "30% cada mes que el restaurante pague su suscripción",
        amount: perMonthEachPeriod,
        suffix: "/ mes",
        barClass:
          "bg-gradient-to-r from-emerald-400/90 to-teal-500/85 shadow-[0_0_20px_-4px_rgba(52,211,153,0.45)]",
      },
      {
        id: "annual",
        label: "Plan anual",
        hint: "30% cada año que renueven ($2,999/año)",
        amount: perYearEachPeriod,
        suffix: "/ año",
        barClass:
          "bg-gradient-to-r from-teal-400/90 to-cyan-500/80 shadow-[0_0_20px_-4px_rgba(45,212,191,0.35)]",
      },
      {
        id: "lifetime",
        label: "De por vida",
        hint: "30% del pago único de $5,999",
        amount: lifetimeOnce,
        suffix: " una vez",
        barClass:
          "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_24px_-4px_rgba(251,191,36,0.45)]",
      },
    ];
  }, [count]);

  const maxBar = Math.max(...rows.map((r) => r.amount), 0.01);

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
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-3xl"
            aria-hidden
          />

          <div className="max-w-3xl mx-auto">
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

            <div
              className="mt-10 md:mt-12 pt-10 border-t border-white/10"
              aria-labelledby="referidos-calc-heading"
            >
              <h3
                id="referidos-calc-heading"
                className="text-xl md:text-2xl font-black text-slate-50 tracking-tight text-center mb-2"
              >
                Simula lo que podrías ganar
              </h3>
              <p className="text-slate-400 text-sm md:text-[15px] text-center leading-relaxed mb-8 max-w-xl mx-auto">
                Comisión del{" "}
                <span className="text-amber-300/95 font-semibold">30%</span>{" "}
                sobre el pago del plan Premium, mientras el restaurante siga
                pagando (mensual o anual). Plan de por vida: comisión sobre el
                pago único.
              </p>

              <div className="max-w-md mx-auto mb-10">
                <label htmlFor="referidos-rest-count" className="sr-only">
                  Cantidad de restaurantes referidos
                </label>
                <input
                  id="referidos-rest-count"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  spellCheck={false}
                  value={rawCount}
                  onChange={(e) => setRawCount(digitsOnly(e.target.value))}
                  onBlur={() => setRawCount(normalizeCountOnBlur(rawCount))}
                  className="w-full rounded-full border border-amber-400/35 bg-slate-950/80 px-6 py-3.5 text-center text-lg font-bold text-slate-50 tabular-nums outline-none focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/25"
                />
              </div>

              <div className="space-y-6 md:space-y-7">
                {rows.map((row) => {
                  const pct = Math.min(100, (row.amount / maxBar) * 100);
                  return (
                    <div
                      key={row.id}
                      className="flex flex-col gap-2 sm:grid sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-slate-100 text-sm font-bold leading-tight">
                          {row.label}
                        </p>
                        <p className="text-slate-500 text-[11px] leading-snug mt-0.5">
                          {row.hint}
                        </p>
                      </div>
                      <div className="min-w-0 flex flex-col gap-2">
                        <div
                          className="relative h-11 rounded-full bg-slate-900/90 border border-slate-600/50 overflow-hidden"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, transparent, transparent calc(20% - 1px), rgba(255,255,255,0.05) calc(20% - 1px), rgba(255,255,255,0.05) 20%)",
                          }}
                        >
                          <div
                            className={`h-full rounded-full transition-[width] duration-500 ease-out ${row.barClass}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex flex-wrap items-baseline justify-end gap-2">
                          <span className="text-slate-50 font-black text-lg tabular-nums">
                            {money.format(row.amount)}
                          </span>
                          <span className="text-slate-500 text-xs font-medium">
                            {row.suffix}
                          </span>
                          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-300">
                            30%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-slate-500 text-[11px] text-center mt-10 leading-relaxed max-w-lg mx-auto">
                Precios de referencia: mensual $
                {MONTHLY_PLAN_MXN.toLocaleString("es-MX")}/mes, anual $
                {ANNUAL_PLAN_MXN.toLocaleString("es-MX")}/año, de por vida $
                {LIFETIME_PLAN_MXN.toLocaleString("es-MX")} pago único.
                Simulación ilustrativa; condiciones reales según contrato y
                políticas vigentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
