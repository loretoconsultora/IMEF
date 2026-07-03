"use client";

import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";

export default function WhatsAppFloating() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Habla por WhatsApp con un asesor de IMEF"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white hover:opacity-90 transition-opacity"
      style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
    >
      <MessageCircle size={26} />
    </a>
  );
}
