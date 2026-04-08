import { useCal } from "../context/CalContext";
import { MONTH_DATA } from "../data/calendarData";

export default function CalHeader() {
  const { month, year, go } = useCal();
  const mi = MONTH_DATA[month];

  const NavBtn = ({ dir, label }) => (
    <button
      onClick={() => go(dir)}
      className="w-12 h-12 rounded-2xl flex items-center justify-center text-[30px] cursor-pointer transition-all duration-200 flex-shrink-0"
      style={{
        border: "1.5px solid color-mix(in srgb, var(--text-primary) 20%, var(--border))",
        background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-secondary) 95%, white), var(--bg-secondary))",
        color: "color-mix(in srgb, var(--text-primary) 88%, black)",
        boxShadow: "0 12px 24px var(--shadow-soft), inset 0 1px 0 rgba(255,255,255,.45)",
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 700,
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${mi.palette.primary}, ${mi.palette.dark})`;
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = mi.palette.primary;
        e.currentTarget.style.boxShadow = `0 14px 28px ${mi.palette.primary}55`;
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "linear-gradient(180deg, color-mix(in srgb, var(--bg-secondary) 95%, white), var(--bg-secondary))";
        e.currentTarget.style.color = "color-mix(in srgb, var(--text-primary) 88%, black)";
        e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-primary) 20%, var(--border))";
        e.currentTarget.style.boxShadow = "0 12px 24px var(--shadow-soft), inset 0 1px 0 rgba(255,255,255,.45)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      aria-label={dir === "prev" ? "Previous month" : "Next month"}
    >
      {label}
    </button>
  );

  return (
    <div
      className="flex items-center justify-between px-4 sm:px-6 py-4"
      style={{
        borderBottom: "1.5px solid var(--border)",
        background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-secondary) 86%, white), var(--bg-secondary))",
      }}
    >
      <NavBtn dir="prev" label="‹" />
      <div className="text-center">
        <div
          className="uppercase leading-none tracking-[2px]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px,3.5vw,36px)",
            fontWeight: 700,
            color: mi.palette.primary,
            textShadow: "0 8px 24px color-mix(in srgb, var(--shadow) 55%, transparent)",
          }}
        >
          {mi.name}
        </div>
        <div
          className="tracking-[3px] mt-0.5"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          {year}
        </div>
      </div>
      <NavBtn dir="next" label="›" />
    </div>
  );
}