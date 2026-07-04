"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-08-15T23:59:59-06:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diffMs = Math.max(0, DEADLINE.getTime() - Date.now());
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="rounded-md px-1.5 sm:px-2 py-0.5 font-mono font-extrabold text-sm sm:text-base text-white tabular-nums leading-none"
        style={{
          background: "linear-gradient(180deg, #3a3a3a 0%, #000000 100%)",
          minWidth: "2ch",
        }}
      >
        {value}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wide text-white/70">
        {label}
      </span>
    </div>
  );
}

type Props = {
  onOpenForm: () => void;
};

export default function CountdownBar({ onOpenForm }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Intentional: this page is statically prerendered at build time, so the
    // countdown must be computed client-side on mount, not baked into the
    // static HTML (it would go stale).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) return null;

  return (
    <div className="sticky top-0 z-40 w-full" style={{ background: "#004AAD" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
          <span className="text-xs sm:text-sm font-bold text-white text-center sm:text-left">
            ⏳ Inscripciones abiertas hasta el 15 de agosto —
          </span>
          <div className="flex items-center gap-1">
            <TimeBox value={String(timeLeft.days)} label="días" />
            <span className="text-white/50 font-bold pb-2.5">:</span>
            <TimeBox value={pad(timeLeft.hours)} label="hrs" />
            <span className="text-white/50 font-bold pb-2.5">:</span>
            <TimeBox value={pad(timeLeft.minutes)} label="min" />
            <span className="text-white/50 font-bold pb-2.5">:</span>
            <TimeBox value={pad(timeLeft.seconds)} label="seg" />
          </div>
        </div>
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
