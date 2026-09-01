"use client";

// 平塗雙色扇形，文字靛藍 / 磚紅交替
const SEGMENT_COLORS = ["#efe7d3", "#e7c874"];
const TEXT_COLORS = ["#34417a", "#8a3a20"];
const INK = "#23201a";
const AMBER = "#dfa22a";
const INDIGO = "#34417a";
const CLAY = "#bb4e2b";

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

  const svgW = 420;
  const cx = svgW / 2;
  const cy = 205;
  const svgH = cy + 250;
  const rimOuter = 194;
  const rimMid = 179;
  const r = 168;
  const dotRing = 186;
  const bulbCount = Math.max(24, n * 4);

  return (
    <div className="tb-card w-full max-w-[440px] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="tb-eyebrow text-tb-ink-soft">Spin to Win</span>
        <span className="text-xs text-tb-ink-soft">{n} 項</span>
      </div>

      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="block">
        {/* 底座 */}
        <path
          d={`M ${cx - 42} ${cy + 176} L ${cx - 54} ${cy + 232} Q ${cx} ${cy + 246} ${cx + 54} ${cy + 232} L ${cx + 42} ${cy + 176} Z`}
          fill={INK}
        />

        {/* 外圈 */}
        <circle cx={cx} cy={cy} r={rimOuter} fill={INK} />
        <circle cx={cx} cy={cy} r={rimMid} fill="#f3efe4" />
        {Array.from({ length: bulbCount }).map((_, i) => {
          const ang = (360 / bulbCount) * i;
          const p = pointOnCircle(cx, cy, dotRing, ang);
          return <circle key={i} cx={p.x} cy={p.y} r={3.2} fill={AMBER} />;
        })}

        {/* 旋轉盤 */}
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
          <circle cx={cx} cy={cy} r={r} fill={SEGMENT_COLORS[0]} />
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
                  <path d={d} fill={SEGMENT_COLORS[i % 2]} stroke="#f3efe4" strokeWidth={1.5} />
                  <text
                    x={label.x}
                    y={label.y}
                    fill={TEXT_COLORS[i % 2]}
                    fontSize={n > 10 ? 12 : 16}
                    fontWeight={700}
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

        {/* 中央 GO 按鈕（固定，尖端指向正上方中獎扇形）*/}
        <g
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          onClick={onSpin}
        >
          <path
            d={`M ${cx} ${cy - 62} L ${cx - 17} ${cy - 20} L ${cx + 17} ${cy - 20} Z`}
            fill={CLAY}
            stroke={INK}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <circle cx={cx} cy={cy} r={34} fill={INDIGO} />
          <circle cx={cx} cy={cy} r={34} fill="none" stroke={INK} strokeWidth={2} />
          <text
            x={cx}
            y={cy + 1}
            fill="#f3efe4"
            fontSize={22}
            fontWeight={800}
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
