import Link from "next/link";
import Logo from "@/components/Logo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* 左欄：標語 + 索引（桌機置頂固定）*/}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-tb-ink" />
              <div className="leading-none">
                <p className="font-display text-2xl font-extrabold tracking-tight text-tb-ink">
                  工具箱
                </p>
                <p className="tb-eyebrow mt-1 text-tb-ink-soft">Toolbox</p>
              </div>
            </div>

            <p className="mt-8 text-[15px] leading-7 text-tb-ink">
              四個各司其職的小工具，
              <br className="hidden sm:block" />
              收在同一個盒子裡。
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-6 text-tb-ink-soft">
              不用註冊、不用安裝，點開就能用。
              每個工具的資料都只留在你這台裝置。
            </p>

            <ol className="mt-10 border-t border-tb-line">
              {TOOLS.map((t, i) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group flex items-baseline gap-4 border-b border-tb-line py-3.5"
                  >
                    <span className="font-display text-[13px] font-semibold text-tb-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-tb-ink">
                      {t.name}
                    </span>
                    <span className="text-tb-ink-soft transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* 右欄：色板 */}
          <div className="flex flex-col gap-5">
            {TOOLS.map((t, i) => (
              <Link
                key={t.href}
                href={t.href}
                className="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-lg p-7 sm:min-h-[17rem] sm:p-9"
                style={{ background: t.plate, color: t.plateInk }}
              >
                <div className="flex items-start justify-between">
                  <span className="tb-eyebrow opacity-70">
                    {String(i + 1).padStart(2, "0")} — {t.en}
                  </span>
                  <span
                    aria-hidden
                    className="text-4xl transition-transform duration-300 group-hover:-translate-y-1 sm:text-5xl"
                  >
                    {t.emoji}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {t.name}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 opacity-85">
                    {t.detail}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    打開工具
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
