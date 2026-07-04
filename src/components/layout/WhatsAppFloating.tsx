"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/whatsapp";

export default function WhatsAppFloating() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          className="absolute bottom-[72px] right-0 w-72 rounded-2xl bg-white overflow-hidden"
          style={{ boxShadow: "0 12px 40px rgba(20,32,43,0.25)" }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "#25D366" }}
          >
            <div>
              <p className="text-sm font-bold text-white">IMEF</p>
              <p className="text-xs text-white/85">
                Normalmente responde en el día
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <div className="rounded-xl rounded-tl-none bg-gris-claro px-3.5 py-2.5 text-sm text-tinta/85 mb-3 leading-relaxed">
              ¡Hola! 👋 Agenda tu entrevista sin costo y descubre de cerca
              nuestra propuesta educativa — te ayudamos a resolver si IMEF
              es la formación ideal para tu hija o hijo.
            </div>
            <a
              href={whatsappHref(
                "Hola IMEF, me gustaría agendar una entrevista para conocer más sobre su oferta educativa y saber si es la opción ideal para mi hija o hijo."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white font-semibold px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={16} />
              Agendar mi entrevista
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Habla por WhatsApp con un asesor de IMEF"
        className="flex items-center justify-center w-14 h-14 rounded-full text-white hover:opacity-90 transition-opacity"
        style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
      >
        <WhatsAppIcon size={26} />
      </button>
    </div>
  );
}
