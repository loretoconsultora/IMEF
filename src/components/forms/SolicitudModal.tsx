"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SolicitudModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(20,32,43,0.55)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8"
        style={{ boxShadow: "0 20px 60px rgba(20,32,43,0.3)" }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-tinta/40 hover:text-tinta transition-colors"
        >
          <X size={20} />
        </button>
        <LeadForm />
      </div>
    </div>
  );
}
