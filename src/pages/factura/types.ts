/** Query params from QR URL */
export interface FacturaQueryParams {
  orderId: string;
  restaurant_id: string;
  total: string;
  ts: string;
  sig: string;
}

/** facturapi-invoice-from-qr: cuenta ya facturada */
export interface InvoiceStateInvoiced {
  already_invoiced: true;
  pdf_url?: string;
  xml_url?: string;
  created_at?: string;
}

/** facturapi-invoice-from-qr: aún no facturada, puede solicitar si hay créditos */
export interface InvoiceStateNotInvoiced {
  already_invoiced: false;
  restaurant_id: string;
  order_id: string;
  total_cents: number;
  invoice_credits: number;
}

export type InvoiceFromQrResponse = InvoiceStateInvoiced | InvoiceStateNotInvoiced;
