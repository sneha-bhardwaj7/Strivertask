import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const ctx = useTheme();

  // 🔥 Safety check (prevents crash)
  if (!ctx) {
    console.error("ThemeSwitcher must be used inside ThemeProvider");
    return null; // stop rendering instead of crashing
  }

  const { theme, setTheme, themes } = ctx;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm cursor-pointer transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--bg-secondary) 88%, white), var(--bg-secondary))",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          boxShadow: "0 10px 26px var(--shadow-soft)",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        <span className="text-base">{theme?.icon}</span>
        <span>{theme?.name}</span>
        <span
          className="text-[10px] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+10px)] right-0 rounded-2xl overflow-hidden min-w-[210px]"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 42px var(--shadow)",
            animation: "fadeSlideDown 0.2s ease",
          }}
        >
          {themes?.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-3 text-left text-sm transition-colors duration-150 cursor-pointer border-none"
              style={{
                background:
                  theme?.id === t.id ? "var(--border)" : "transparent",
                color: "var(--text-primary)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: theme?.id === t.id ? 700 : 500,
              }}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.name}</span>
              {theme?.id === t.id && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}