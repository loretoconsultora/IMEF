const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5214426187545";
const DEFAULT_MESSAGE =
  "Hola IMEF, he visitado su web y me gustaría más información sobre su oferta educativa.";

export function whatsappHref(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
