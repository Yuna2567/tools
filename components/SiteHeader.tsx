import Link from "next/link";
import Logo from "@/components/Logo";
import { TOOLS } from "@/lib/tools";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-tb-line bg-tb-bg">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-tb-ink" />
          <span className="font-display text-[15px] font-bold tracking-tight text-tb-ink">
            工具箱
          </span>
          <span className="tb-eyebrow hidden text-tb-ink-soft sm:inline">
            Toolbox
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-[13px] font-medium text-tb-ink-soft transition-colors hover:text-tb-ink"
            >
              <span className="sm:hidden">{t.emoji}</span>
              <span className="hidden sm:inline">{t.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
