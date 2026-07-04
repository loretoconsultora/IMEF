"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Languages,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

type Diferenciador = {
  icon: LucideIcon;
  titulo: string;
  texto: string;
  imagen: string;
};

const DIFERENCIADORES: Diferenciador[] = [
  {
    icon: Languages,
    titulo: "Formación bilingüe desde preescolar",
    texto:
      "Tu hijo empieza a dominar un segundo idioma desde la etapa en la que el cerebro aprende con mayor naturalidad — una ventaja que lo acompaña toda su vida.",
    imagen: "/diferenciadores/diferenciador-1-bilingue.jpg",
  },
  {
    icon: HeartHandshake,
    titulo: "Acompañamiento socioemocional constante",
    texto:
      "Formamos niños que reconocen y gestionan sus emociones, no solo que memorizan contenidos.",
    imagen: "/diferenciadores/diferenciador-2-socioemocional.jpg",
  },
  {
    icon: Rocket,
    titulo: "Habilidades para el mundo de hoy",
    texto:
      "Emprendimiento, tecnología, comunicación y liderazgo: preparamos a tu hijo con las competencias que hoy marcan la diferencia.",
    imagen: "/diferenciadores/diferenciador-3-habilidades.jpg",
  },
  {
    icon: ShieldCheck,
    titulo: "Ambiente seguro y libre de bullying",
    texto:
      "Contamos con protocolos claros de convivencia para que tu hijo aprenda en un entorno donde se sienta seguro y respetado.",
    imagen: "/diferenciadores/diferenciador-4-seguridad.jpg",
  },
  {
    icon: Users,
    titulo: "Formación en valores familiares",
    texto:
      "Reforzamos en el aula los valores que se enseñan en casa: respeto, responsabilidad y honestidad.",
    imagen: "/diferenciadores/diferenciador-5-valores.jpg",
  },
  {
    icon: GraduationCap,
    titulo: "Continuidad educativa de preescolar a secundaria",
    texto:
      "Un solo colegio acompaña a tu hijo en cada etapa de su crecimiento — sin cambios de institución, sin adaptaciones forzadas, con una comunidad que lo conoce desde el principio.",
    imagen: "/diferenciadores/diferenciador-6-continuidad.jpg",
  },
];

export default function Diferenciadores() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-tinta">
          Una formación pensada para el
          <br />
          desarrollo integral de tu hijo
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIFERENCIADORES.map((d, i) => (
          <motion.div
            key={d.titulo}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
            className="rounded-2xl overflow-hidden border border-black/5"
            style={{ boxShadow: "0 8px 24px rgba(20,32,43,0.06)" }}
          >
            <div className="relative" style={{ aspectRatio: "16/9" }}>
              {d.imagen ? (
                <Image
                  src={d.imagen}
                  alt={d.titulo}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="gradient-imef absolute inset-0 opacity-90" />
              )}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl flex items-center justify-center gradient-imef"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}
              >
                <d.icon size={20} className="text-white" />
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-heading font-bold text-base mb-2 text-tinta">
                {d.titulo}
              </h3>
              <p className="text-base leading-relaxed text-tinta/70">{d.texto}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
