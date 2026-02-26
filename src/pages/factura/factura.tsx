import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import Header from "@/pages/landing/components/header";
import { getInvoiceFromQr } from "./api";
import type { FacturaQueryParams, InvoiceFromQrResponse } from "./types";

function getParams(search: URLSearchParams): FacturaQueryParams | null {
  const orderId = search.get("orderId");
  const restaurant_id = search.get("restaurant_id");
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
  | { status: "ready"; data: InvoiceFromQrResponse };

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
  const params = getParams(searchParams);

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
                  Esta cuenta ya fue facturada
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  La factura de esta cuenta ya fue generada. Puedes descargar el
                  PDF y el XML (CFDI) a continuación.
                </p>

                <div className="glass-card rounded-2xl p-6 mb-8 text-left">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Información de la factura
                  </h2>
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
                    <div className="flex flex-wrap gap-4 pt-2">
                      {view.data.pdf_url && (
                        <a
                          href={view.data.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white no-underline"
                        >
                          <Icon
                            icon="solar:document-text-bold-duotone"
                            className="w-5 h-5"
                          />
                          Descargar PDF
                        </a>
                      )}
                      {view.data.xml_url && (
                        <a
                          href={view.data.xml_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 no-underline"
                        >
                          <Icon
                            icon="solar:code-file-bold-duotone"
                            className="w-5 h-5"
                          />
                          Descargar XML (CFDI)
                        </a>
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
                  className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
                >
                  <Icon icon="solar:home-bold-duotone" className="w-5 h-5" />
                  Volver al inicio
                </Link>
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

            {view.status === "ready" &&
              !view.data.already_invoiced &&
              view.data.invoice_credits > 0 && (
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
                    Esta cuenta aún no tiene factura. El restaurante tiene
                    créditos disponibles; aquí podrás solicitar tu factura
                    (formulario próximamente).
                  </p>
                  <div className="glass-card rounded-2xl p-6 text-left">
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Datos de la cuenta
                    </h2>
                    <dl className="space-y-2 text-white">
                      <div>
                        <dt className="text-gray-500 text-sm">Orden</dt>
                        <dd className="font-mono text-sm break-all">
                          {view.data.order_id}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-sm">Total</dt>
                        <dd className="font-medium">
                          {new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN",
                          }).format(view.data.total_cents / 100)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500 text-sm">
                          Créditos del restaurante
                        </dt>
                        <dd className="font-medium">
                          {view.data.invoice_credits}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 mt-8 text-gray-400 hover:text-white transition-colors no-underline"
                  >
                    <Icon icon="solar:home-bold-duotone" className="w-5 h-5" />
                    Volver al inicio
                  </Link>
                </>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
