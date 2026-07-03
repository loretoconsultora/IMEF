import Hero from "@/components/sections/Hero";
import TeEntendemos from "@/components/sections/TeEntendemos";
import Diferenciadores from "@/components/sections/Diferenciadores";
import VideoSocialProof from "@/components/sections/VideoSocialProof";
import ComoFunciona from "@/components/sections/ComoFunciona";
import UrgenciaCTA from "@/components/sections/UrgenciaCTA";
import WhatsAppFloating from "@/components/layout/WhatsAppFloating";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <Hero />
        <TeEntendemos />
        <Diferenciadores />
        <VideoSocialProof />
        <ComoFunciona />
        <UrgenciaCTA />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
