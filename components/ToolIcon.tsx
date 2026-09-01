type Props = { name: string; className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function ToolIcon({ name, className }: Props) {
  switch (name) {
    case "/lottery":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="26" r="15" />
          <circle cx="24" cy="26" r="3.2" />
          <path d="M24 11v4M24 37v4M9 26h4M35 26h4M13.4 15.4l2.8 2.8M31.8 33.8l2.8 2.8M34.6 15.4l-2.8 2.8M16.2 33.8l-2.8 2.8" />
          <path d="M24 6l3 6h-6z" fill="currentColor" />
        </svg>
      );
    case "/pomodoro":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="27" r="14" />
          <path d="M24 27V17M24 27l7 4" />
          <path d="M24 9c-1.5-2-4-3-6-2.5M24 9c1.5-2 4-3 6-2.5M24 9v4" />
        </svg>
      );
    case "/omikuji":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M16 20v18a8 3 0 0 0 16 0V20" />
          <ellipse cx="24" cy="20" rx="8" ry="3" />
          <path d="M22 20 18 6M25 20 24 5M28 20 31 7" />
          <path d="M17.6 9.4 19.2 9M23.5 8h1.4M29.2 9.6 30.8 10.2" />
        </svg>
      );
    case "/worldclock":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="15" />
          <path d="M24 9c-4.5 4-4.5 26 0 30M24 9c4.5 4 4.5 26 0 30" />
          <path d="M9.5 19h29M9.5 29h29" />
        </svg>
      );
    case "/gacha":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="18" r="12" />
          <circle cx="21" cy="15" r="3" />
          <circle cx="28" cy="20" r="2.4" />
          <path d="M12 26h24v12a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2z" />
          <path d="M20 40v3h8v-3" />
          <circle cx="24" cy="33" r="3.4" />
        </svg>
      );
    default:
      return null;
  }
}
