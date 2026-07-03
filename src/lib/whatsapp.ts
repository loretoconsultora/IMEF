// TODO: reemplazar con el número real de WhatsApp de IMEF (lada país + número, sin signos).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525500000000";
const DEFAULT_MESSAGE = "Hola, quiero información sobre IMEF";

export function whatsappHref(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
