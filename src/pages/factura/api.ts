import { getSupabase } from '@/lib/supabase';
import type {
  FacturaQueryParams,
  InvoiceFromQrResponse,
  CreateInvoiceRequest,
  CreateInvoiceResponse,
} from './types';

export async function getInvoiceFromQr(
  params: FacturaQueryParams
): Promise<InvoiceFromQrResponse> {
  const { data, error } = await getSupabase().functions.invoke<InvoiceFromQrResponse>(
    'facturapi-invoice-from-qr',
    {
      body: {
        orderId: params.orderId,
        restaurant_id: params.restaurant_id,
        total: params.total,
        ts: params.ts,
        sig: params.sig,
      },
    }
  );

  if (error) {
    let message = error.message;
    const err = error as { context?: { json?: () => Promise<unknown> } };
    if (err.context?.json) {
      try {
        const body = (await err.context.json()) as { error?: string };
        if (body?.error) message = body.error;
      } catch {
        // usar message por defecto
      }
    }
    throw new Error(message);
  }
  if (!data) throw new Error('Sin respuesta del servidor');
  if (typeof data === 'object' && 'error' in data && data.error)
    throw new Error(String(data.error));

  return data as InvoiceFromQrResponse;
}

export async function createInvoice(
  body: CreateInvoiceRequest
): Promise<CreateInvoiceResponse> {
  const { data, error } = await getSupabase().functions.invoke<CreateInvoiceResponse>(
    'facturapi-create-invoice',
    { body }
  );

  if (error) {
    let message = error.message;
    const err = error as { context?: { json?: () => Promise<unknown> } };
    if (err.context?.json) {
      try {
        const res = (await err.context.json()) as { error?: string };
        if (res?.error) message = res.error;
      } catch {
        // usar message por defecto
      }
    }
    throw new Error(message);
  }
  if (typeof data === 'object' && data?.error) throw new Error(data.error);
  return (data ?? {}) as CreateInvoiceResponse;
}
