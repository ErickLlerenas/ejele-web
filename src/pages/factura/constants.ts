/** Opciones para el formulario fiscal (SAT México) */

/** Regímenes para Personas Físicas (RFC de 13 dígitos). */
export const REGIMEN_FISCAL_FISICA = [
  { value: "605", label: "605 - Sueldos y Salarios e Ingresos Asimilados a Salarios" },
  { value: "606", label: "606 - Arrendamiento" },
  { value: "608", label: "608 - Demás ingresos" },
  { value: "611", label: "611 - Ingresos por Dividendos (socios y accionistas)" },
  {
    value: "612",
    label: "612 - Personas Físicas con Actividades Empresariales y Profesionales",
  },
  { value: "614", label: "614 - Ingresos por intereses" },
  { value: "615", label: "615 - Régimen de los ingresos por obtención de premios" },
  { value: "616", label: "616 - Sin obligaciones fiscales" },
  { value: "621", label: "621 - Incorporación Fiscal" },
  {
    value: "625",
    label: "625 - Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
  },
  { value: "626", label: "626 - Régimen Simplificado de Confianza (RESICO)" },
];

/** Regímenes para Personas Morales (RFC de 12 dígitos). */
export const REGIMEN_FISCAL_MORAL = [
  { value: "601", label: "601 - General de Ley Personas Morales" },
  { value: "603", label: "603 - Personas Morales con Fines no Lucrativos" },
  { value: "609", label: "609 - Consolidación" },
  { value: "620", label: "620 - Sociedades Cooperativas de Producción" },
  {
    value: "622",
    label: "622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
  },
  { value: "623", label: "623 - Opcional para Grupos de Sociedades" },
  { value: "624", label: "624 - Coordinados" },
];

/** Uso del CFDI – Top 3 para restaurantes (G03 por defecto). */
export const USO_CFDI_OPTIONS = [
  { value: "G03", label: "G03 - Gastos en general" },
  { value: "S01", label: "S01 - Sin efectos fiscales" },
  { value: "G01", label: "G01 - Adquisición de mercancías" },
];

/** Ítem único de factura: consumo en restaurante (catálogo SAT). */
export const INVOICE_ITEM_DESCRIPTION = "Consumo";
export const INVOICE_ITEM_PRODUCT_KEY = "90101501"; // Restaurantes (SAT)
export const INVOICE_ITEM_UNIT_KEY = "E48"; // Unidad de servicio

/** Formas de pago más usadas en consumo/restaurantes (catálogo SAT). */
export const FORMA_PAGO_OPTIONS = [
  { value: "01", label: "01 - Efectivo" },
  { value: "03", label: "03 - Transferencia electrónica" },
  { value: "04", label: "04 - Tarjeta de crédito" },
  { value: "28", label: "28 - Tarjeta de débito" },
];
