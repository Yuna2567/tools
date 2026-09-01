export default function Logo({ className }: { className?: string }) {
  // 工具箱標記：帶凹口提把的箱體，單色、平塗、可縮到 16px
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      {/* 提把 */}
      <path
        d="M13 15 C13 10.6 16.1 8 20 8 C23.9 8 27 10.6 27 15"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* 箱體（上緣中央凹口讓提把穿過；中央鎖扣鏤空）*/}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 15 H13.4 A7 7 0 0 0 26.6 15 H35.5 A2.5 2.5 0 0 1 38 17.5 V33 A2.5 2.5 0 0 1 35.5 35.5 H4.5 A2.5 2.5 0 0 1 2 33 V17.5 A2.5 2.5 0 0 1 4.5 15 Z M17.2 22.6 h5.6 v5.6 h-5.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}
