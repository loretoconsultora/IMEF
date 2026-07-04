"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, CalendarDays } from "lucide-react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_IMEF_WEBHOOK ?? "";
// TODO: reemplazar con la URL real del calendario de Calendly de IMEF (ej. https://calendly.com/imef/visita).
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

const inputClass =
  "w-full rounded-xl border border-black/10 px-4 py-3 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:border-azul-profundo transition-colors bg-white";

type Step1 = {
  nombre: string;
  whatsapp: string;
  grado: string;
};

type Step2 = {
  confirmaCiclo: boolean;
  modalidad: string;
};

const GRADOS = ["Preescolar", "Primaria", "Secundaria"];
const MODALIDADES = ["Visita presencial", "Entrevista en línea"];

export default function LeadForm() {
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [step1Data, setStep1Data] = useState<Step1>({
    nombre: "",
    whatsapp: "",
    grado: "",
  });
  const [step2Data, setStep2Data] = useState<Step2>({
    confirmaCiclo: false,
    modalidad: "",
  });

  const handleStep1Change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setStep1Data((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleStep2Change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setStep2Data((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...step1Data, ...step2Data }),
        });
      }
      setStatus("idle");
      setStep("done");
    } catch {
      setStatus("error");
    }
  };

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-3 text-center py-8">
        <CheckCircle2 size={48} className="text-azul-profundo" />
        <p className="font-heading text-xl font-bold text-tinta">
          ¡Listo! Ya tenemos tu información.
        </p>
        {CALENDLY_URL ? (
          <>
            <p className="text-sm text-tinta/70 max-w-xs">
              Elige el día y horario que mejor te acomode para tu visita.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity mt-1"
            >
              <CalendarDays size={16} />
              Elegir mi horario
            </a>
          </>
        ) : (
          <p className="text-sm text-tinta/70 max-w-xs">
            Te contactaremos en menos de 24 horas para coordinar el día y
            horario de tu visita.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <p className="font-heading text-lg font-bold text-tinta mb-4">
        {step === 1 ? "Da el primer paso hoy" : "Un último paso"}
      </p>

      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="flex flex-col gap-3">
          <input
            required
            name="nombre"
            placeholder="Nombre completo *"
            value={step1Data.nombre}
            onChange={handleStep1Change}
            className={inputClass}
          />
          <input
            required
            name="whatsapp"
            type="tel"
            placeholder="WhatsApp *"
            value={step1Data.whatsapp}
            onChange={handleStep1Change}
            className={inputClass}
          />
          <select
            required
            name="grado"
            value={step1Data.grado}
            onChange={handleStep1Change}
            className={`${inputClass} ${step1Data.grado ? "" : "text-tinta/40"}`}
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

          <button
            type="submit"
            className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            Quiero agendar mi visita
            <ArrowRight size={16} />
          </button>
          <p className="text-xs text-center text-tinta/60">
            Te contactaremos en menos de 24 horas.
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="flex flex-col gap-3">
          <select
            name="modalidad"
            value={step2Data.modalidad}
            onChange={handleStep2Change}
            className={`${inputClass} ${step2Data.modalidad ? "" : "text-tinta/40"}`}
          >
            <option value="" disabled>
              ¿Prefieres visita presencial o entrevista en línea?
            </option>
            {MODALIDADES.map((m) => (
              <option key={m} value={m} className="text-tinta">
                {m}
              </option>
            ))}
          </select>

          <label className="flex items-start gap-2.5 text-sm text-tinta/80 px-1">
            <input
              required
              type="checkbox"
              name="confirmaCiclo"
              checked={step2Data.confirmaCiclo}
              onChange={handleStep2Change}
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
            {status === "loading" ? "Enviando…" : "Confirmar mis datos"}
          </button>

          {status === "error" && (
            <p className="text-xs text-red-500 text-center">
              Hubo un error al enviar. Intenta de nuevo.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
