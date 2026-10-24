# Paw Pantry

A basic, complete D2C ecommerce demo for pet-care essentials, built with SvelteKit and designed for Vercel.

## What works

- Search, pet/category filters and sorting
- Product detail dialog
- Persistent local cart with quantity controls
- Free-shipping threshold and `WELCOME10` promo
- Validated delivery form
- Cash-on-delivery demo checkout and order confirmation
- Responsive, accessible UI
- WebMCP tools for catalog search and add-to-cart where supported

No real payments, orders, accounts or inventory are processed. Cart data stays in the visitor's browser.

## Local development

```bash
npm install
npm run dev
```

## Checks and deployment

```bash
npm run check
npm run build
```

The static build is written to `build/`. Import this repository into Vercel; the SvelteKit framework preset and build settings are detected automatically.
