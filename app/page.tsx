import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CircleArrow, DotRow, Rule } from "@/components/ui";
import ToolIcon from "@/components/ToolIcon";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section className="relative py-16 sm:py-24">
          <span className="pointer-events-none absolute -left-6 top-24 hidden text-[11px] uppercase tracking-[0.28em] text-tb-ink-soft [writing-mode:vertical-rl] xl:block">
            工具箱 ｜ Toolbox
          </span>
          <span className="tb-eyebrow block text-tb-ink-soft">
            日常小工具 · Since 2026
          </span>
          <h1 className="mt-5 text-[3.5rem] font-extrabold leading-[0.95] tracking-tight text-tb-ink sm:text-[6rem]">
            工具箱
          </h1>
          <p className="tb-display mt-2 text-2xl text-tb-ink-soft sm:text-4xl">
            Toolbox
          </p>

          <div className="mt-10 grid gap-8 border-t border-tb-line pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-md text-[15px] leading-7 text-tb-ink">
              四個各司其職的小工具，收在同一個盒子裡。
              抽獎、專注、看運勢、對時差——
              不用註冊、不用安裝，點開就能用，資料只留在你的裝置。
            </p>
            <a
              href="#tools"
              className="group inline-flex items-center gap-3 self-start text-[11px] uppercase tracking-[0.2em] text-tb-ink-soft sm:self-end"
            >
              往下看
              <CircleArrow className="text-tb-ink transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </section>

        {/* Tools */}
        <section id="tools" className="scroll-mt-20 pb-8">
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {TOOLS.map((t, i) => (
              <Link key={t.href} href={t.href} className="group flex flex-col">
                <Rule />
                <div className="flex items-start justify-between pt-4">
                  <div>
                    <p className="tb-display text-[1.6rem] text-tb-ink sm:text-[2rem]">
                      {t.en}
                    </p>
                    <p className="mt-1.5 text-lg font-bold text-tb-ink">
                      {t.name}
                    </p>
                  </div>
                  <CircleArrow
                    size={30}
                    className="mt-1 shrink-0 text-tb-ink transition-transform group-hover:translate-x-1"
                  />
                </div>

                <p className="mt-2 text-[13px] leading-6 text-tb-ink-soft">
                  {t.blurb}
                </p>

                <DotRow className="mt-4" />

                <div className="relative mt-4 flex aspect-[16/10] items-center justify-center overflow-hidden bg-tb-panel">
                  <span
                    aria-hidden
                    className="tb-display absolute -bottom-4 -left-1 text-[5rem] leading-none text-tb-line"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ToolIcon
                    name={t.href}
                    className="relative h-36 w-36 text-tb-ink transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-[12px] text-tb-ink-soft">
                  <span className="leading-6">{t.detail}</span>
                </div>
                <span className="mt-3 text-[10px] uppercase tracking-[0.18em] text-tb-ink-soft">
                  No.{String(i + 1).padStart(2, "0")} — 免費 · 離線可用
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
