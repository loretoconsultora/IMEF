"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, CalendarDays } from "lucide-react";
import { trackLead } from "@/lib/metaPixel";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_IMEF_WEBHOOK ?? "";
const CALENDLY_ONLINE_URL =
  process.env.NEXT_PUBLIC_CALENDLY_ONLINE_URL ??
  "https://calendly.com/imef-queretaro/imef-entrevista-online";

const inputClass =
  "w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:border-azul-profundo transition-colors bg-white";

type FormData = {
  nombre: string;
  whatsapp: string;
  grado: string;
  confirmaCiclo: boolean;
};

const GRADOS = ["Preescolar", "Primaria", "Secundaria"];

export default function LeadForm() {
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    whatsapp: "",
    grado: "",
    confirmaCiclo: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setStatus("idle");
      setDone(true);
      trackLead();
    } catch {
      setStatus("error");
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 text-center py-8">
        <CheckCircle2 size={48} className="text-azul-profundo" />
        <p className="font-heading text-xl font-bold text-azul-profundo">
          ¡Listo! Ya tenemos tu información.
        </p>
        <p className="text-sm text-tinta/70 max-w-xs">
          Elige el día y horario que mejor te acomode para tu entrevista.
        </p>
        <a
          href={CALENDLY_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity mt-1"
        >
          <CalendarDays size={16} />
          Entrevista en línea
        </a>
      </div>
    );
  }

  return (
    <div>
      <p className="font-heading text-lg font-bold text-azul-profundo mb-4">
        Da el primer paso hoy
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          required
          name="nombre"
          placeholder="Nombre completo *"
          value={formData.nombre}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          required
          name="whatsapp"
          type="tel"
          placeholder="WhatsApp *"
          value={formData.whatsapp}
          onChange={handleChange}
          className={inputClass}
        />
        <select
          required
          name="grado"
          value={formData.grado}
          onChange={handleChange}
          className={`${inputClass} ${formData.grado ? "" : "text-tinta/40"}`}
        >
          <option value="" disabled>
            Grado de interés del hijo *
          </option>
          {GRADOS.map((g) => (
            <option key={g} value={g} className="text-tinta">
              {g}
            </option>
          ))}
        </select>

        <label className="flex items-start gap-2.5 text-sm text-tinta/80 px-1">
          <input
            required
            type="checkbox"
            name="confirmaCiclo"
            checked={formData.confirmaCiclo}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#3365A6]"
          />
          Confirmo mi interés en inscripciones para el ciclo escolar 2026 -
          2027
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Iniciar Entrevista"}
          {status !== "loading" && <ArrowRight size={16} />}
        </button>
        <p className="text-xs text-center text-tinta/60">
          Te contactaremos en menos de 24 horas.
        </p>

        {status === "error" && (
          <p className="text-xs text-red-500 text-center">
            Hubo un error al enviar. Intenta de nuevo.
          </p>
        )}
      </form>
    </div>
  );
}
