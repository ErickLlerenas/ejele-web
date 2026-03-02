import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import Header from "@/pages/landing/components/header";
import { getInvoiceFromQr, createInvoice } from "./api";
import type {
  FacturaQueryParams,
  InvoiceFromQrResponse,
  CreateInvoiceRequest,
  InvoiceStateInvoiced,
  InvoiceStateNotInvoiced,
} from "./types";
import FacturaFiscalForm from "./FacturaFiscalForm";

function getParams(search: URLSearchParams): FacturaQueryParams | null {
  const orderId = search.get("orderId") ?? search.get("orderid");
  const restaurant_id =
    search.get("restaurant_id") ?? search.get("restaurantid");
  const total = search.get("total");
  const ts = search.get("ts");
  const sig = search.get("sig");
  if (!orderId || !restaurant_id || !total || !ts || !sig) return null;
  return { orderId, restaurant_id, total, ts, sig };
}

type ViewState =
  | { status: "idle" }
  | { status: "missing_params" }
  | { status: "loading" }
  | { status: "error"; title: string; message: string }
  | { status: "ready"; data: InvoiceFromQrResponse }
  | { status: "creating" }
  | { status: "created"; pdf_url?: string; xml_url?: string };

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function FacturaPage() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<ViewState>({ status: "idle" });
  const [creatingWithData, setCreatingWithData] =
    useState<InvoiceStateNotInvoiced | null>(null);
  const [snackbarError, setSnackbarError] = useState<string | null>(null);
  const [snackbarWarning, setSnackbarWarning] = useState<string | null>(null);
  const [loadingDownload, setLoadingDownload] = useState<"pdf" | "xml" | null>(
    null,
  );
  const snackbarTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snackbarWarningTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const params = getParams(searchParams);

  const handleDownload = async (url: string, type: "pdf" | "xml") => {
    setLoadingDownload(type);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al obtener el archivo");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = type === "pdf" ? "factura.pdf" : "factura.xml";
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank");
    } finally {
      setLoadingDownload(null);
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;
    const prevBodyMinHeight = body.style.minHeight;
    const prevRootMinHeight = root?.style.minHeight ?? "";
    html.style.backgroundColor = "#0a0f1a";
    body.style.backgroundColor = "#0a0f1a";
    body.style.minHeight = "auto";
    if (root) root.style.minHeight = "auto";
    return () => {
      html.style.backgroundColor = prevHtmlBg;
      body.style.backgroundColor = prevBodyBg;
      body.style.minHeight = prevBodyMinHeight;
      if (root) root.style.minHeight = prevRootMinHeight;
    };
  }, []);

  useEffect(() => {
    if (view.status !== "idle") return;
    if (!params) {
      setView({ status: "missing_params" });
      return;
    }
    setView({ status: "loading" });
    getInvoiceFromQr(params)
      .then((data) => setView({ status: "ready", data }))
      .catch((err) => {
        const title =
          err && typeof err === "object" && "title" in err
            ? String((err as { title: string }).title)
            : err instanceof Error
              ? err.message
              : "Error desconocido";
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message: string }).message)
            : title;
        setView({ status: "error", title, message });
      });
  }, [
    params?.orderId,
    params?.restaurant_id,
    params?.total,
    params?.ts,
    params?.sig,
  ]);

  useEffect(() => {
    return () => {
      if (snackbarTimeout.current) clearTimeout(snackbarTimeout.current);
      if (snackbarWarningTimeout.current)
        clearTimeout(snackbarWarningTimeout.current);
    };
  }, []);

  const showRegimenStrippedSnackbar = () => {
    setSnackbarWarning("shown");
    if (snackbarWarningTimeout.current)
      clearTimeout(snackbarWarningTimeout.current);
    snackbarWarningTimeout.current = setTimeout(() => {
      setSnackbarWarning(null);
      snackbarWarningTimeout.current = null;
    }, 7500);
  };

  const handleCreateInvoice = (payload: CreateInvoiceRequest) => {
    const prevData: InvoiceStateNotInvoiced | null =
      view.status === "ready" && !view.data.already_invoiced ? view.data : null;
    if (prevData) setCreatingWithData(prevData);
    setView({ status: "creating" });
    setSnackbarError(null);
    createInvoice(payload)
      .then((res) => {
        setCreatingWithData(null);
        setView({
          status: "created",
          pdf_url: res.pdf_url,
          xml_url: res.xml_url,
        });
      })
      .catch((err) => {
        const title =
          err && typeof err === "object" && "title" in err
            ? String((err as { title: string }).title)
            : err instanceof Error
              ? err.message
              : "Error al generar la factura";
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message: string }).message)
            : title;
        setCreatingWithData(null);
        if (prevData) {
          setView({ status: "ready", data: prevData });
          setSnackbarError(message);
          if (snackbarTimeout.current) clearTimeout(snackbarTimeout.current);
          snackbarTimeout.current = setTimeout(
            () => setSnackbarError(null),
            5000,
          );
        } else {
          setView({ status: "error", title, message });
        }
      });
  };

  return (
    <div className="landing-premium factura-page flex flex-col">
      <Helmet title="Factura - Ejele" />
      <div className="hidden md:block">
        <Header minimal />
      </div>
      <section className="pt-24 pb-20 px-4 sm:px-6 md:pt-28 md:pb-24 md:px-8 flex flex-col items-center justify-center">
        <div className="max-w-xl mx-auto text-center w-full md:max-w-2xl">
          <div className="reveal active">
            {view.status === "idle" && (
              <div className="flex justify-center py-12">
                <Icon
                  icon="solar:refresh-circle-bold"
                  className="w-12 h-12 text-gray-500 animate-spin"
                />
              </div>
            )}

            {view.status === "missing_params" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center">
                <div className="mb-6 flex justify-center md:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:link-circle-bold-duotone"
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                  Enlace inválido
                </h1>
                <p className="text-gray-400 text-base mb-8 leading-relaxed sm:text-lg md:mb-10">
                  Abre esta página escaneando el código QR de tu ticket de
                  cuenta.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 text-white transition-all duration-200 no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </div>
            )}

            {view.status === "loading" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center flex flex-col items-center gap-4 py-12">
                <Icon
                  icon="solar:refresh-circle-bold"
                  className="w-12 h-12 text-blue-500 animate-spin"
                />
                <p className="text-gray-400">Validando enlace...</p>
              </div>
            )}

            {view.status === "error" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center">
                <div className="mb-6 flex justify-center md:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:link-circle-bold-duotone"
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                  {view.title}
                </h1>
                <p className="text-gray-400 text-base mb-8 leading-relaxed sm:text-lg md:mb-10">
                  {view.message}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 text-white transition-all duration-200 no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </div>
            )}

            {view.status === "ready" && view.data.already_invoiced && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center">
                <div className="mb-6 flex justify-center md:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                  Cuenta facturada
                </h1>
                <p className="text-gray-400 text-base mb-6 leading-relaxed sm:text-lg md:mb-8">
                  La factura de esta cuenta ya fue generada. Puedes descargar el
                  PDF y el XML (CFDI) a continuación.
                </p>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-8 text-left">
                  <dl className="space-y-2 text-white">
                    {view.data.created_at && (
                      <div>
                        <dt className="text-gray-500 text-sm">
                          Fecha de emisión
                        </dt>
                        <dd className="font-medium">
                          {formatDate(view.data.created_at)}
                        </dd>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3 pt-2 items-stretch justify-center">
                      {view.data.pdf_url && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              (view.data as InvoiceStateInvoiced).pdf_url!,
                              "pdf",
                            )
                          }
                          disabled={loadingDownload !== null}
                          className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:pointer-events-none text-white flex-1 min-w-[200px] max-w-[280px]"
                        >
                          {loadingDownload === "pdf" ? (
                            <Icon
                              icon="solar:refresh-circle-bold"
                              className="w-5 h-5 shrink-0 animate-spin"
                            />
                          ) : (
                            <Icon
                              icon="solar:document-text-bold-duotone"
                              className="w-5 h-5 shrink-0"
                            />
                          )}
                          {loadingDownload === "pdf"
                            ? "Descargando…"
                            : "Descargar PDF"}
                        </button>
                      )}
                      {view.data.xml_url && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              (view.data as InvoiceStateInvoiced).xml_url!,
                              "xml",
                            )
                          }
                          disabled={loadingDownload !== null}
                          className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 disabled:opacity-70 disabled:pointer-events-none flex-1 min-w-[200px] max-w-[280px]"
                        >
                          {loadingDownload === "xml" ? (
                            <Icon
                              icon="solar:refresh-circle-bold"
                              className="w-5 h-5 shrink-0 animate-spin"
                            />
                          ) : (
                            <Icon
                              icon="solar:code-file-bold-duotone"
                              className="w-5 h-5 shrink-0"
                            />
                          )}
                          {loadingDownload === "xml"
                            ? "Descargando…"
                            : "Descargar XML (CFDI)"}
                        </button>
                      )}
                    </div>
                    {!view.data.pdf_url && !view.data.xml_url && (
                      <p className="text-gray-500 text-sm pt-2">
                        Los enlaces de descarga no están disponibles aún.
                      </p>
                    )}
                  </dl>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 text-white transition-all duration-200 no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </div>
            )}

            {view.status === "ready" &&
              !view.data.already_invoiced &&
              view.data.invoice_credits <= 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center">
                  <div className="mb-6 flex justify-center md:mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                        <Icon
                          icon="solar:wallet-money-bold-duotone"
                          className="w-10 h-10 md:w-12 md:h-12 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                    Facturación no disponible
                  </h1>
                  <p className="text-gray-400 text-base mb-8 leading-relaxed sm:text-lg md:mb-10">
                    Este restaurante no tiene créditos de facturación
                    disponibles en este momento.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 text-white transition-all duration-200 no-underline"
                  >
                    <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                    Volver al inicio
                  </Link>
                </div>
              )}

            {view.status === "created" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-center">
                <div className="mb-6 flex justify-center md:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full" />
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                  Factura generada
                </h1>
                <p className="text-gray-400 text-base mb-6 leading-relaxed sm:text-lg md:mb-8">
                  Tu factura ha sido enviada por correo.
                </p>
                <div className="flex flex-wrap gap-3 justify-center items-stretch mb-8">
                  {view.pdf_url && (
                    <button
                      type="button"
                      onClick={() => handleDownload(view.pdf_url!, "pdf")}
                      disabled={loadingDownload !== null}
                      className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:pointer-events-none text-white flex-1 min-w-[200px] max-w-[280px]"
                    >
                      {loadingDownload === "pdf" ? (
                        <Icon
                          icon="solar:refresh-circle-bold"
                          className="w-5 h-5 shrink-0 animate-spin"
                        />
                      ) : (
                        <Icon
                          icon="solar:document-text-bold-duotone"
                          className="w-5 h-5 shrink-0"
                        />
                      )}
                      {loadingDownload === "pdf"
                        ? "Descargando…"
                        : "Descargar PDF"}
                    </button>
                  )}
                  {view.xml_url && (
                    <button
                      type="button"
                      onClick={() => handleDownload(view.xml_url!, "xml")}
                      disabled={loadingDownload !== null}
                      className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 disabled:opacity-70 disabled:pointer-events-none flex-1 min-w-[200px] max-w-[280px]"
                    >
                      {loadingDownload === "xml" ? (
                        <Icon
                          icon="solar:refresh-circle-bold"
                          className="w-5 h-5 shrink-0 animate-spin"
                        />
                      ) : (
                        <Icon
                          icon="solar:code-file-bold-duotone"
                          className="w-5 h-5 shrink-0"
                        />
                      )}
                      {loadingDownload === "xml"
                        ? "Descargando…"
                        : "Descargar XML (CFDI)"}
                    </button>
                  )}
                  {!view.pdf_url && !view.xml_url && (
                    <p className="text-gray-500 text-sm w-full">
                      Tu factura fue registrada. Los enlaces de descarga estarán
                      disponibles en breve.
                    </p>
                  )}
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 text-white transition-all duration-200 no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </div>
            )}

            {((view.status === "ready" &&
              !view.data.already_invoiced &&
              view.data.invoice_credits > 0) ||
              (view.status === "creating" && creatingWithData)) &&
              (() => {
                const formData: InvoiceStateNotInvoiced =
                  view.status === "ready"
                    ? (view.data as InvoiceStateNotInvoiced)
                    : creatingWithData!;
                return (
                  <>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto">
                      <div className="mb-6 flex justify-center md:mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />
                          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center">
                            <Icon
                              icon="solar:document-text-bold-duotone"
                              className="w-10 h-10 md:w-12 md:h-12 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <h1 className="text-3xl font-black text-white mb-2 tracking-tight sm:text-4xl md:text-5xl md:mb-3">
                        Solicitar factura
                      </h1>
                      <p className="text-gray-400 text-base mb-6 leading-relaxed sm:text-lg md:mb-8">
                        Completa tus datos fiscales para generar tu factura.
                      </p>
                      <FacturaFiscalForm
                        order_id={formData.order_id}
                        restaurant_id={formData.restaurant_id}
                        total_cents={formData.total_cents}
                        totalFormatted={new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        }).format(formData.total_cents / 100)}
                        iva_rate={formData.iva_rate}
                        onSubmit={handleCreateInvoice}
                        loading={view.status === "creating"}
                        onRegimenStripped={showRegimenStrippedSnackbar}
                      />
                    </div>
                  </>
                );
              })()}
          </div>
        </div>
      </section>

      {snackbarError && (
        <div
          role="alert"
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/95 text-white border border-red-500/50 shadow-lg z-[1100]"
        >
          <p className="flex-1 text-sm">{snackbarError}</p>
          <button
            type="button"
            onClick={() => {
              if (snackbarTimeout.current)
                clearTimeout(snackbarTimeout.current);
              setSnackbarError(null);
            }}
            className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cerrar"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>
      )}

      {snackbarWarning && (
        <div
          role="status"
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md flex items-start gap-4 p-4 rounded-2xl bg-amber-900 border border-amber-600 shadow-xl z-[1100]"
        >
          <div className="shrink-0 w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center">
            <Icon
              icon="solar:info-circle-bold-duotone"
              className="w-5 h-5 text-amber-200"
            />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-semibold text-amber-100 mb-0.5">
              Razón social actualizada
            </p>
            <p className="text-sm text-amber-200/90 leading-relaxed">
              El SAT pide la razón social sin el régimen societario (S.A. de
              C.V., S. de R.L., etc.). Se quitó automáticamente para que tu
              factura sea válida.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (snackbarWarningTimeout.current)
                clearTimeout(snackbarWarningTimeout.current);
              setSnackbarWarning(null);
            }}
            className="shrink-0 p-1.5 rounded-lg text-amber-300 hover:text-amber-100 hover:bg-amber-800 transition-colors"
            aria-label="Cerrar"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
