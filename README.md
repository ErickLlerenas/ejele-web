# Ejele Web

Landing page para Ejele - Software gratis para restaurantes.

## Características

- Landing page enfocada en descargar la aplicación
- Software 100% gratis
- Diseño moderno con Tailwind CSS
- React + TypeScript + Vite

## Instalación

```bash
npm install
# o
yarn install
```

## Desarrollo

```bash
npm run dev
# o
yarn dev
```

## Build

```bash
npm run build
# o
yarn build
```

## Vista previa en WhatsApp / redes

Las meta tags Open Graph están en `index.html`. La imagen `public/og-image.png` es **256×256** (cuadrada) para que el preview sea tipo icono y no una imagen enorme arriba.

- `og-image.png` se genera a partir del logo del app Flutter: `../ejele/assets/images/logo.png` (mismo branding). Si cambias el logo, vuelve a exportar: `sips -z 256 256 ../ejele/assets/images/logo.png --out public/og-image.png`
- Tras publicar, refresca la caché en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (WhatsApp usa el mismo rastreador).

## Estructura

```
src/
  ├── pages/
  │   ├── landing/
  │   │   ├── components/
  │   │   │   ├── header.tsx
  │   │   │   ├── hero.tsx
  │   │   │   ├── features.tsx
  │   │   │   ├── download.tsx
  │   │   │   ├── questions.tsx
  │   │   │   └── footer.tsx
  │   │   └── landing.tsx
  │   └── legal/
  │       ├── policy.tsx
  │       └── terms.tsx
  ├── routes/
  │   └── index.tsx
  ├── utils/
  │   └── os.ts
  ├── global.css
  └── main.tsx
```
