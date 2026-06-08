import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function CountdownTimer({ target, dark = false }: { target: Date; dark?: boolean }) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
      {items.map(([label, val]) => (
        <div
          key={label}
          className={`rounded-2xl p-3 sm:p-5 text-center ${
            dark ? "glass-dark text-white" : "bg-white shadow-soft border border-border"
          }`}
        >
          <div className="font-display text-2xl sm:text-4xl font-bold tabular-nums text-gradient">
            {String(val).padStart(2, "0")}
          </div>
          <div className={`text-[10px] sm:text-xs uppercase tracking-widest mt-1 ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
