import { useState, useEffect } from "react";
import { useCal } from "../context/CalContext";
import { MONTH_DATA, HOLIDAYS } from "../data/calendarData";

export default function NotesPanel() {
  const { month, year, start, end, notes, setNotes, noteKey } = useCal();
  const mi = MONTH_DATA[month];
  const key = noteKey();
  const [val, setVal] = useState(notes[key] || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => setVal(notes[key] || ""), [key, notes]);

  const save = () => {
    setNotes((p) => ({ ...p, [key]: val }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fmt = () => {
    if (start && end) {
      const s = new Date(start + "T00:00:00");
      const e = new Date(end + "T00:00:00");
      return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${e.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    if (start)
      return new Date(start + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric",
      });
    return `${mi.name} ${year}`;
  };

  const mp = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthHols = Object.entries(HOLIDAYS).filter(([d]) => d.startsWith(mp));
  const savedNotes = Object.entries(notes).filter(
    ([k, v]) => (k.startsWith(mp) || k.includes(mp)) && v.trim()
  );

  return (
    <div className="flex flex-col h-full p-4 sm:p-5 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div
            className="tracking-[1px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Notes
          </div>
          <div
            className="uppercase tracking-[1.5px] mt-0.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10px",
              color: mi.palette.primary,
            }}
          >
            {fmt()}
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
          style={{
            background: mi.palette.primary + "1f",
            border: `1px solid ${mi.palette.primary}3d`,
          }}
        >
          📝
        </div>
      </div>

      {/* Lined notepad */}
      <div
        className="relative flex-1 overflow-hidden rounded-2xl"
        style={{
          minHeight: "160px",
          background: "color-mix(in srgb, var(--bg-primary) 92%, white)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Horizontal lines */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, var(--border) 27px, var(--border) 28px)",
            backgroundPositionY: "36px",
          }}
        />
        {/* Red margin line */}
        <div
          className="absolute top-0 bottom-0 left-[30px] w-[1.5px] pointer-events-none z-10"
          style={{ background: "rgba(220,50,50,.2)" }}
        />
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={`Add notes for ${fmt()}...`}
          className="relative z-20 w-full h-full resize-none outline-none border-none"
          style={{
            minHeight: "160px",
            background: "transparent",
            padding: "8px 10px 10px 40px",
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            lineHeight: "28px",
            color: "var(--text-primary)",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Save button */}
      <button
        onClick={save}
        className="py-3 px-5 rounded-full border-none text-white cursor-pointer uppercase tracking-[2px] transition-all duration-300"
        style={{
          background: saved
            ? "#22c55e"
            : `linear-gradient(135deg, ${mi.palette.primary}, ${mi.palette.dark})`,
          fontFamily: "'Jost', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          boxShadow: `0 10px 25px ${mi.palette.primary}55`,
        }}
      >
        {saved ? "✓ Saved!" : "Save Note"}
      </button>

      {/* Holidays */}
      {monthHols.length > 0 && (
        <div>
          <div
            className="uppercase tracking-[2px] mb-1.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px",
              color: "var(--text-muted)",
            }}
          >
            🎉 Holidays
          </div>
          {monthHols.map(([d, n]) => {
            const dt = new Date(d + "T00:00:00");
            return (
              <div
                key={d}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl mb-1"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  {n}
                </span>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "9px",
                    color: "#e53935",
                    fontWeight: 600,
                  }}
                >
                  {dt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Saved Notes */}
      {savedNotes.length > 0 && (
        <div>
          <div
            className="uppercase tracking-[2px] mb-1.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px",
              color: "var(--text-muted)",
            }}
          >
            📌 Saved Notes
          </div>
          <div className="max-h-[100px] overflow-y-auto flex flex-col gap-1.5">
            {savedNotes.map(([k, v]) => {
              const lbl =
                k.includes("__")
                  ? k.replace(`${mp}-`, "").replace("__", " → ")
                  : k.length > 10
                  ? new Date(k + "T00:00:00").toLocaleDateString("en-US", {
                      month: "short", day: "numeric",
                    })
                  : mi.name;
              return (
                <div
                  key={k}
                  onClick={() => setVal(v)}
                  className="px-2.5 py-1.5 rounded-xl cursor-pointer"
                  style={{
                    background: mi.palette.primary + "14",
                    border: `1px solid ${mi.palette.primary}30`,
                  }}
                >
                  <div
                    className="uppercase tracking-[1px] mb-0.5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "8px",
                      color: mi.palette.primary,
                    }}
                  >
                    {lbl}
                  </div>
                  <div
                    className="truncate"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {v}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}