import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl overflow-x-clip px-5 sm:px-8">
        {/* Hero */}
        <section className="flex flex-col gap-10 py-14 sm:py-20 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-6">
          <div className="flex min-w-0 flex-col gap-6">
            <span className="font-display text-xs uppercase tracking-[0.35em] text-tb-rose">
              小工具合輯 · Toolbox
            </span>
            <h1 className="text-[2.75rem] font-black leading-[1.08] tracking-tight text-tb-rose-deep sm:text-6xl">
              抽個獎、<br />
              專心一下、<br />
              <span className="relative inline-block">
                看今天的運氣
                <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-tb-gold/60" />
              </span>
              。
            </h1>
            <p className="max-w-md text-base leading-7 text-tb-ink/70">
              三個各司其職的小工具，收在同一個粉紅色的盒子裡。
              不用註冊、不用安裝，點開就能用。
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/lottery" className="tb-btn tb-btn-primary">
                🎡 開始抽獎
              </Link>
              <Link href="#tools" className="tb-btn tb-btn-ghost">
                看看有什麼
              </Link>
            </div>
          </div>

          {/* 疊卡裝飾 */}
          <div className="relative mx-auto hidden h-72 w-full max-w-xs lg:block">
            {TOOLS.map((t, i) => (
              <div
                key={t.href}
                className="tb-card absolute inset-x-0 flex items-center gap-4 p-5"
                style={{
                  top: `${i * 68}px`,
                  transform: `rotate(${(i - 1) * 3}deg)`,
                  zIndex: TOOLS.length - i,
                }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tb-bg text-2xl">
                  {t.emoji}
                </span>
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.2em] text-tb-rose">
                    {t.en}
                  </p>
                  <p className="font-bold text-tb-rose-deep">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 工具列表 — 編輯式排版 */}
        <section id="tools" className="scroll-mt-20 border-t-2 border-tb-rose-deep/15 py-6">
          <div className="flex items-end justify-between py-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-tb-rose-deep">
              Three tools
            </h2>
            <span className="text-sm text-tb-ink/45">共三個</span>
          </div>

          <ul>
            {TOOLS.map((t, i) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="group grid grid-cols-[3rem_1fr] items-start gap-x-4 gap-y-2 border-t border-tb-line py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-x-8"
                >
                  <span className="font-display text-3xl font-bold text-tb-rose/40 transition-colors group-hover:text-tb-rose sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex min-w-0 flex-col gap-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-black text-tb-rose-deep sm:text-2xl">
                        {t.emoji} {t.name}
                      </h3>
                      <span className="font-display text-[11px] uppercase tracking-[0.2em] text-tb-ink/35">
                        {t.en}
                      </span>
                    </div>
                    <p className="text-[15px] font-medium text-tb-ink/80">{t.blurb}</p>
                    <p className="max-w-xl text-sm leading-6 text-tb-ink/55">
                      {t.detail}
                    </p>
                  </div>

                  <span className="col-start-2 mt-1 inline-flex items-center gap-1 text-sm font-bold text-tb-rose transition-transform group-hover:translate-x-1 sm:col-start-3 sm:mt-0">
                    打開 →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
