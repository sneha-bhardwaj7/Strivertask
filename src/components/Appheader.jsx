import ThemeSwitcher from "./Themeswitcher";

export default function App() {
  return (
    <header
      className="sticky top-0 z-50 px-4 sm:px-6 transition-all duration-400"
      style={{
        background: "linear-gradient(180deg, var(--glass-strong), color-mix(in srgb, var(--glass-strong) 78%, transparent))",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-[1140px] mx-auto min-h-[72px] py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, var(--accent-ink), var(--accent-warm))",
              boxShadow: "0 12px 26px var(--shadow-soft)",
            }}
          >
            <span className="text-[22px]" style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,.2))" }}>
              📅
            </span>
          </div>
          <div>
            <div
              className="tracking-[0.6px] leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px,3vw,29px)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              WallCal Studio
            </div>
            <div
              className="uppercase tracking-[2.8px] mt-1"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "9.5px",
                color: "var(--text-muted)",
              }}
            >
              Interactive Planner
            </div>
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
}