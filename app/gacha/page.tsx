"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CircleArrow } from "@/components/ui";

const STORAGE_KEY = "gacha.items";
const DEFAULT_ITEMS = "拉麵\n咖哩\n炒飯\n壽司\n漢堡\n吃土";

function parseItems(raw: string): string[] {
  return raw
    .split(/[\n,，、]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// 玻璃罩內的扭蛋（固定座標，避免 hydration 不一致）
const BALLS: [number, number, number][] = [
  [120, 170, 18],
  [86, 160, 15],
  [154, 158, 16],
  [64, 140, 13],
  [176, 138, 13],
  [104, 138, 15],
  [138, 142, 14],
  [120, 112, 13],
  [88, 114, 12],
  [152, 112, 12],
  [110, 84, 11],
  [148, 80, 10],
  [80, 86, 10],
  [120, 56, 9],
  [170, 104, 10],
  [70, 110, 10],
];

// 掉出機台、散在地上的扭蛋
const GROUND_BALLS: [number, number, number][] = [
  [70, 330, 11],
  [166, 334, 9],
  [118, 320, 8],
];

function Ball({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#14130f" strokeWidth={1.7} />
      <circle cx={cx - r * 0.33} cy={cy - r * 0.1} r={1.4} fill="#14130f" />
      <circle cx={cx + r * 0.33} cy={cy - r * 0.1} r={1.4} fill="#14130f" />
      <path
        d={`M${cx - r * 0.3} ${cy + r * 0.18} Q${cx} ${cy + r * 0.46} ${cx + r * 0.3} ${cy + r * 0.18}`}
        fill="none"
        stroke="#14130f"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </g>
  );
}

type Phase = "idle" | "rolling" | "done";

export default function GachaPage() {
  const [raw, setRaw] = useState(DEFAULT_ITEMS);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [knob, setKnob] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== null) setRaw(saved);
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, raw);
  }, [raw]);

  const items = useMemo(() => parseItems(raw), [raw]);

  function roll() {
    if (phase === "rolling" || items.length < 1) return;
    const pick = items[Math.floor(Math.random() * items.length)];
    setResult(null);
    setPhase("rolling");
    setKnob((k) => k + 220);
    timers.current.push(
      setTimeout(() => {
        setResult(pick);
        setPhase("done");
        setHistory((h) => [pick, ...h].slice(0, 12));
      }, 850),
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-9 px-5 py-12 sm:px-8">
      <PageHeader eyebrow="Gachapon" title="扭蛋機">
        左側輸入項目，轉動旋鈕，蛋殼「喀」一聲彈開，隨機抽出一個結果。適合決定午餐吃什麼、換誰報告。
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* 項目輸入 */}
        <section className="flex flex-col gap-3">
          <label htmlFor="items" className="tb-eyebrow text-tb-ink-soft">
            項目（{items.length}）
          </label>
          <textarea
            id="items"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            disabled={phase === "rolling"}
            rows={11}
            placeholder={"項目一\n項目二\n項目三"}
            className="tb-input w-full resize-y font-mono text-sm leading-6 disabled:opacity-60"
          />
          <button
            onClick={() => {
              setRaw(DEFAULT_ITEMS);
              setHistory([]);
              setResult(null);
              setPhase("idle");
            }}
            disabled={phase === "rolling"}
            className="self-start text-xs text-tb-ink-soft underline underline-offset-2 hover:text-tb-ink disabled:opacity-50"
          >
            重設範例
          </button>

          {history.length > 0 && (
            <div className="mt-2 border-t border-tb-line pt-3">
              <p className="tb-eyebrow text-tb-ink-soft">剛剛轉到</p>
              <ol className="mt-2 flex flex-col gap-1 text-sm text-tb-ink-soft">
                {history.map((h, i) => (
                  <li key={`${h}-${i}`} className="tabular-nums">
                    <span className="mr-2 text-tb-line">
                      {String(history.length - i).padStart(2, "0")}
                    </span>
                    {h}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* 扭蛋機 */}
        <section className="flex flex-col items-center gap-6">
          <div className="tb-card w-full max-w-[380px] p-6">
            <div className="mb-1 flex items-center justify-between">
              <span className="tb-eyebrow text-tb-ink-soft">Gachapon</span>
              <span className="text-xs text-tb-ink-soft">{items.length} 顆</span>
            </div>

            <svg
              viewBox="0 0 240 348"
              className={`block w-full ${phase === "rolling" ? "gacha-shake" : ""}`}
            >
              {/* 玻璃罩 */}
              <circle cx="120" cy="100" r="88" fill="#cfe6ec" stroke="#14130f" strokeWidth="2.6" />
              {/* 反光 */}
              <path d="M62 58 Q78 40 106 38" fill="none" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" />
              <path d="M56 80 Q60 68 74 61" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
              {/* 扭蛋堆 */}
              {BALLS.map(([x, y, r], i) => (
                <Ball key={i} cx={x} cy={y} r={r} />
              ))}

              {/* 地上散落的扭蛋（在機身之後蓋不到，先畫）*/}
              {GROUND_BALLS.map(([x, y, r], i) => (
                <Ball key={`g${i}`} cx={x} cy={y} r={r} />
              ))}

              {/* 機身 */}
              <rect x="38" y="176" width="164" height="150" rx="14" fill="#c0512c" stroke="#14130f" strokeWidth="2.6" />

              {/* 商品窗 */}
              <rect x="54" y="192" width="58" height="34" rx="4" fill="#f4efe2" stroke="#14130f" strokeWidth="2" />
              <circle cx="83" cy="209" r="9" fill="#fff" stroke="#14130f" strokeWidth="1.6" />
              {/* 投幣孔 */}
              <rect x="150" y="196" width="18" height="5" rx="2.5" fill="#14130f" />

              {/* PULL 拉桿口 */}
              <rect x="176" y="206" width="10" height="46" rx="5" fill="#14130f" />
              <text x="181" y="266" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f4efe2">
                PULL
              </text>

              {/* 黃色轉鈕（扭的時候會轉）*/}
              <g
                style={{
                  transform: `rotate(${knob}deg)`,
                  transformOrigin: "104px 262px",
                  transition: "transform 0.85s cubic-bezier(.3,1.4,.4,1)",
                }}
              >
                <circle cx="104" cy="262" r="30" fill="#dca42b" stroke="#14130f" strokeWidth="2.6" />
                <rect x="99" y="234" width="10" height="56" rx="5" fill="#14130f" />
                <path d="M126 250 a24 24 0 0 1 3 12" fill="none" stroke="#14130f" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M129 262 l-3.5 -3 l4.5 -1 z" fill="#14130f" />
              </g>

              {/* 按鈕燈 */}
              <circle cx="150" cy="298" r="6" fill="#5c7150" stroke="#14130f" strokeWidth="2" />
              <circle cx="170" cy="298" r="6" fill="#5c7150" stroke="#14130f" strokeWidth="2" />

              {/* 出蛋口 */}
              <rect x="96" y="300" width="48" height="22" rx="4" fill="#f4efe2" stroke="#14130f" strokeWidth="2" />
              <path d="M96 311 h48" stroke="#14130f" strokeWidth="1.3" strokeDasharray="3 3" />
              <circle cx="112" cy="314" r="9" fill="#fff" stroke="#14130f" strokeWidth="1.7" />
              <circle cx="109" cy="313" r="1.3" fill="#14130f" />
              <circle cx="115" cy="313" r="1.3" fill="#14130f" />
            </svg>
          </div>

          <button
            onClick={roll}
            disabled={phase === "rolling" || items.length < 1}
            className="tb-btn tb-btn-primary"
          >
            {phase === "rolling"
              ? "轉動中…"
              : phase === "done"
                ? "再扭一顆"
                : "扭一下！"}
          </button>
          {items.length < 1 && (
            <p className="text-sm text-tb-clay">先在左邊輸入至少一個項目。</p>
          )}

          {/* 結果：蛋殼彈開 */}
          <div className="flex min-h-[168px] flex-col items-center justify-center gap-4">
            {result && (
              <>
                <div className={`gacha-egg ${phase === "done" ? "is-open" : ""}`}>
                  <span className="egg-half egg-top" />
                  <span className="egg-half egg-bot" />
                  <span className="egg-item">{result}</span>
                </div>
                <p className="flex items-center gap-2 text-sm text-tb-ink">
                  抽到了
                  <CircleArrow size={20} className="text-tb-ink" />
                </p>
              </>
            )}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes gacha-shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-3px) rotate(-1.4deg); }
          50% { transform: translateX(3px) rotate(1.4deg); }
          80% { transform: translateX(-2px) rotate(-0.8deg); }
        }
        .gacha-shake { animation: gacha-shake 0.28s ease-in-out infinite; }

        @keyframes gacha-pop {
          from { opacity: 0; transform: translateY(-24px) scale(0.9); }
          to { opacity: 1; transform: none; }
        }
        .gacha-egg {
          position: relative;
          width: 120px;
          height: 120px;
          animation: gacha-pop 0.35s ease both;
        }
        .egg-half {
          position: absolute;
          left: 0;
          width: 120px;
          height: 60px;
          border: 1.8px solid #14130f;
          transition: transform 0.5s cubic-bezier(.2,.85,.25,1);
        }
        .egg-top {
          top: 0;
          border-radius: 60px 60px 0 0;
          border-bottom: none;
          background: #dca42b;
        }
        .egg-bot {
          bottom: 0;
          border-radius: 0 0 60px 60px;
          background: #fff;
        }
        .gacha-egg.is-open .egg-top {
          transform: translate(-14px, -18px) rotate(-16deg);
        }
        .gacha-egg.is-open .egg-bot {
          transform: translateY(14px);
        }
        .egg-item {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          text-align: center;
          font-weight: 800;
          font-size: 17px;
          color: #14130f;
          opacity: 0;
          transition: opacity 0.35s ease 0.2s;
        }
        .gacha-egg.is-open .egg-item { opacity: 1; }
      `}</style>
    </main>
  );
}
