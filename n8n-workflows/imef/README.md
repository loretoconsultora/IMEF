# Workflows de n8n — IMEF

Dos workflows listos para **importar** (Workflows → Import from File):

| Archivo | Qué hace | Se dispara cuando... |
|---|---|---|
| `01-registro.json` | Guarda el lead en Google Sheets (pestaña "Leads") + correo interno ligero. | Alguien envía el formulario de la landing (paso 1 + paso 2). |
| `02-confirmacion-cita-calendar.json` | Guarda la cita confirmada en Google Sheets (pestaña "Citas confirmadas") + correo interno con el detalle completo de la entrevista. | Calendly agrega el evento reservado al Google Calendar conectado. |

## Por qué dos workflows separados

El formulario de la landing **no sabe** qué día/horario eligió la familia en Calendly — eso pasa en una pantalla aparte, fuera de nuestro sitio. Por eso el aviso con día y horario confirmado (lo que pediste) no puede salir del mismo paso que el registro inicial; necesita enterarse de lo que pasa en Calendly.

**Calendly con cuenta gratuita no permite webhooks** (esa función requiere plan Standard o superior), así que no podemos escuchar directamente "alguien reservó una cita". La alternativa que sí funciona gratis: Calendly puede **conectarse a un Google Calendar** y sincronizar ahí cada cita reservada automáticamente. El workflow 2 vigila ese calendario (revisa cada 5 minutos si hay eventos nuevos) y, cuando encuentra uno de IMEF, manda el aviso.

> Si en el futuro actualizan Calendly a un plan de paga, puedo cambiar el workflow 2 por uno basado en el webhook nativo de Calendly (`invitee.created`), que es más inmediato y confiable que revisar el calendario cada 5 minutos. Avísame cuando llegue ese momento.

## Paso 1 — Crear el Google Sheet (el "CRM")

1. Crea una hoja de cálculo nueva en Google Sheets, dale un nombre como **"CRM IMEF"**.
2. Crea 2 pestañas (tabs) con estos nombres exactos y estos encabezados en la primera fila:

**Pestaña `Leads`:**
`Fecha | Nombre | WhatsApp | Grado | Confirma ciclo 2026-2027 | Modalidad preferida | Estatus`

**Pestaña `Citas confirmadas`:**
`Nombre | Teléfono | Modalidad | Día y hora de la cita`

3. Copia el ID de la hoja (la parte de la URL entre `/d/` y `/edit`, ej. `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`).

## Paso 2 — Conectar Calendly con Google Calendar

1. En Calendly: perfil → **Availability** (o "Connected Calendars") → conecta la misma cuenta de Google donde vive tu Sheet (o cualquier Google Calendar al que tengas acceso).
2. Confirma que las citas de **ambos** tipos de evento (Entrevista presencial, Entrevista en línea) se sincronicen ahí — normalmente se activa solo al conectar la cuenta.

## Paso 3 — Agregar la pregunta de "Teléfono" en Calendly

El formulario de reserva de Calendly por defecto solo pide nombre y correo — no teléfono. Para que el workflow pueda incluirlo en el aviso:

1. En Calendly, entra a cada uno de los 2 tipos de evento (`imef-entrevista-presencial` y `imef-entrevista-online`).
2. Ve a **Edit → Invitee Questions** (o "Preguntas para el invitado").
3. Agrega una pregunta nueva: **"Teléfono"**, tipo texto corto, marcada como **obligatoria**.
4. Repite en el otro tipo de evento.

## Paso 4 — Credenciales en n8n

1. **Google Sheets:** Credentials → + Add Credential → busca "Google Sheets OAuth2 API" → autoriza con la cuenta de Google donde está el Sheet. Nómbrala `Google Sheets IMEF`.
2. **Google Calendar:** Credentials → + Add Credential → busca "Google Calendar OAuth2 API" → autoriza con la **misma cuenta de Google** que conectaste a Calendly en el Paso 2. Nómbrala `Google Calendar IMEF`.
3. **SMTP:** si ya existe la credencial `SMTP Loreto` (usada en los workflows de VictorIA Academy), puedes reutilizarla aquí también.

## Paso 5 — Importar y completar los TODOs

Importa ambos archivos JSON y ajusta:

- **`TODO_GOOGLE_SHEET_ID`** (en los 2 workflows): el ID del Sheet del Paso 1.
- **`TODO_CALENDAR_ID`** (workflow 2, nodo "Nuevo evento en Google Calendar"): el correo/ID del Google Calendar conectado a Calendly (normalmente el mismo correo de esa cuenta de Google).
- En cada nodo de Google Sheets / Google Calendar / correo marcado en rojo, selecciona la credencial real desde el dropdown.
- **URL del webhook** (workflow 1): una vez activado, copia la URL pública del nodo "Webhook Registro" y colócala en `NEXT_PUBLIC_N8N_IMEF_WEBHOOK` (ver `.env.example` en la raíz del repo) — probablemente ya la tengas configurada de antes.

## Paso 6 — Probar antes de confiar en él

El nodo "Extraer datos de la cita" del workflow 2 identifica las citas de IMEF buscando la palabra "imef" en el título/descripción del evento sincronizado, y extrae el teléfono buscando el texto "Teléfono" o "WhatsApp" seguido de números. **El texto exacto que usa Calendly al sincronizar puede variar.** Recomendación:

1. Activa ambos workflows.
2. Llena el formulario de la landing tú mismo y agenda una cita de prueba en Calendly (puedes cancelarla después).
3. Revisa en n8n (pestaña **Executions**) qué datos llegaron realmente al nodo "Nuevo evento en Google Calendar" — ahí verás el `summary` y `description` reales del evento.
4. Si el nombre, teléfono o modalidad no se extrajeron bien, ajusta las expresiones regulares del código en ese nodo (o dímelo y lo ajusto yo).

## Activar

Una vez configurado todo lo anterior, activa ambos workflows (toggle "Active" arriba a la derecha en cada uno).
