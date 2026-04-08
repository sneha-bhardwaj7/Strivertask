import { useCal } from "../context/CalContext";
import { MONTH_DATA, HOLIDAYS } from "../data/calendarData";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function pad(n) { return String(n).padStart(2, "0"); }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function firstDay(y, m) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

export default function CalGrid() {
  const { year, month, start, end, hover, clickDate, inRange, setHover, today } = useCal();
  const mi = MONTH_DATA[month];

  const dim = daysInMonth(year, month);
  const fd = firstDay(year, month);
  const prevDim = daysInMonth(year, month - 1 < 0 ? 11 : month - 1);
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const cells = [];
  for (let i = 0; i < fd; i++) cells.push({ day: prevDim - fd + 1 + i, cur: false, ds: null });
  for (let d = 1; d <= dim; d++) {
    const ds = `${year}-${pad(month + 1)}-${pad(d)}`;
    cells.push({ day: d, cur: true, ds });
  }
  const rem = 42 - cells.length;
  for (let i = 1; i <= rem; i++) cells.push({ day: i, cur: false, ds: null });

  return (
    <div className="px-3 sm:px-5 pb-4 pt-3 flex-1">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className="text-center py-1 tracking-[1.5px]"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "10.5px",
              fontWeight: 700,
              color: i >= 5 ? mi.palette.primary : "color-mix(in srgb, var(--text-muted) 65%, var(--text-primary))",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-[2px] rounded-2xl p-1" style={{ background: "var(--cell-grid)" }}>
        {cells.map((cell, idx) => {
          if (!cell.cur) {
            return (
              <div
                key={idx}
                className="flex items-center justify-center py-1.5 min-h-[40px] rounded-xl"
                style={{ background: "var(--bg-secondary)" }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    opacity: 0.38,
                  }}
                >
                  {cell.day}
                </span>
              </div>
            );
          }

          const ds = cell.ds;
          const isStart = ds === start;
          const isEnd = ds === end;
          const inR = inRange(ds);
          const isToday = ds === todayStr;
          const isHol = !!HOLIDAYS[ds];
          const col = idx % 7;
          const isSat = col === 5, isSun = col === 6;

          let bg = "color-mix(in srgb, var(--bg-secondary) 96%, white)";
          let color = "var(--text-primary)";
          let borderRadius = "12px";
          let fontWeight = "400";

          if (isStart || isEnd) {
            bg = mi.palette.primary;
            color = "#fff";
            fontWeight = "700";
            borderRadius = isStart && end ? "12px 4px 4px 12px" : isEnd && start ? "4px 12px 12px 4px" : "12px";
          } else if (inR) {
            bg = mi.palette.light + "66";
            color = mi.palette.dark;
            borderRadius = "5px";
            fontWeight = "500";
          } else if (isSat || isSun) {
            color = mi.palette.primary;
          } else if (isHol) {
            color = "#e53935";
          }

          return (
            <div
              key={idx}
              onClick={() => clickDate(ds)}
              onMouseEnter={() => setHover(ds)}
              onMouseLeave={() => setHover(null)}
              title={HOLIDAYS[ds] || ""}
              className="relative text-center cursor-pointer select-none min-h-[40px] flex flex-col items-center justify-center transition-all duration-200"
              style={{
                padding: "8px 2px",
                borderRadius,
                background: bg,
                border: isToday && !isStart && !isEnd
                  ? `2px solid ${mi.palette.primary}`
                  : "1px solid color-mix(in srgb, var(--border) 82%, transparent)",
                boxShadow: (isStart || isEnd) ? `0 8px 18px ${mi.palette.primary}66` : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px,2vw,15px)",
                  fontWeight: isToday && !isStart && !isEnd ? 700 : fontWeight,
                  color: isToday && !isStart && !isEnd ? mi.palette.primary : color,
                  lineHeight: 1,
                }}
              >
                {cell.day}
              </span>

              {/* Holiday dot */}
              {isHol && (
                <div
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{ background: isStart || isEnd ? "#fff" : "#e53935" }}
                />
              )}

              {/* Today pulse ring */}
              {isToday && !isStart && !isEnd && (
                <div
                  className="absolute inset-0.5 rounded-[11px] pointer-events-none"
                  style={{
                    border: `2px solid ${mi.palette.primary}66`,
                    animation: "pulseBorder 2s infinite",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap gap-3 mt-4 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {[
          { c: mi.palette.primary, l: "Selected", fill: true },
          { c: mi.palette.accent + "88", l: "Range", fill: true },
          { c: mi.palette.primary, l: "Today", fill: false },
          { c: "#e53935", l: "Holiday", fill: false },
        ].map((it) => (
          <div key={it.l} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{
                background: it.fill ? it.c : "transparent",
                border: !it.fill ? `2px solid ${it.c}` : "none",
              }}
            />
            <span
              className="uppercase tracking-[1px]"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "9.5px",
                color: "var(--text-muted)",
              }}
            >
              {it.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}