"use client";

import { motion } from "framer-motion";

type Props = {
  onOpenForm: () => void;
};

export default function UrgenciaCTA({ onOpenForm }: Props) {
  return (
    <section className="gradient-imef py-16 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-4 tracking-tight text-white">
          Inscripciones abiertas para el ciclo 2026-2027
        </h2>
        <p className="text-base leading-relaxed mb-8 text-white/85">
          No dejes pasar la oportunidad de asegurar el lugar de tu hijo en un
          colegio pensado para su desarrollo integral.
        </p>
        <button
          onClick={onOpenForm}
          className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm bg-white hover:opacity-90 transition-opacity"
          style={{ color: "#3365A6", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}
        >
          Agenda tu visita ahora
        </button>
      </motion.div>
    </section>
  );
}
