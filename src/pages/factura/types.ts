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
  iva_rate: number;
}

export type InvoiceFromQrResponse = InvoiceStateInvoiced | InvoiceStateNotInvoiced;

/** Datos fiscales para facturapi-create-invoice (customer) */
export interface InvoiceCustomer {
  legal_name: string;
  tax_id: string;
  tax_system: string;
  email: string;
  address: { zip: string };
}

/** Un concepto/ítem para Facturapi (workaround: un solo ítem "Consumo de restaurante"). price con IVA incluido según tax_included. */
export interface InvoiceLineItem {
  quantity: number;
  product: {
    description: string;
    product_key: string;
    /** Clave unidad de medida SAT. E48 = kilogramo. */
    unit_key: string;
    price: number;
    /** Si true, price ya incluye IVA; si false, price es unitario sin IVA. */
    tax_included: boolean;
  };
}

/** Body para facturapi-create-invoice. items: un único ítem "Consumo de restaurante". iva_rate viene de facturapi-invoice-from-qr. */
export interface CreateInvoiceRequest {
  order_id: string;
  restaurant_id: string;
  total_cents: number;
  customer: InvoiceCustomer;
  items: InvoiceLineItem[];
  iva_rate: number;
  use: string;
  payment_form: string;
}

/** Respuesta esperada al crear factura (pdf/xml cuando el backend los devuelva) */
export interface CreateInvoiceResponse {
  pdf_url?: string;
  xml_url?: string;
  error?: string;
}
