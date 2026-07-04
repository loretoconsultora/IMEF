"use client";

import { motion } from "framer-motion";

type Props = {
  onOpenForm: () => void;
};

export default function UrgenciaCTA({ onOpenForm }: Props) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#14202B" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-4 tracking-tight text-white">
          Inscripciones abiertas para el ciclo 2026-2027 — cupo limitado por
          grado.
        </h2>
        <p className="text-base leading-relaxed mb-8 text-white/75">
          No dejes pasar la oportunidad de asegurar el lugar de tu hijo en un
          colegio pensado para su desarrollo integral.
        </p>
        <button
          onClick={onOpenForm}
          className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
          style={{ boxShadow: "0 12px 32px rgba(75,170,191,0.35)" }}
        >
          Agenda tu visita ahora
        </button>
        <p className="text-xs text-white/50 mt-4">
          Sin costo. Sin compromiso. Cupo limitado.
        </p>
      </motion.div>
    </section>
  );
}
