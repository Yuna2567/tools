import Link from "next/link";
import Logo from "@/components/Logo";
import { TOOLS } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-tb-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:grid-cols-[1.6fr_1fr_1fr] sm:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6 text-tb-ink" />
            <span className="font-display text-[15px] font-bold text-tb-ink">
              工具箱
            </span>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-tb-ink-soft">
            一組小而完整的日常工具。沒有帳號、沒有廣告，
            所有資料只留在你的瀏覽器裡。
          </p>
        </div>

        <nav className="flex flex-col gap-2.5 text-[13px]">
          <span className="tb-eyebrow text-tb-ink-soft">工具</span>
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

        <div className="flex flex-col gap-2.5 text-[13px]">
          <span className="tb-eyebrow text-tb-ink-soft">關於</span>
          <span className="text-tb-ink-soft">以 Next.js 打造</span>
          <span className="text-tb-ink-soft">資料存於本機 localStorage</span>
        </div>
      </div>

      <div className="border-t border-tb-line">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 text-[11px] text-tb-ink-soft sm:px-8">
          <span>© 2026 工具箱</span>
          <span className="tb-eyebrow">Toolbox</span>
        </div>
      </div>
    </footer>
  );
}
