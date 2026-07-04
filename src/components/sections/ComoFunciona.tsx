"use client";

import { motion } from "framer-motion";

const PASOS = [
  {
    num: "01",
    titulo: "Agenda tu visita o entrevista",
    texto: "Presencial en nuestras instalaciones o en línea, como prefieras.",
  },
  {
    num: "02",
    titulo: "Conócenos de cerca",
    texto:
      "Recorre el plantel, conoce a nuestro equipo y resuelve todas tus dudas sobre nuestra metodología.",
  },
  {
    num: "03",
    titulo: "Entrevista con nuestro equipo",
    texto: "Una conversación cercana para conocer a tu hijo y entender qué necesita.",
  },
  {
    num: "04",
    titulo: "Resultados e inscripción",
    texto: "Te acompañamos en los siguientes pasos para asegurar su lugar.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl mb-3 tracking-tight text-tinta">
          Te acompañamos en cada paso
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PASOS.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative rounded-2xl p-6 border border-black/5"
            style={{ boxShadow: "0 8px 24px rgba(20,32,43,0.06)" }}
          >
            <span className="font-heading font-extrabold text-3xl text-azul-profundo/25">
              {p.num}
            </span>
            <h3 className="font-heading font-bold text-base mt-2 mb-2 text-tinta">
              {p.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-tinta/70">{p.texto}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
