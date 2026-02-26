# Página de factura (React) – Integración con el QR del ticket

Este documento explica cómo debe funcionar la web en **https://www.ejele.app/factura** usando los datos del QR del ticket de cuenta y cómo interactuar con Supabase para generar la factura sin permitir que se alteren los datos.

---

## 1. Origen de los datos: URL del QR

El cliente escanea el QR del ticket de cuenta. La URL tiene este formato:

```
https://www.ejele.app/factura?orderId=UUID&restaurant_id=UUID&total=12345&ts=1739...&sig=BASE64URL
```

| Parámetro      | Descripción |
|----------------|-------------|
| `orderId`      | ID de la orden (app Flutter). |
| `restaurant_id`| ID del restaurante en Supabase (para validar firma y generar factura). |
| `total`        | Total en centavos (ej. 12345 = $123.45). |
| `ts`           | Timestamp Unix (segundos UTC) de cuándo se imprimió el ticket. |
| `sig`          | Firma HMAC-SHA256 del payload, en Base64URL (sin `=`). |

**Payload firmado** (orden exacto, sin `sig`):

```
orderId=<orderId>&restaurant_id=<restaurant_id>&total=<total>&ts=<ts>
```

La app Flutter firma ese string con el campo `restaurants.invoice_secret` del restaurante. Cualquier cambio en la URL invalida la firma.

---

## 2. Validar la firma en el backend (Edge Function)

No se debe confiar en `orderId`, `restaurant_id` ni `total` hasta validar la firma en una **Edge Function** (no en el cliente).

1. Leer de la query: `orderId`, `restaurant_id`, `total`, `ts`, `sig`.
2. Opcional: rechazar si `ts` es muy viejo (ej. > 48 h).
3. Obtener el secreto del restaurante:
   - `SELECT invoice_secret FROM restaurants WHERE id = $restaurant_id`.
   - Si no hay fila o `invoice_secret` es null, responder error (ej. 404 o 400).
4. Construir el payload en el **mismo orden**:
   - `payload = "orderId=" + orderId + "&restaurant_id=" + restaurant_id + "&total=" + total + "&ts=" + ts`
5. Calcular la firma esperada:
   - HMAC-SHA256 con clave = `invoice_secret`, mensaje = `payload` (UTF-8).
   - Codificar el digest en Base64URL y quitar padding `=`.
6. Comparar `sig` con la firma calculada (comparación constante en tiempo). Si no coinciden, responder 400 (ej. "Enlace inválido o modificado").

Solo después de validar la firma se pueden usar `orderId`, `restaurant_id` y `total` para generar o recuperar la factura.

---

## 3. Evitar facturar dos veces: tabla `invoices`

Conviene tener una tabla **`invoices`** en Supabase para registrar que una orden ya fue facturada y no volver a timbrar.

- **Campos útiles:** `id`, `restaurant_id`, `order_id` (el `orderId` del QR), `facturapi_id`, `pdf_url`, `xml_url` (CFDI), `created_at`, etc.
- **Cómo saber si ya se generó la factura:** la fuente de verdad es **si existe una fila** en `invoices` con ese `(restaurant_id, order_id)`. No se debe inferir por “si viene URL” ni por otro campo: si hay fila → ya facturada; si no hay fila → no facturada. Las URLs (`pdf_url`, `xml_url`) son datos que se guardan al timbrar y pueden estar null un tiempo; no definen por sí solas si la factura existe.
- **Lógica en la Edge Function:**
  1. Tras validar la firma, hacer `SELECT ... FROM invoices WHERE restaurant_id = $1 AND order_id = $2`.
  2. Si la query devuelve una fila → **already_invoiced: true**. Responder con esa fila (incluir `pdf_url`, `xml_url` si existen) y no llamar de nuevo a Facturapi.
  3. Si no devuelve filas → **already_invoiced: false**. Continuar con el flujo de creación (datos fiscales, ítems, `facturapi-create-invoice`), al éxito insertar en `invoices` y devolver la factura/PDF/XML.

Así se evita duplicar facturas aunque el cliente escanee varias veces o comparta el link.

---

## 4. Edge Functions a usar (dos en total)

| Función | Cuándo la llama React | Qué hace |
|--------|------------------------|----------|
| **`facturapi-invoice-from-qr`** | Al cargar la página con los params del QR. | Valida la firma, consulta la tabla `invoices`, responde si la cuenta ya está facturada o si puede pedir factura y cuántos créditos hay. **No** llama a Facturapi. |
| **`facturapi-create-invoice`** | Cuando el cliente envía el formulario (RFC, nombre fiscal, etc.). | Llama a la API de Facturapi y timbra la factura. (Puede extenderse para insertar en `invoices` y devolver `pdf_url` / `xml_url`.) |

Ambas viven en este repo: `supabase/functions/facturapi-invoice-from-qr` y `supabase/functions/facturapi-create-invoice`.

---

## 5. Flujo recomendado en la web (React)

1. **Ruta:** `/factura` (ej. `https://www.ejele.app/factura`).
2. **Al cargar:** leer de `window.location.search` (o del router) los query params: `orderId`, `restaurant_id`, `total`, `ts`, `sig`.
3. **Llamar a `facturapi-invoice-from-qr`** (POST) con body JSON: `{ orderId, restaurant_id, total, ts, sig }`.
4. **Esa función:**
   - Valida la firma (paso 2).
   - Lee del restaurante `invoice_credits` (créditos/tokens de facturación).
   - Consulta `invoices` por `restaurant_id` + `order_id`.
   - Si ya hay factura → devuelve `{ already_invoiced: true, pdf_url?: "...", xml_url?: "...", ... }`.
   - Si no hay factura → devuelve `{ already_invoiced: false, restaurant_id, order_id, total_cents, invoice_credits }` para que la web sepa si puede ofrecer factura.
5. **En la app React (tu responsabilidad):**
   - **Si `already_invoiced`:** mostrar mensaje tipo “Esta cuenta ya fue facturada” y, si vienen `pdf_url` y/o `xml_url`, botones para descargar PDF y XML (CFDI).
   - **Si no hay factura pero `invoice_credits <= 0`:** mostrar mensaje tipo “Este restaurante no tiene créditos de facturación en este momento” y **no** mostrar el formulario ni permitir solicitar factura.
   - **Si no hay factura y `invoice_credits > 0`:** mostrar el formulario de datos fiscales.
6. **Al enviar el formulario** (solo cuando hay créditos), la web llama a **`facturapi-create-invoice`** (POST) con el body que ya usa esa función: `restaurant_id`, `customer` (legal_name, tax_id, tax_system, email?, address?), `items`, `use`, `payment_form`. Los ítems pueden ser un concepto genérico con el `total_cents` que devolvió `facturapi-invoice-from-qr`. Conviene que el backend (esa función o una que la orqueste) además inserte en la tabla `invoices` con `restaurant_id`, `order_id` (del QR), `facturapi_id`, `pdf_url`, `xml_url` y reste 1 a `invoice_credits` del restaurante; y que devuelva al cliente el PDF y/o XML.

La web **nunca** debe usar `orderId` / `total` / `restaurant_id` para facturar sin que el backend haya validado antes la firma (eso lo hace `facturapi-invoice-from-qr` al cargar). La comprobación de **si el restaurante tiene tokens/créditos** y el mensaje al usuario correspondiente es responsabilidad de la app React usando el `invoice_credits` que devuelve esa función.

---

## 6. Resumen de Supabase

| Recurso | Uso |
|--------|-----|
| **Tabla `restaurants`** | `invoice_secret`: solo backend para validar `sig`. `invoice_credits`: créditos de factura; `facturapi-invoice-from-qr` lo devuelve para que React decida si mostrar el formulario. |
| **Tabla `invoices`** | Una fila por factura generada; clave lógica `(restaurant_id, order_id)` para no duplicar. La inserta el backend al timbrar (idealmente desde o junto con `facturapi-create-invoice`). |
| **`facturapi-invoice-from-qr`** | Validar firma, leer `invoice_credits`, consultar `invoices`; responde estado para la página. |
| **`facturapi-create-invoice`** | Timbrar en Facturapi; idealmente también insertar en `invoices` y devolver `pdf_url`/`xml_url`. |

---

## 7. Algoritmo de la firma (referencia)

- **Entrada:** string `payload` (orden: `orderId`, `restaurant_id`, `total`, `ts`), string `secret` (= `invoice_secret`).
- **Firma:** `HMAC-SHA256(secret, payload)` → digest 32 bytes.
- **Salida:** Base64URL(digest) sin caracteres `=` de padding.

La app Flutter ya genera la URL con este formato; la Edge Function debe repetir el mismo cálculo para validar.
