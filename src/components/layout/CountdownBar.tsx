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
        <p className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm font-bold text-white text-center sm:text-left">
          <span>⏳ Inscripciones abiertas hasta el 15 de agosto —</span>
          <span className="font-mono tabular-nums">
            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m{" "}
            {pad(timeLeft.seconds)}s
          </span>
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
