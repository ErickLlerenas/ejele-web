import { getSupabase } from '@/lib/supabase';
import type { FacturaQueryParams, InvoiceFromQrResponse } from './types';

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
