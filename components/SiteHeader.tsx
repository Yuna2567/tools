import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-tb-line/70 bg-[#fdeef2]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-tb-rose">
            <span className="h-2 w-2 rounded-full bg-tb-gold" />
            <span className="absolute inset-0 rounded-full ring-2 ring-tb-rose/30 ring-offset-2 ring-offset-[#fdeef2]" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-tb-rose-deep">
            工具箱
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-full px-3 py-1.5 font-medium text-tb-ink/70 transition-colors hover:bg-white/70 hover:text-tb-rose-deep"
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
