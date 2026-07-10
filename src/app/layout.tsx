import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import Clarity from "@/components/analytics/Clarity";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://imef.edu.mx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "IMEF | Instituto Mexicano de Excelencia Formativa - Inscripciones 2026-2027",
  description:
    "Encuentra el colegio donde tu hijo va a crecer con confianza y resultados reales. Formación bilingüe, acompañamiento socioemocional y ambiente seguro de preescolar a secundaria. Agenda tu visita.",
  openGraph: {
    title: "IMEF | Instituto Mexicano de Excelencia Formativa",
    description:
      "Inscripciones abiertas para el ciclo 2026-2027. Agenda tu visita sin costo y sin compromiso.",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="antialiased text-tinta">
        <MetaPixel />
        <Clarity />
        {children}
      </body>
    </html>
  );
}
