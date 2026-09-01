import type { ReactNode } from "react";

/** 章節上緣的髮絲線（含左端粗記號）*/
export function Rule({ className = "" }: { className?: string }) {
  return <div className={`tb-rule ${className}`} />;
}

/** afuri 風格的圓框箭頭 */
export function CircleArrow({
  className = "",
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1" />
      <path
        d="M10 13h6m-2.4-2.6L16.2 13l-2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 點點分隔 */
export function DotRow({ className = "" }: { className?: string }) {
  return (
    <div className={`tb-dots ${className}`} aria-hidden="true">
      · · · · · · · ·
    </div>
  );
}

/** LABEL｜子標 形式的小標題 */
export function Kicker({
  label,
  sub,
}: {
  label: string;
  sub?: ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 text-[11px] tracking-wide text-tb-ink-soft">
      <span className="font-display font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      {sub != null && (
        <>
          <span className="text-tb-line">｜</span>
          <span>{sub}</span>
        </>
      )}
    </span>
  );
}
