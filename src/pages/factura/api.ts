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
    let title = error.message;
    let message = error.message;
    const err = error as { context?: { json?: () => Promise<unknown> } };
    if (err.context?.json) {
      try {
        const body = (await err.context.json()) as { error?: string; message?: string };
        if (body?.error) title = body.error;
        if (body?.message != null) message = body.message;
      } catch {
        // usar message por defecto
      }
    }
    throw { title, message };
  }
  if (!data) throw { title: 'Error', message: 'Sin respuesta del servidor' };
  if (typeof data === 'object' && 'error' in data && data.error) {
    const d = data as { error: string; message?: string };
    throw { title: String(d.error), message: d.message != null ? String(d.message) : String(d.error) };
  }

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
    let title = error.message;
    let message = error.message;
    const err = error as { context?: { json?: () => Promise<unknown> } };
    if (err.context?.json) {
      try {
        const res = (await err.context.json()) as { error?: string; message?: string };
        if (res?.error) title = res.error;
        if (res?.message != null) message = res.message;
      } catch {
        // usar message por defecto
      }
    }
    throw { title, message };
  }
  if (typeof data === 'object' && data?.error) {
    const d = data as { error: string; message?: string };
    throw { title: d.error, message: d.message != null ? d.message : d.error };
  }
  return (data ?? {}) as CreateInvoiceResponse;
}
