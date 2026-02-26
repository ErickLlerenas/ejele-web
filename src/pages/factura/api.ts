import { FunctionsHttpError } from '@supabase/supabase-js';
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
    if (error instanceof FunctionsHttpError && error.context) {
      try {
        const body = await error.context.json();
        if (body && typeof body.error === 'string') message = body.error;
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
