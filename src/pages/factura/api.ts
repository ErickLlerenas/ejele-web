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

  const backendMessage =
    typeof data === 'object' && data && 'error' in data && data.error
      ? String(data.error)
      : null;
  if (error) throw new Error(backendMessage || error.message || 'Error al validar el enlace');
  if (!data) throw new Error('Sin respuesta del servidor');
  if (backendMessage) throw new Error(backendMessage);

  return data as InvoiceFromQrResponse;
}
