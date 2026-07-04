"use client";

import { motion } from "framer-motion";
import LeadForm from "@/components/forms/LeadForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/whatsapp";

const HERO_VIDEO_EMBED_URL =
  process.env.NEXT_PUBLIC_HERO_VIDEO_EMBED_URL ??
  "https://www.youtube.com/embed/HKYe9qa357Q?rel=0";

type Props = {
  onOpenForm: () => void;
};

export default function Hero({ onOpenForm }: Props) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-14 sm:pt-20 pb-12 px-4 sm:px-6"
    >
      <div
        className="absolute -top-24 -left-16 w-80 h-80 rounded-full pointer-events-none animate-float"
        style={{ background: "#3365A6", opacity: 0.14, filter: "blur(90px)" }}
      />
      <div
        className="absolute top-10 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "#4BAABF", opacity: 0.16, filter: "blur(100px)" }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{ border: "1px solid rgba(20,32,43,0.15)", color: "#3365A6" }}
          >
            Instituto Mexicano de Excelencia Formativa
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-5 tracking-tight text-tinta"
            style={{ lineHeight: 1.1 }}
          >
            Encuentra el colegio donde tu hijo va a crecer con{" "}
            <span className="gradient-text-imef">confianza y resultados reales</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed mb-7 text-tinta/80 max-w-xl"
          >
            En el Instituto Mexicano de Excelencia Formativa, tu hijo estará
            acompañado en cada etapa de su desarrollo — académico, emocional y
            humano — en un ambiente seguro pensado para que crezca feliz y
            preparado para el futuro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-3"
          >
            <button
              onClick={onOpenForm}
              className="gradient-imef inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 12px 32px rgba(51,101,166,0.35)" }}
            >
              Agenda tu visita
            </button>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm border border-azul-profundo text-azul-profundo hover:bg-azul-profundo/5 transition-colors"
            >
              <WhatsAppIcon size={16} />
              Habla por WhatsApp con un asesor
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs text-tinta/50"
          >
            Sin costo. Sin compromiso.
          </motion.p>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{ aspectRatio: "16/9", boxShadow: "0 12px 40px rgba(20,32,43,0.15)" }}
          >
            <iframe
              src={HERO_VIDEO_EMBED_URL}
              title="Conoce IMEF"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            id="formulario"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl bg-white p-6 sm:p-8 scroll-mt-24"
            style={{ boxShadow: "0 12px 40px rgba(20,32,43,0.12)" }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
