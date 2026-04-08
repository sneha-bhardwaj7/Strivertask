import {ThemeProvider} from "./context/Themecontext";
import { CalProvider } from "./context/CalContext";
import AppHeader from "./components/Appheader";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <ThemeProvider>
      <CalProvider>
        <div
          className="min-h-screen flex flex-col transition-colors duration-400 app-shell"
          style={{
            background: "radial-gradient(circle at 20% -10%, var(--bg-orb) 0%, transparent 40%), radial-gradient(circle at 90% 12%, var(--bg-orb-soft) 0%, transparent 34%), var(--bg-primary)",
          }}
        >
          <div className="app-noise" />
          <AppHeader />

          <main className="relative z-10 flex-1 px-4 py-3 md:py-4 flex flex-col items-center gap-3 md:gap-4">
            <Calendar />
          </main>

          <footer
            className="relative z-10 text-center py-2 uppercase tracking-[2px] transition-colors duration-400"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              color: "var(--text-muted)",
              borderTop: "1px solid var(--border)",
              background: "linear-gradient(180deg, transparent, var(--bg-secondary))",
            }}
          >
            WallCal Studio · Frontend Engineering Challenge · {new Date().getFullYear()}
          </footer>
        </div>
      </CalProvider>
    </ThemeProvider>
  );
}