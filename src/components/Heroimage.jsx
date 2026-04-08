import { useState, useEffect } from "react";
import { MONTH_DATA } from "../data/calendarData";
import { useCal } from "../context/CalContext";

export default function HeroImage() {
  const { month, year } = useCal();
  const mi = MONTH_DATA[month];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [month]);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ minHeight: "260px" }}>
      {/* Shimmer skeleton */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(110deg, var(--border) 30%, var(--bg-secondary) 50%, var(--border) 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}

      <img
        src={mi.image}
        alt={mi.alt}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover block transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,.32) 100%)",
        }}
      />

      {/* Diagonal colour overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "58%",
          background: `linear-gradient(175deg, transparent 0%, transparent 36%, ${mi.palette.primary}d8 36%, ${mi.palette.primary} 100%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "58%",
          height: "48%",
          background: `linear-gradient(170deg, transparent 0%, transparent 33%, ${mi.palette.accent}bb 33%)`,
        }}
      />

      {/* Month / year label */}
      <div className="absolute bottom-4 right-4 text-right z-10">
        <div
          className="uppercase tracking-[4px] text-white/80 mb-0.5"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 300 }}
        >
          {year}
        </div>
        <div
          className="uppercase text-white leading-none tracking-[2px]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px,4vw,42px)",
            fontWeight: 800,
            textShadow: "0 2px 20px rgba(0,0,0,.3)",
          }}
        >
          {mi.name}
        </div>
        <div
          className="uppercase text-white/65 tracking-[2px] mt-1"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px" }}
        >
          {mi.mood}
        </div>
      </div>

      {/* Photo label badge */}
      <div
        className="absolute top-4 left-4 text-white uppercase tracking-[2px] text-[10px] rounded-full px-3.5 py-1.5"
        style={{
          background: "rgba(0,0,0,.35)",
          backdropFilter: "blur(8px)",
          fontFamily: "'Jost', sans-serif",
          border: "1px solid rgba(255,255,255,.22)",
        }}
      >
        📷 {mi.alt.split(" ").slice(0, 3).join(" ")}
      </div>
    </div>
  );
}