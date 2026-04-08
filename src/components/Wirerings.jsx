export default function WireRings() {
  return (
    <div className="flex items-center justify-center gap-[8px] px-8 relative z-10 -mb-[20px]">
      {/* horizontal bar */}
      <div
        className="absolute top-1/2 left-5 right-5 h-[3px] rounded-sm -translate-y-1/2"
        style={{
          background: "linear-gradient(90deg, var(--ring-wire), color-mix(in srgb, var(--ring-wire) 35%, white), var(--ring-wire))",
        }}
      />
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="relative z-10 w-[18px] h-[24px]"
          style={{
            borderRadius: "50% 50% 0 0 / 60% 60% 0 0",
            border: "2.5px solid var(--ring-wire)",
            borderBottom: "none",
            background: "var(--bg-secondary)",
            boxShadow: "inset -1px -2px 3px rgba(0,0,0,0.15), 0 4px 10px var(--shadow-soft)",
          }}
        />
      ))}
    </div>
  );
}