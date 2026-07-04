"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import TeEntendemos from "@/components/sections/TeEntendemos";
import Diferenciadores from "@/components/sections/Diferenciadores";
import VideoSocialProof from "@/components/sections/VideoSocialProof";
import ComoFunciona from "@/components/sections/ComoFunciona";
import UrgenciaCTA from "@/components/sections/UrgenciaCTA";
import WhatsAppFloating from "@/components/layout/WhatsAppFloating";
import CountdownBar from "@/components/layout/CountdownBar";
import Footer from "@/components/layout/Footer";
import SolicitudModal from "@/components/forms/SolicitudModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openForm = () => setModalOpen(true);

  return (
    <>
      <CountdownBar onOpenForm={openForm} />
      <main className="min-h-screen bg-white">
        <Hero onOpenForm={openForm} />
        <TeEntendemos />
        <Diferenciadores />
        <VideoSocialProof onOpenForm={openForm} />
        <ComoFunciona />
        <UrgenciaCTA onOpenForm={openForm} />
      </main>
      <Footer />
      <WhatsAppFloating />
      <SolicitudModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
