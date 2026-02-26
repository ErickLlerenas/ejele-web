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
  | { status: "error"; message: string }
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
  const [loadingDownload, setLoadingDownload] = useState<"pdf" | "xml" | null>(null);
  const snackbarTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    if (view.status !== "idle") return;
    if (!params) {
      setView({ status: "missing_params" });
      return;
    }
    setView({ status: "loading" });
    getInvoiceFromQr(params)
      .then((data) => setView({ status: "ready", data }))
      .catch((err) =>
        setView({
          status: "error",
          message: err instanceof Error ? err.message : "Error desconocido",
        }),
      );
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
    };
  }, []);

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
        const msg =
          err instanceof Error ? err.message : "Error al generar la factura";
        setCreatingWithData(null);
        if (prevData) {
          setView({ status: "ready", data: prevData });
          setSnackbarError(msg);
          if (snackbarTimeout.current) clearTimeout(snackbarTimeout.current);
          snackbarTimeout.current = setTimeout(
            () => setSnackbarError(null),
            5000,
          );
        } else {
          setView({ status: "error", message: msg });
        }
      });
  };

  return (
    <div className="landing-premium min-h-screen">
      <Helmet title="Factura - Ejele" />
      <Header minimal />
      <section className="pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-xl mx-auto text-center">
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
              <>
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:link-circle-bold-duotone"
                        className="w-12 h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Enlace inválido
                </h1>
                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Abre esta página escaneando el código QR de tu ticket de
                  cuenta.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </>
            )}

            {view.status === "loading" && (
              <div className="flex flex-col items-center gap-4 py-12">
                <Icon
                  icon="solar:refresh-circle-bold"
                  className="w-12 h-12 text-blue-500 animate-spin"
                />
                <p className="text-gray-400">Validando enlace...</p>
              </div>
            )}

            {view.status === "error" && (
              <>
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:link-circle-bold-duotone"
                        className="w-12 h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  {view.message.toLowerCase().includes("inválido") ||
                  view.message.toLowerCase().includes("modificado")
                    ? "Enlace inválido"
                    : "Algo salió mal"}
                </h1>
                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  {view.message.toLowerCase().includes("inválido") ||
                  view.message.toLowerCase().includes("modificado")
                    ? "El enlace del ticket no es válido o fue modificado. Escanea de nuevo el QR de tu ticket."
                    : view.message}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                  Volver al inicio
                </Link>
              </>
            )}

            {view.status === "ready" && view.data.already_invoiced && (
              <>
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="w-12 h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Cuenta facturada
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  La factura de esta cuenta ya fue generada. Puedes descargar el
                  PDF y el XML (CFDI) a continuación.
                </p>

                <div className="glass-card rounded-2xl p-6 mb-8 text-left">
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
                          onClick={() => handleDownload((view.data as InvoiceStateInvoiced).pdf_url!, "pdf")}
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
                          {loadingDownload === "pdf" ? "Descargando…" : "Descargar PDF"}
                        </button>
                      )}
                      {view.data.xml_url && (
                        <button
                          type="button"
                          onClick={() => handleDownload((view.data as InvoiceStateInvoiced).xml_url!, "xml")}
                          disabled={loadingDownload !== null}
                          className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex-1 min-w-[200px] max-w-[280px] disabled:opacity-70 disabled:pointer-events-none"
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
                          {loadingDownload === "xml" ? "Descargando…" : "Descargar XML (CFDI)"}
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

                <div className="flex justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
                  >
                    <Icon icon="solar:home-bold-duotone" className="w-5 h-5" />
                    Volver al inicio
                  </Link>
                </div>
              </>
            )}

            {view.status === "ready" &&
              !view.data.already_invoiced &&
              view.data.invoice_credits <= 0 && (
                <>
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full" />
                      <div className="relative w-20 h-20 bg-amber-600/80 rounded-full flex items-center justify-center">
                        <Icon
                          icon="solar:wallet-money-bold-duotone"
                          className="w-12 h-12 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    Facturación no disponible
                  </h1>
                  <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                    Este restaurante no tiene créditos de facturación
                    disponibles en este momento.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors no-underline"
                  >
                    <Icon icon="solar:home-bold-duotone" className="w-6 h-6" />
                    Volver al inicio
                  </Link>
                </>
              )}

            {view.status === "created" && (
              <>
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon
                        icon="solar:check-circle-bold-duotone"
                        className="w-12 h-12 text-white"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Factura generada
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Tu factura ha sido enviada por correo.
                </p>
                <div className="flex flex-wrap gap-3 justify-center items-stretch">
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
                      {loadingDownload === "pdf" ? "Descargando…" : "Descargar PDF"}
                    </button>
                  )}
                  {view.xml_url && (
                    <button
                      type="button"
                      onClick={() => handleDownload(view.xml_url!, "xml")}
                      disabled={loadingDownload !== null}
                      className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex-1 min-w-[200px] max-w-[280px] disabled:opacity-70 disabled:pointer-events-none"
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
                      {loadingDownload === "xml" ? "Descargando…" : "Descargar XML (CFDI)"}
                    </button>
                  )}
                  {!view.pdf_url && !view.xml_url && (
                    <p className="text-gray-500 text-sm">
                      Tu factura fue registrada. Los enlaces de descarga estarán
                      disponibles en breve.
                    </p>
                  )}
                </div>
                <div className="flex justify-center mt-8">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
                  >
                    <Icon icon="solar:home-bold-duotone" className="w-5 h-5" />
                    Volver al inicio
                  </Link>
                </div>
              </>
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
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />
                        <div className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                          <Icon
                            icon="solar:document-text-bold-duotone"
                            className="w-12 h-12 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      Solicitar factura
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
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
                    />
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
    </div>
  );
}
