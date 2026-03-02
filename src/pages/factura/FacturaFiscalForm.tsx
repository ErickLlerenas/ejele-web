import { useState, FormEvent, useEffect } from "react";
import { Icon } from "@iconify/react";
import type { CreateInvoiceRequest, InvoiceCustomer } from "./types";
import {
  REGIMEN_FISCAL_FISICA,
  REGIMEN_FISCAL_MORAL,
  USO_CFDI_OPTIONS,
  FORMA_PAGO_OPTIONS,
  INVOICE_ITEM_DESCRIPTION,
  INVOICE_ITEM_PRODUCT_KEY,
  INVOICE_ITEM_UNIT_KEY,
} from "./constants";

interface FacturaFiscalFormProps {
  order_id: string;
  restaurant_id: string;
  total_cents: number;
  totalFormatted: string;
  iva_rate: number;
  onSubmit: (payload: CreateInvoiceRequest) => void;
  loading?: boolean;
  onRegimenStripped?: () => void;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors";
const labelClass =
  "flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5";
const labelIconClass = "w-4 h-4 text-gray-400 shrink-0";

/** Quita sufijos de régimen societario (S.A. de C.V., S. de R.L., etc.) del final del nombre/razón social. */
function stripRegimenCapital(name: string): string {
  let result = name.trim();
  const suffixes = [
    /\s*,\s*S\.A\.\s*de\s*C\.V\.?\s*$/i,
    /\s*,\s*S\.\s*de\s*R\.L\.\s*(de\s*C\.V\.)?\s*$/i,
    /\s+S\.A\.\s*de\s*C\.V\.?\s*$/i,
    /\s+S\.\s*de\s*R\.L\.\s*(de\s*C\.V\.)?\s*$/i,
    /\s+A\.C\.?\s*$/i,
    /\s+S\.A\.P\.I\.\s*de\s*C\.V\.?\s*$/i,
  ];
  let changed = true;
  while (changed) {
    changed = false;
    for (const re of suffixes) {
      if (re.test(result)) {
        result = result.replace(re, "").trim();
        changed = true;
        break;
      }
    }
  }
  return result;
}

export default function FacturaFiscalForm({
  order_id,
  restaurant_id,
  total_cents,
  totalFormatted,
  iva_rate,
  onSubmit,
  loading = false,
  onRegimenStripped,
}: FacturaFiscalFormProps) {
  const [legal_name, setLegalName] = useState("");
  const [tax_id, setTaxId] = useState("");
  const [tax_system, setTaxSystem] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [use, setUse] = useState("G03");
  const [payment_form, setPaymentForm] = useState("");

  const regimenOptions =
    tax_id.length === 13
      ? REGIMEN_FISCAL_FISICA
      : tax_id.length === 12
        ? REGIMEN_FISCAL_MORAL
        : [];

  useEffect(() => {
    if (tax_id.length !== 12 && tax_id.length !== 13) {
      setLegalName("");
      setTaxSystem("");
    }
  }, [tax_id.length]);

  // Si el RFC pasa a 12 (persona moral), quitar S.A. de C.V. etc. del nombre ya escrito
  useEffect(() => {
    if (tax_id.length === 12 && legal_name.trim()) {
      const stripped = stripRegimenCapital(legal_name.trim()).toUpperCase();
      if (stripped !== legal_name.trim()) {
        setLegalName(stripped);
        onRegimenStripped?.();
      }
    }
  }, [tax_id.length]);

  useEffect(() => {
    if (tax_id.length === 12 && tax_system) {
      if (!REGIMEN_FISCAL_MORAL.some((o) => o.value === tax_system))
        setTaxSystem("");
    } else if (tax_id.length === 13 && tax_system) {
      if (!REGIMEN_FISCAL_FISICA.some((o) => o.value === tax_system))
        setTaxSystem("");
    }
  }, [tax_id.length, tax_system]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tax_id.length !== 12 && tax_id.length !== 13) return;
    if (
      !legal_name.trim() ||
      !tax_id.trim() ||
      !tax_system ||
      !use ||
      !payment_form ||
      !zip.trim() ||
      !email.trim()
    )
      return;
    const rawName = legal_name.trim();
    const customer: InvoiceCustomer = {
      legal_name: tax_id.length === 12 ? stripRegimenCapital(rawName) : rawName,
      tax_id: tax_id.trim().toUpperCase(),
      tax_system,
      email: email.trim(),
      address: { zip: zip.trim().replace(/\D/g, "").slice(0, 10) },
    };
    const totalMxn = total_cents / 100;
    const payload: CreateInvoiceRequest = {
      order_id,
      restaurant_id,
      total_cents,
      customer,
      items: [
        {
          quantity: 1,
          product: {
            description: INVOICE_ITEM_DESCRIPTION,
            product_key: INVOICE_ITEM_PRODUCT_KEY,
            unit_key: INVOICE_ITEM_UNIT_KEY,
            price: totalMxn,
            tax_included: true, // El total del ticket ya trae IVA incluido
          },
        },
      ],
      iva_rate,
      use,
      payment_form,
    };
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-left space-y-4 max-w-md mx-auto md:max-w-lg md:space-y-5"
    >
      <div className="flex items-baseline justify-between gap-4 mb-5 md:mb-6 pb-4 border-b border-white/10">
        <span className="text-gray-400 text-sm">Total a facturar</span>
        <span className="text-xl md:text-2xl font-bold text-white tabular-nums">{totalFormatted}</span>
      </div>

      <div>
        <label className={labelClass}>
          <Icon icon="solar:document-bold-duotone" className={labelIconClass} />
          RFC *
        </label>
        <div className="factura-input-wrap flex items-center gap-2 w-full rounded-xl border border-white/20 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden transition-colors">
          <input
            type="text"
            value={tax_id}
            onChange={(e) =>
              setTaxId(e.target.value.toUpperCase().slice(0, 13))
            }
            placeholder="XAXX010101000"
            className="flex-1 min-w-0 px-4 py-3 bg-transparent border-0 text-white placeholder-gray-400 outline-none focus:ring-0"
            required
            maxLength={13}
          />
          {tax_id.length === 13 && (
            <span className="shrink-0 mr-2 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/30 flex items-center gap-1.5">
              <Icon icon="solar:user-bold-duotone" className="w-3.5 h-3.5" />
              Persona física
            </span>
          )}
          {tax_id.length === 12 && (
            <span className="shrink-0 mr-2 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-medium border border-blue-500/30 flex items-center gap-1.5">
              <Icon
                icon="solar:buildings-2-bold-duotone"
                className="w-3.5 h-3.5"
              />
              Persona moral
            </span>
          )}
        </div>
      </div>

      {(tax_id.length === 12 || tax_id.length === 13) && (
        <>
          <div>
            <label className={labelClass}>
              <Icon icon="solar:user-bold-duotone" className={labelIconClass} />
              {tax_id.length === 13
                ? "Nombre fiscal *"
                : "Razón social *"}
            </label>
            <input
              type="text"
              value={legal_name}
              onChange={(e) => setLegalName(e.target.value.toUpperCase())}
              onBlur={() => {
                if (tax_id.length === 12 && legal_name.trim()) {
                  const stripped = stripRegimenCapital(legal_name.trim()).toUpperCase();
                  if (stripped !== legal_name.trim()) {
                    setLegalName(stripped);
                    onRegimenStripped?.();
                  }
                }
              }}
              placeholder={
                tax_id.length === 13
                  ? "JUAN PÉREZ GARCÍA"
                  : "EMPRESA DE SOFTWARE"
              }
              className={inputClass}
              required
            />
            {tax_id.length === 12 && (
              <p className="mt-1.5 text-xs text-gray-500">
                Sin régimen capital (S.A. de C.V., S. de R.L., etc.).
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              <Icon icon="solar:document-text-bold-duotone" className={labelIconClass} />
              Régimen fiscal *
            </label>
            <select
              value={tax_system}
              onChange={(e) => setTaxSystem(e.target.value)}
              className={inputClass}
              required
              disabled={regimenOptions.length === 0}
            >
              <option value="">
                {regimenOptions.length === 0 ? "—" : "Selecciona tu régimen"}
              </option>
              {regimenOptions.map((o) => (
                <option
                  key={o.value}
                  value={o.value}
                  className="bg-gray-900 text-white"
                >
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label className={labelClass}>
          <Icon icon="solar:bill-list-bold-duotone" className={labelIconClass} />
          Uso del CFDI *
        </label>
        <select
          value={use}
          onChange={(e) => setUse(e.target.value)}
          className={inputClass}
          required
        >
          {USO_CFDI_OPTIONS.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-gray-900 text-white"
            >
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          <Icon icon="solar:wallet-money-bold-duotone" className={labelIconClass} />
          Forma de pago *
        </label>
        <select
          value={payment_form}
          onChange={(e) => setPaymentForm(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">Selecciona forma de pago</option>
          {FORMA_PAGO_OPTIONS.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-gray-900 text-white"
            >
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          <Icon icon="solar:letter-bold-duotone" className={labelIconClass} />
          Correo electrónico *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          className={inputClass}
          required
        />
        <p className="mt-1.5 text-xs text-gray-500">
          A ese correo se enviará la factura.
        </p>
      </div>

      <div>
        <label className={labelClass}>
          <Icon icon="solar:map-point-bold-duotone" className={labelIconClass} />
          Código postal *
        </label>
        <input
          type="text"
          value={zip}
          onChange={(e) =>
            setZip(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="12345"
          className={inputClass}
          required
          minLength={5}
          maxLength={10}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-all duration-200 md:mt-8 md:py-4 md:text-lg"
      >
        {loading ? (
          <>
            <Icon
              icon="solar:refresh-circle-bold"
              className="w-5 h-5 animate-spin"
            />
            Generando factura...
          </>
        ) : (
          <>
            <Icon icon="solar:document-text-bold-duotone" className="w-5 h-5" />
            Generar factura
          </>
        )}
      </button>
    </form>
  );
}
