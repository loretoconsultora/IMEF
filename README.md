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
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número real de WhatsApp de IMEF, usado en el
  CTA secundario del hero y en el botón flotante.
- `NEXT_PUBLIC_VIDEO_EMBED_URL`: URL de embed de YouTube/Vimeo del video de
  prueba social (bloque "Míralo con tus propios ojos"). Sin esta variable se
  muestra un placeholder.

## Pendientes de contenido real (marcados como TODO en el código)

- Video de prueba social y clips del mosaico (`VideoSocialProof.tsx`).
- Número de WhatsApp real (`src/lib/whatsapp.ts`).
- IDs de tablero/columna de Monday y correo del equipo en
  `n8n-workflows/imef/01-registro.json`.

## Estructura

- `src/app/page.tsx` — composición de la landing (una sola página, sin nav).
- `src/components/sections/` — cada bloque de la landing (Hero, Diferenciadores, etc.).
- `src/components/forms/LeadForm.tsx` — formulario de 2 pasos embebido en el hero.
- `n8n-workflows/imef/` — workflow de n8n para procesar los leads (Monday + correo interno).
