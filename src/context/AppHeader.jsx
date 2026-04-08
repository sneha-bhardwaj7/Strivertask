import ThemeSwitcher from "../components/Themeswitcher";

export default function AppHeader() {
  return (
    <header
      className="sticky top-0 z-50 px-6 backdrop-blur-md transition-all duration-400"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1.5px solid var(--border)",
      }}
    >
      <div className="max-w-[1100px] mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-[26px]" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,.2))" }}>
            📅
          </span>
          <div>
            <div
              className="tracking-[1px] leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "21px",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              WallCal
            </div>
            <div
              className="uppercase tracking-[2.5px] mt-0.5"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "9px",
                color: "var(--text-muted)",
              }}
            >
              Interactive Calendar
            </div>
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
}