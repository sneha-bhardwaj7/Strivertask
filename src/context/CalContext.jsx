import { createContext, useContext, useState } from "react";

const CalCtx = createContext();

export function CalProvider({ children }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [hover, setHover] = useState(null);
  const [notes, setNotes] = useState({});
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("next");

  const go = (dir) => {
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      if (dir === "next") {
        if (month === 11) { setMonth(0); setYear((y) => y + 1); }
        else setMonth((m) => m + 1);
      } else {
        if (month === 0) { setMonth(11); setYear((y) => y - 1); }
        else setMonth((m) => m - 1);
      }
      setStart(null);
      setEnd(null);
      setFlipping(false);
    }, 380);
  };

  const clickDate = (ds) => {
    if (!start || (start && end)) { setStart(ds); setEnd(null); }
    else { if (ds < start) { setEnd(start); setStart(ds); } else setEnd(ds); }
  };

  const inRange = (ds) => {
    if (!start) return false;
    const e = end || hover;
    if (!e) return false;
    const [s, en] = start <= e ? [start, e] : [e, start];
    return ds > s && ds < en;
  };

  const noteKey = () => {
    if (start && end) return `${start}__${end}`;
    if (start) return start;
    return `${year}-${String(month + 1).padStart(2, "0")}`;
  };

  return (
    <CalCtx.Provider
      value={{
        year, month, start, end, hover, notes, flipping, flipDir,
        go, clickDate, inRange, setHover, setNotes, noteKey, today, setStart, setEnd,
      }}
    >
      {children}
    </CalCtx.Provider>
  );
}

export function useCal() {
  return useContext(CalCtx);
}