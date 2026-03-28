import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getSupabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

type ReferredRow = {
  restaurant_id: string;
  restaurant_name: string;
  created_at: string;
  subscription_status: string | null;
  owner_email: string | null;
  total_paid_mxn: number;
  your_commission_mxn: number;
};

type ReferralDashboard = {
  referral_code: string | null;
  referred: ReferredRow[];
  totals: { paid_mxn: number; commission_mxn: number };
};

const DATE_FMT = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const moneyFmt = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : DATE_FMT.format(d);
}

export default function ReferidosPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [dashboard, setDashboard] = useState<ReferralDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [authGateError, setAuthGateError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      void supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoadingAuth(false);
      });
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
      });
      return () => subscription.unsubscribe();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;
    let cancelled = false;
    void (async () => {
      setLoadingData(true);
      setError(null);
      try {
        const supabase = getSupabase();
        // Cuenta en Supabase: perfil alineado con Google (por si el trigger no corrió).
        const { error: profileErr } = await supabase.from("profiles").upsert(
          {
            id: session.user.id,
            email: session.user.email ?? "",
          },
          { onConflict: "id" },
        );
        if (profileErr) throw profileErr;

        const { data, error: rpcErr } = await supabase.rpc(
          "get_referral_dashboard",
        );
        if (rpcErr) throw rpcErr;
        if (!cancelled) {
          const raw = data as ReferralDashboard | null;
          setDashboard(
            raw
              ? {
                  referral_code: raw.referral_code ?? null,
                  referred: Array.isArray(raw.referred) ? raw.referred : [],
                  totals: raw.totals ?? {
                    paid_mxn: 0,
                    commission_mxn: 0,
                  },
                }
              : null,
          );
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : "No se pudo cargar el panel de referidos.",
          );
        }
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  useEffect(() => {
    if (loadingAuth || session) return;
    let cancelled = false;
    void (async () => {
      try {
        const supabase = getSupabase();
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/referidos` },
        });
        if (cancelled) return;
        if (error) setAuthGateError(error.message);
      } catch (e: unknown) {
        if (!cancelled) {
          setAuthGateError(e instanceof Error ? e.message : "Error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadingAuth, session]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setDashboard(null);
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.alert("No se pudo copiar. Copia el código manualmente.");
    }
  };

  const copyInviteLink = async (code: string) => {
    const url = `${window.location.origin}/?ref=${encodeURIComponent(code)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      window.alert("No se pudo copiar el enlace.");
    }
  };

  const pageBg =
    "relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 antialiased";

  if (loadingAuth) {
    return (
      <div className={`${pageBg} flex items-center justify-center p-6`}>
        <div className="absolute -top-32 left-1/2 h-64 w-[min(100vw,36rem)] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[100px]" />
        <div className="relative z-10 rounded-3xl border border-slate-700/80 bg-slate-900/90 px-10 py-12 shadow-xl shadow-slate-950/50">
          <div className="animate-spin rounded-full h-11 w-11 border-2 border-amber-400/30 border-t-amber-400 mx-auto" />
          <p className="mt-5 text-sm text-slate-400 text-center">Cargando…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <Helmet>
          <title>Referidos — Ejele</title>
        </Helmet>
        <div className={`${pageBg} flex flex-col items-center justify-center p-6 min-h-screen`}>
          <div className="absolute -top-32 left-1/2 h-64 w-[min(100vw,36rem)] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[100px]" />
          <div className="relative z-10 rounded-3xl border border-slate-700/80 bg-slate-900/90 px-10 py-12 shadow-xl shadow-slate-950/50 max-w-md w-full text-center">
            {authGateError ? (
              <>
                <p className="text-red-200/90 text-sm mb-6">{authGateError}</p>
                <Link
                  to="/programa-referidos"
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium no-underline"
                >
                  Volver al programa de referidos
                </Link>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-11 w-11 border-2 border-amber-400/30 border-t-amber-400 mx-auto" />
                <p className="mt-5 text-sm text-slate-400">
                  Abriendo inicio de sesión con Google…
                </p>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  const code = dashboard?.referral_code?.trim() || null;
  const referred = dashboard?.referred ?? [];
  const totals = dashboard?.totals ?? { paid_mxn: 0, commission_mxn: 0 };

  return (
    <>
      <Helmet>
        <title>Referidos — Ejele</title>
      </Helmet>
      <div className={`${pageBg}`}>
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100vw,42rem)] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[100px]"
          aria-hidden
        />

        <header className="sticky top-0 z-20 border-b border-slate-800/90 bg-slate-900/90 backdrop-blur-md">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-4 md:px-8 md:py-5">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-2.5 no-underline rounded-xl ring-offset-2 ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <img src="/favicon.ico" alt="" className="w-9 h-9 rounded-lg" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl font-black text-slate-50 tracking-tight flex flex-wrap items-center gap-2">
                  Referidos
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200/90">
                    Próximamente
                  </span>
                </h1>
                <p className="text-slate-500 text-xs truncate sm:max-w-md">
                  {session.user.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap shrink-0">
              <Link
                to="/"
                className="text-sm text-slate-200 hover:text-white py-2.5 px-4 rounded-xl border border-slate-600/80 bg-slate-800/60 hover:bg-slate-800 no-underline inline-flex items-center gap-2 transition-colors font-medium"
              >
                <Icon icon="lucide:home" className="w-4 h-4 opacity-80" />
                Inicio
              </Link>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="text-sm text-slate-200 hover:text-white py-2.5 px-4 rounded-xl border border-slate-600/80 bg-slate-800/60 hover:bg-slate-800 transition-colors font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pb-20 pt-6 md:pt-10 space-y-6">
          {/* Cómo funciona */}
          <div className="relative rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.08] via-slate-900/40 to-slate-900/80 p-6 md:p-8 overflow-hidden shadow-lg shadow-slate-950/30">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent"
              aria-hidden
            />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-400/30 text-amber-200">
                <Icon
                  icon="solar:wallet-money-bold-duotone"
                  className="w-7 h-7"
                />
              </div>
              <div className="space-y-3">
                <h2 className="font-bold text-amber-50 text-lg md:text-xl tracking-tight">
                  Cómo funciona
                </h2>
                <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed">
                  Si entran con{" "}
                  <strong className="text-slate-50 font-semibold">
                    tu código
                  </strong>{" "}
                  y adquieren un{" "}
                  <strong className="text-slate-50 font-semibold">
                    plan Premium
                  </strong>{" "}
                  de Ejele, recibes{" "}
                  <strong className="text-amber-200 font-semibold">
                    comisión
                  </strong>{" "}
                  sobre esos pagos. Abajo está el detalle.
                </p>
              </div>
            </div>
          </div>

          {/* Código */}
          <div className="rounded-2xl border border-slate-700/90 bg-slate-900/70 p-6 md:p-7 shadow-md shadow-slate-950/20">
            <div className="flex items-center gap-2 mb-4">
              <Icon
                icon="solar:key-square-bold-duotone"
                className="w-6 h-6 text-sky-400 shrink-0"
              />
              <div>
                <h2 className="text-base font-bold text-slate-50">
                  Tu código
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Para quien registre un restaurante nuevo
                </p>
              </div>
            </div>
            {loadingData && !dashboard ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-9 w-9 border-2 border-blue-400/30 border-t-blue-400" />
              </div>
            ) : code ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-800/80 border border-slate-600/60 px-4 py-3">
                  <code className="text-lg sm:text-xl font-mono font-bold text-amber-300 tracking-[0.08em] break-all">
                    {code}
                  </code>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void copyInviteLink(code)}
                    className="inline-flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-5 py-3 transition-colors shadow-md shadow-amber-950/25"
                  >
                    <Icon
                      icon={
                        copiedLink
                          ? "solar:check-circle-bold"
                          : "solar:link-bold"
                      }
                      className="w-5 h-5"
                    />
                    {copiedLink ? "Enlace copiado" : "Copiar enlace de invitación"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void copyCode(code)}
                    className="inline-flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-bold text-sm px-5 py-3 transition-colors"
                  >
                    <Icon
                      icon={
                        copied ? "solar:check-circle-bold" : "solar:copy-bold"
                      }
                      className="w-5 h-5"
                    />
                    {copied ? "Código copiado" : "Solo copiar código"}
                  </button>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Comparte el <strong className="text-slate-400">enlace</strong>
                  : quien lo abra en el celular podrá instalar Ejele y el código se
                  aplicará al crear el restaurante (sin tener que escribirlo).
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-600/70 bg-slate-800/40 px-5 py-8 text-center">
                <Icon
                  icon="solar:shop-2-bold-duotone"
                  className="w-10 h-10 text-slate-500 mx-auto mb-3"
                />
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Crea un restaurante en la app con esta cuenta para obtener tu
                  código.
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-5 md:p-6 flex gap-4 shadow-sm shadow-slate-950/20">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 border border-slate-600/50">
                <Icon
                  icon="solar:card-transfer-bold-duotone"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">
                  Pagos (referidos)
                </p>
                <p className="text-2xl md:text-3xl font-black text-slate-50 tabular-nums">
                  {moneyFmt.format(Number(totals.paid_mxn) || 0)}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.12] to-slate-900/70 p-5 md:p-6 flex gap-4 shadow-md shadow-amber-950/15">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-200 border border-amber-400/25">
                <Icon
                  icon="solar:hand-money-bold-duotone"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <p className="text-amber-100/95 text-[11px] font-bold uppercase tracking-widest mb-1">
                  Tu parte
                </p>
                <p className="text-2xl md:text-3xl font-black text-amber-200 tabular-nums">
                  {moneyFmt.format(Number(totals.commission_mxn) || 0)}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div
              className="rounded-2xl border border-red-500/35 bg-red-950/35 p-5 md:p-6 flex gap-4"
              role="alert"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-300">
                <Icon
                  icon="solar:danger-triangle-bold-duotone"
                  className="w-6 h-6"
                />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-red-100 text-sm md:text-base">
                  No se pudo cargar
                </p>
                <p className="text-red-200/90 text-sm mt-2 leading-relaxed">
                  Recarga la página o vuelve en un rato. Si sigue igual,
                  escríbenos por la app o al soporte de Ejele.
                </p>
              </div>
            </div>
          )}

          {/* Tabla */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/50 overflow-hidden shadow-sm shadow-slate-950/20">
            <div className="p-6 md:px-8 md:py-6 border-b border-slate-700/80 bg-slate-900/80">
              <div className="flex items-start gap-3">
                <Icon
                  icon="solar:users-group-rounded-bold-duotone"
                  className="w-7 h-7 text-sky-400 shrink-0 mt-0.5"
                />
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-50">
                    Tus referidos
                  </h2>
                  <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                    Registros con tu código.
                  </p>
                </div>
              </div>
            </div>
            {loadingData ? (
              <div className="p-14 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-400/30 border-t-blue-400" />
              </div>
            ) : referred.length === 0 ? (
              <div className="px-6 py-14 text-center bg-slate-900/30">
                <Icon
                  icon="solar:inbox-line-bold-duotone"
                  className="w-12 h-12 text-slate-600 mx-auto mb-4"
                />
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Nadie aún. Aparecen aquí al usar tu código.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[720px]">
                  <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Restaurante</th>
                      <th className="px-6 py-4 font-semibold">Dueño</th>
                      <th className="px-6 py-4 font-semibold">Plan</th>
                      <th className="px-6 py-4 font-semibold">Alta</th>
                      <th className="px-6 py-4 font-semibold text-right">
                        Pagos
                      </th>
                      <th className="px-6 py-4 font-semibold text-right">
                        Tu parte
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/90">
                    {referred.map((r) => (
                      <tr
                        key={r.restaurant_id}
                        className="hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-100">
                          {r.restaurant_name}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs break-all max-w-[140px]">
                          {r.owner_email ?? "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {r.subscription_status || "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap text-xs">
                          {formatDate(r.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-200 whitespace-nowrap tabular-nums">
                          {moneyFmt.format(Number(r.total_paid_mxn) || 0)}
                        </td>
                        <td className="px-6 py-4 text-right text-amber-200 font-semibold whitespace-nowrap tabular-nums">
                          {moneyFmt.format(Number(r.your_commission_mxn) || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
