import Link from "next/link";
import Logo from "@/components/Logo";
import { Rule } from "@/components/ui";
import { TOOLS } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl px-5 sm:px-8">
      <Rule />
      <div className="grid gap-10 py-12 sm:grid-cols-[1.7fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6 text-tb-ink" />
            <span className="font-display text-[14px] font-bold uppercase tracking-[0.14em] text-tb-ink">
              Toolbox
            </span>
          </div>
          <p className="max-w-xs text-[12px] leading-6 text-tb-ink-soft">
            一組小而完整的日常工具。沒有帳號、沒有廣告，
            所有資料只留在你的瀏覽器裡。
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-[12px]">
          <span className="tb-eyebrow mb-1 text-tb-ink-soft">Tools</span>
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-tb-ink-soft transition-colors hover:text-tb-ink"
            >
              {t.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-[12px]">
          <span className="tb-eyebrow mb-1 text-tb-ink-soft">About</span>
          <span className="text-tb-ink-soft">以 Next.js 打造</span>
          <span className="text-tb-ink-soft">資料存於本機 localStorage</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-tb-line py-5 text-[10px] uppercase tracking-[0.16em] text-tb-ink-soft">
        <span>© 2026 Toolbox</span>
        <span className="font-display">工具箱</span>
      </div>
    </footer>
  );
}
