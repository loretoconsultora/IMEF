# Workflow de n8n — IMEF

Workflow de n8n listo para **importar** (Workflows → Import from File) para la landing de captación de IMEF.

| Archivo | Qué hace |
|---|---|
| `01-registro.json` | Webhook del formulario (paso 1 + paso 2 combinados) → crea el item en Monday → correo HTML interno de nuevo lead al equipo de IMEF. |

> La landing no captura correo electrónico (solo WhatsApp), por lo que este workflow **no** envía confirmación automática al lead — el contacto se hace manualmente por WhatsApp dentro de las primeras 24 horas, como promete el copy de la landing.

## Cómo darme las credenciales y los IDs de tablero

**Las credenciales (token de Monday, usuario/contraseña SMTP) nunca se guardan dentro del archivo del workflow** — n8n las guarda cifradas por separado, y el workflow solo las referencia por nombre. Se configuran directamente en la app de n8n:

1. Entra a tu instancia de n8n → menú izquierdo **Credentials** → **+ Add Credential**.
2. **Credencial de Monday:** tipo **"Header Auth"**, nombre `Monday API Token`, Header Name `Authorization`, Header Value tu API token de Monday.
3. **Credencial SMTP:** tipo **"SMTP"**, nombre `SMTP Loreto` (o el correo que enviará los avisos).
4. Importa el workflow y en cada nodo marcado en rojo selecciona la credencial real desde el dropdown.

## TODOs pendientes antes de activar

- **`TODO_BOARD_ID_IMEF`** en el nodo "Crear Item en Monday": ID del tablero de Monday para IMEF (el número en la URL del tablero).
- **IDs de columna** (`text_whatsapp`, `text_grado`, `text_colegio_procedencia`, `text_zona_residencia`, `text_ciclo_escolar`, `text_modalidad`, `status_lead`) en el nodo "Construir Payload Monday": son genéricos, reemplázalos por los IDs reales del tablero.
- **`TODO_CORREO_EQUIPO_IMEF`** en el nodo "Notificación Interna Nuevo Lead": correo(s) del equipo de admisiones de IMEF que deben recibir el aviso de nuevo lead.
- **URL del webhook**: una vez importado y activado, copia la URL pública del nodo "Webhook Registro" y colócala en `NEXT_PUBLIC_N8N_IMEF_WEBHOOK` (ver `.env.example` en la raíz del repo).

## Activar

Una vez configurado todo lo anterior, activa el workflow (toggle "Active" arriba a la derecha en n8n).
