import { useCal } from "../context/CalContext";
import { MONTH_DATA } from "../data/calendarData";
import { useResponsive } from "../hooks/Useresponsive";
import WireRings from "./Wirerings";
import HeroImage from "./Heroimage";
import CalHeader from "./Calheader";
import CalGrid from "./Calgrid";
import NotesPanel from "./Notespanel";

export default function Calendar() {
  const { month, flipping, flipDir } = useCal();
  const mi = MONTH_DATA[month];
  const isMobile = useResponsive(720);
  const desktopCardHeight = "min(82vh, 760px)";

  const cardStyle = {
    background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 86%, white), var(--bg-card))",
    borderRadius: "12px 12px 26px 26px",
    overflow: "hidden",
    boxShadow:
      "0 8px 16px var(--shadow), 0 20px 50px var(--shadow-soft), 0 44px 90px var(--shadow)",
    border: "1px solid var(--border)",
    transform: flipping
      ? flipDir === "next"
        ? "rotateX(-9deg) scale(.97)"
        : "rotateX(9deg) scale(.97)"
      : "rotateX(0) scale(1)",
    transition: "transform .38s cubic-bezier(.4,0,.2,1), opacity .38s",
    opacity: flipping ? 0.65 : 1,
    transformOrigin: "top center",
    animation: !flipping ? "flipIn .4s ease" : undefined,
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto" style={{ perspective: "1200px" }}>
      <WireRings />

      <div style={cardStyle}>
        {/* Accent top bar */}
        <div
          className="h-[6px]"
          style={{
            background: `linear-gradient(95deg, ${mi.palette.primary}, ${mi.palette.accent}, ${mi.palette.primary})`,
          }}
        />

        {/* Layout: mobile = stacked, desktop = side-by-side */}
        {isMobile ? (
          <div className="flex flex-col">
            <div className="h-[240px]">
              <HeroImage />
            </div>
            <div style={{ borderTop: "1.5px solid var(--border)" }}>
              <CalHeader />
              <CalGrid />
            </div>
            <div style={{ borderTop: "1.5px solid var(--border)" }}>
              <NotesPanel />
            </div>
          </div>
        ) : (
          <div
            className="grid"
            style={{
              height: desktopCardHeight,
              gridTemplateColumns: "minmax(300px,48%) minmax(340px,52%)",
              gridTemplateRows: "minmax(280px,50%) minmax(320px,50%)",
            }}
          >
            {/* Top hero */}
            <div
              className="col-span-2"
              style={{ borderBottom: "1.5px solid var(--border)" }}
            >
              <div className="h-full min-h-[320px]">
                <HeroImage />
              </div>
            </div>

            {/* Bottom-left panel: notes */}
            <div
              className="overflow-y-auto"
              style={{
                borderRight: "1.5px solid var(--border)",
                background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 98%, white), color-mix(in srgb, var(--bg-card) 92%, var(--bg-secondary)))",
              }}
            >
              <NotesPanel />
            </div>

            {/* Bottom-right panel: header + grid */}
            <div
              className="flex flex-col"
              style={{
                background: "linear-gradient(180deg, color-mix(in srgb, var(--bg-secondary) 98%, white), var(--bg-secondary))",
              }}
            >
              <CalHeader />
              <CalGrid />
            </div>
          </div>
        )}
      </div>

      {/* Drop shadow beneath */}
      <div
        className="h-[14px] mx-10 opacity-55"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--shadow) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}