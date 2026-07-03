"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

// TODO: reemplazar con la URL de embed real de YouTube/Vimeo (no alojar el archivo de video directamente).
const VIDEO_EMBED_URL = process.env.NEXT_PUBLIC_VIDEO_EMBED_URL ?? "";

const MOSAICO = [
  "Testimonio individual de un alumno",
  "Momento de la feria de emprendimiento",
  "Momento de convivencia / vida escolar",
];

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl text-center p-6"
      style={{ aspectRatio: "16/9", background: "#0d1b28" }}
    >
      <PlayCircle size={32} className="text-white/50" />
      <p className="text-xs text-white/60 max-w-[80%]">{label}</p>
    </div>
  );
}

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

      <div className="max-w-4xl mx-auto">
        {VIDEO_EMBED_URL ? (
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9", boxShadow: "0 12px 40px rgba(20,32,43,0.15)" }}
          >
            <iframe
              src={VIDEO_EMBED_URL}
              title="Testimonios y vida en IMEF"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <VideoPlaceholder label="Video pendiente de producción: testimonios de alumnos + tomas de la feria de emprendimiento (60-90s, hospedado en YouTube/Vimeo)." />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {MOSAICO.map((label) => (
            <VideoPlaceholder key={label} label={label} />
          ))}
        </div>
      </div>

      <p className="text-center text-sm font-semibold text-tinta/70 mt-10">
        Conoce a las familias que ya forman parte de la comunidad IMEF.
      </p>
    </section>
  );
}
