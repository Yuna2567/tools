export default function Logo({ className }: { className?: string }) {
  // 工具箱：單線、近似手繪的簡潔標記
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 箱體 */}
      <rect x="4" y="14" width="32" height="20" rx="2.5" />
      {/* 開合線 */}
      <path d="M4 21 h32" />
      {/* 提把 */}
      <path d="M14 14 c0-4 2.7-6.5 6-6.5 s6 2.5 6 6.5" />
      {/* 鎖扣 */}
      <path d="M18.5 21 v3 h3 v-3" />
    </svg>
  );
}
