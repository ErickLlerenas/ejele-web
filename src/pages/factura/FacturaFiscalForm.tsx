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
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";
const labelClass = "block text-sm font-medium text-gray-300 mb-1";

export default function FacturaFiscalForm({
  order_id,
  restaurant_id,
  total_cents,
  totalFormatted,
  iva_rate,
  onSubmit,
  loading = false,
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
    const customer: InvoiceCustomer = {
      legal_name: legal_name.trim(),
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
      className="text-left space-y-4 max-w-md mx-auto"
    >
      <p className="text-gray-400 text-sm mb-4">
        Total a facturar:{" "}
        <span className="text-white font-semibold">{totalFormatted}</span>
      </p>

      <div>
        <label className={labelClass}>RFC *</label>
        <div className="flex items-center gap-2 w-full rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden">
          <input
            type="text"
            value={tax_id}
            onChange={(e) =>
              setTaxId(e.target.value.toUpperCase().slice(0, 13))
            }
            placeholder="XAXX010101000"
            className="flex-1 min-w-0 px-4 py-3 bg-transparent border-0 text-white placeholder-gray-500 outline-none focus:ring-0"
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

      <div>
        <label className={labelClass}>
          {tax_id.length === 13
            ? "Nombre fiscal *"
            : tax_id.length === 12
              ? "Razón social *"
              : "Nombre o razón social *"}
        </label>
        <input
          type="text"
          value={legal_name}
          onChange={(e) => setLegalName(e.target.value.toUpperCase())}
          placeholder={
            tax_id.length === 13
              ? "JUAN PÉREZ GARCÍA"
              : tax_id.length === 12
                ? "EMPRESA DE SOFTWARE"
                : "Nombre o razón social"
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
        <label className={labelClass}>Régimen fiscal *</label>
        <select
          value={tax_system}
          onChange={(e) => setTaxSystem(e.target.value)}
          className={inputClass}
          required
          disabled={regimenOptions.length === 0}
        >
          <option value="">
            {regimenOptions.length === 0
              ? "Ingresa un RFC de 12 o 13 caracteres"
              : "Selecciona régimen fiscal"}
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

      <div>
        <label className={labelClass}>Uso del CFDI *</label>
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
        <label className={labelClass}>Forma de pago *</label>
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
        <label className={labelClass}>Correo electrónico *</label>
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
        <label className={labelClass}>Código postal *</label>
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
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-colors"
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
