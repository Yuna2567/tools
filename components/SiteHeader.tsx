import Link from "next/link";
import Logo from "@/components/Logo";
import { TOOLS } from "@/lib/tools";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-tb-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-tb-ink" />
          <span className="font-display text-[14px] font-bold uppercase tracking-[0.14em] text-tb-ink">
            Toolbox
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-[11px] tracking-[0.12em] text-tb-ink-soft sm:gap-6">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="transition-colors hover:text-tb-ink"
            >
              <span className="sm:hidden">{t.emoji}</span>
              <span className="hidden font-display font-semibold uppercase sm:inline">
                {t.en}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="border-t border-tb-line" />
      </div>
    </header>
  );
}
