import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-tb-line/70 bg-white/45">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tb-rose">
              <span className="h-1.5 w-1.5 rounded-full bg-tb-gold" />
            </span>
            <span className="font-display text-base font-bold text-tb-rose-deep">
              工具箱
            </span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-tb-ink/60">
            一組小而美的日常工具。沒有帳號、沒有廣告，
            所有資料只留在你的瀏覽器裡。
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-tb-ink/40">
            工具
          </span>
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-tb-ink/70 transition-colors hover:text-tb-rose-deep"
            >
              {t.emoji} {t.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-tb-ink/40">
            關於
          </span>
          <span className="text-tb-ink/70">以 Next.js 打造</span>
          <span className="text-tb-ink/70">資料儲存於本機 localStorage</span>
        </div>
      </div>

      <div className="border-t border-tb-line/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 py-5 text-xs text-tb-ink/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 工具箱</span>
          <span className="font-display tracking-[0.2em]">TOOLBOX</span>
        </div>
      </div>
    </footer>
  );
}
