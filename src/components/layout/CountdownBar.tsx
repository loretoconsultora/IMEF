"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-08-15T23:59:59-06:00");

function getDaysRemaining() {
  const diffMs = DEADLINE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

type Props = {
  onOpenForm: () => void;
};

export default function CountdownBar({ onOpenForm }: Props) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    // Intentional: this page is statically prerendered at build time, so the
    // days-remaining value must be computed client-side on mount, not baked
    // into the static HTML (it would go stale).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDaysLeft(getDaysRemaining());
    const interval = setInterval(() => setDaysLeft(getDaysRemaining()), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  if (daysLeft === null) return null;

  return (
    <div className="sticky top-0 z-40 w-full" style={{ background: "#004AAD" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 px-4 py-2.5">
        <p className="text-xs sm:text-sm font-bold text-white text-center sm:text-left">
          ⏳ Inscripciones cierran el 15 de agosto de 2026 — quedan {daysLeft}{" "}
          {daysLeft === 1 ? "día" : "días"}
        </p>
        <button
          onClick={onOpenForm}
          className="flex-shrink-0 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full bg-white hover:opacity-90 transition-opacity"
          style={{ color: "#004AAD" }}
        >
          Agendar entrevista
        </button>
      </div>
    </div>
  );
}
