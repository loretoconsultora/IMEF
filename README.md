# IMEF — Landing de captación

Landing page de conversión para el Instituto Mexicano de Excelencia Formativa
(IMEF), ciclo escolar 2026-2027. Next.js 16 (App Router) + Tailwind CSS 4.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa las variables (ver abajo)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Ver `.env.example`. La landing funciona sin ellas (el formulario no falla si
el webhook está vacío), pero no se enviará ningún lead hasta que configures:

- `NEXT_PUBLIC_N8N_IMEF_WEBHOOK`: URL del webhook de n8n que recibe los leads
  del formulario (ver `n8n-workflows/imef/README.md` para configurarlo).
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp de IMEF, usado en el CTA
  secundario del hero y en el botón flotante. Ya tiene un valor por defecto
  hardcodeado en `src/lib/whatsapp.ts`; solo úsala para sobreescribirlo.
- `NEXT_PUBLIC_HERO_VIDEO_EMBED_URL`: video embebido arriba del formulario en
  el hero. Ya tiene un valor por defecto hardcodeado en `Hero.tsx`.
- `NEXT_PUBLIC_TESTIMONIO_1_EMBED_URL` / `NEXT_PUBLIC_TESTIMONIO_2_EMBED_URL`:
  los 2 videos del bloque "Míralo con tus propios ojos". Ya tienen un valor
  por defecto hardcodeado en `VideoSocialProof.tsx`.
- `NEXT_PUBLIC_CALENDLY_ONLINE_URL`: URL de Calendly de IMEF para la
  entrevista en línea. Ya tiene un valor por defecto hardcodeado en
  `src/components/forms/LeadForm.tsx`; solo úsala para sobreescribirla.
- `NEXT_PUBLIC_META_PIXEL_ID`: ID del Pixel de Meta (Facebook/Instagram Ads).
  Sin esta variable el Pixel no se carga. Con ella, se disparan 3 eventos:
  `PageView` (automático en cada carga), `Contact` (clic en cualquier botón
  de WhatsApp) y `Lead` (envío exitoso del formulario).

## Pendientes de configuración (marcados como TODO en el código)

- ID del Google Sheet (CRM), ID del Google Calendar conectado a Calendly, y
  credenciales de Google/SMTP en `n8n-workflows/imef/` — ver el README de esa
  carpeta para la guía completa paso a paso.

## Estructura

- `src/app/page.tsx` — composición de la landing (una sola página, sin nav).
- `src/components/sections/` — cada bloque de la landing (Hero, Diferenciadores, etc.).
- `src/components/forms/LeadForm.tsx` — formulario de un paso embebido en el hero.
- `src/components/analytics/MetaPixel.tsx` — Pixel de Meta (PageView, Contact, Lead).
- `n8n-workflows/imef/` — workflows de n8n: registro de leads en Google Sheets
  (CRM) + aviso por correo cuando se confirma una entrevista en Calendly.
