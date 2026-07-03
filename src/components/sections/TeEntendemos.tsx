"use client";

import { motion } from "framer-motion";

export default function TeEntendemos() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gris-claro">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-5 tracking-tight text-tinta">
          ¿Sigues comparando escuelas y no sabes cuál va a cuidar realmente el
          desarrollo de tu hijo?
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-tinta/75">
          No se trata solo de buenas calificaciones. Se trata de que tu hijo
          crezca seguro, feliz y con las herramientas para enfrentar el mundo
          que le toca vivir. En IMEF creemos en una formación integral —
          académica, emocional y humana — para que cada etapa de su
          desarrollo cuente.
        </p>
      </motion.div>
    </section>
  );
}
