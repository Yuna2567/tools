"use client";

// 參考 "SPIN TO WIN" 轉盤：淡黃 / 白 雙色扇形，文字紫 / 粉交替
const SEGMENT_COLORS = ["#fce9ad", "#ffffff"];
const TEXT_COLORS = ["#8a7cd4", "#ef8fb5"];

/** 四捨五入到小數第 3 位，避免 SSR / CSR 浮點誤差造成 hydration mismatch */
const round = (n: number) => Math.round(n * 1000) / 1000;

/** 以正上方（12 點鐘方向）為 0 度、順時針為正 */
function pointOnCircle(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: round(cx + r * Math.sin(rad)), y: round(cy - r * Math.cos(rad)) };
}

type WheelProps = {
  entries: string[];
  rotation: number;
  spinning: boolean;
  onSpin: () => void;
  onTransitionEnd: () => void;
};

export default function Wheel({
  entries,
  rotation,
  spinning,
  onSpin,
  onTransitionEnd,
}: WheelProps) {
  const n = entries.length;
  const seg = n > 0 ? 360 / n : 360;
  const disabled = spinning || n < 2;

  // 幾何
  const svgW = 440;
  const svgH = 500;
  const cx = svgW / 2;
  const cy = 200;
  const rimOuter = 196;
  const rimMid = 178;
  const r = 168; // 扇形半徑
  const dotRing = 187;
  const bulbCount = Math.max(24, n * 4);

  return (
    <div
      className="relative w-full max-w-[480px] overflow-hidden rounded-[2rem] px-4 py-6"
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #fbd6e2 0%, #f7c1d6 60%, #f3b3cd 100%)",
      }}
    >
      {/* 陽光放射背景 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 40%, rgba(255,255,255,0.55) 0deg 7deg, rgba(255,255,255,0) 7deg 14deg)",
        }}
      />
      {/* 裝飾雲朵 */}
      <div className="pointer-events-none absolute left-3 top-24 h-6 w-14 rounded-full bg-white/70 blur-[1px]" />
      <div className="pointer-events-none absolute right-4 top-40 h-6 w-16 rounded-full bg-white/70 blur-[1px]" />

      {/* 拱形標題 */}
      <svg viewBox="0 0 440 90" className="relative mx-auto block w-full max-w-[420px]">
        <path id="wheel-arc" d="M 30 82 A 190 190 0 0 1 410 82" fill="none" />
        <text
          fill="#ffffff"
          fontSize="34"
          fontWeight="800"
          letterSpacing="4"
          style={{ paintOrder: "stroke" }}
          stroke="#f19bbd"
          strokeWidth="1"
        >
          <textPath href="#wheel-arc" startOffset="50%" textAnchor="middle">
            SPIN TO WIN
          </textPath>
        </text>
      </svg>

      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="relative -mt-2 block">
        {/* ── 底座 ── */}
        <ellipse cx={cx} cy={478} rx={170} ry={22} fill="#efa9c4" />
        <path
          d={`M ${cx - 46} 372 L ${cx - 62} 462 Q ${cx} 486 ${cx + 62} 462 L ${cx + 46} 372 Z`}
          fill="#a98fd9"
        />
        <ellipse cx={cx} cy={372} rx={46} ry={13} fill="#c3aee9" />

        {/* ── 外圈 ── */}
        <circle cx={cx} cy={cy} r={rimOuter} fill="#f3aecb" />
        <circle cx={cx} cy={cy} r={rimMid} fill="#f7c4d9" />
        {Array.from({ length: bulbCount }).map((_, i) => {
          const ang = (360 / bulbCount) * i;
          const p = pointOnCircle(cx, cy, dotRing, ang);
          return <circle key={i} cx={p.x} cy={p.y} r={3.4} fill="#f4c95b" />;
        })}

        {/* ── 旋轉盤 ── */}
        <g
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: spinning
              ? "transform 4.5s cubic-bezier(0.15, 0, 0, 1)"
              : "none",
          }}
        >
          <circle cx={cx} cy={cy} r={r} fill={SEGMENT_COLORS[1]} />
          {n >= 1 &&
            entries.map((name, i) => {
              const a0 = seg * i;
              const a1 = seg * (i + 1);
              const p0 = pointOnCircle(cx, cy, r, a0);
              const p1 = pointOnCircle(cx, cy, r, a1);
              const largeArc = a1 - a0 > 180 ? 1 : 0;
              const mid = a0 + seg / 2;
              const label = pointOnCircle(cx, cy, r * 0.62, mid);
              const rot = mid > 180 ? mid + 90 : mid - 90;
              const d =
                n === 1
                  ? `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`
                  : `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`;
              return (
                <g key={`${name}-${i}`}>
                  <path d={d} fill={SEGMENT_COLORS[i % 2]} />
                  <text
                    x={label.x}
                    y={label.y}
                    fill={TEXT_COLORS[i % 2]}
                    fontSize={n > 10 ? 12 : 16}
                    fontWeight={800}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${rot} ${label.x} ${label.y})`}
                  >
                    {name.length > 12 ? name.slice(0, 12) + "…" : name}
                  </text>
                </g>
              );
            })}
        </g>

        {/* ── 中央 GO 按鈕（固定，尖端指向正上方中獎扇形）── */}
        <g
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            filter: "drop-shadow(0 4px 6px rgba(160,110,170,0.4))",
          }}
          onClick={onSpin}
        >
          <circle cx={cx} cy={cy} r={40} fill="#f3aecb" />
          <path
            d={`M ${cx} ${cy - 52} L ${cx - 15} ${cy - 18} L ${cx + 15} ${cy - 18} Z`}
            fill="#9c86d8"
          />
          <circle cx={cx} cy={cy} r={31} fill="#9c86d8" />
          <circle cx={cx} cy={cy} r={31} fill="none" stroke="#b7a4e6" strokeWidth={3} />
          <text
            x={cx}
            y={cy + 1}
            fill="#ffffff"
            fontSize={22}
            fontWeight={900}
            letterSpacing={1}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {spinning ? "…" : "GO"}
          </text>
        </g>
      </svg>
    </div>
  );
}
