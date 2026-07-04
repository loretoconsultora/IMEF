"use client";

import { motion } from "framer-motion";

const TESTIMONIOS = [
  process.env.NEXT_PUBLIC_TESTIMONIO_1_EMBED_URL ??
    "https://www.youtube.com/embed/nC9wP1pdCKg?rel=0",
  process.env.NEXT_PUBLIC_TESTIMONIO_2_EMBED_URL ??
    "https://www.youtube.com/embed/xJMMLMtY6Wg?rel=0",
];

export default function VideoSocialProof() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gris-claro">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-3 tracking-tight text-tinta">
          Míralo con tus propios ojos
        </h2>
        <p className="text-base text-tinta/75">
          Así vivimos el aprendizaje en IMEF — no te lo contamos, te lo
          mostramos.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TESTIMONIOS.map((url) => (
          <div
            key={url}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9", boxShadow: "0 12px 40px rgba(20,32,43,0.15)" }}
          >
            <iframe
              src={url}
              title="Testimonio de una familia IMEF"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      <p className="text-center text-sm font-semibold text-tinta/70 mt-10">
        Conoce a las familias que ya forman parte de la comunidad IMEF.
      </p>
    </section>
  );
}
