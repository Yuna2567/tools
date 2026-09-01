"use client";

import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CircleArrow } from "@/components/ui";

type Tone = "super" | "great" | "good" | "mid" | "bad" | "worst";

type Fortune = {
  name: string;
  weight: number;
  tone: Tone;
  headline: string; // 中央四字祝詞
  verse: string; // 籤詩
  summary: string; // 直書內文
};

const FORTUNES: Fortune[] = [
  {
    name: "超大吉",
    weight: 2,
    tone: "super",
    headline: "馬到成功",
    verse: "萬事俱備時，一飛則沖天",
    summary: "萬事俱備的你，勇敢迎接挑戰，就能獲得成功、享受豐收的果實。",
  },
  {
    name: "大吉",
    weight: 5,
    tone: "great",
    headline: "鵬程萬里",
    verse: "雲開見月明，枯木又逢春",
    summary: "諸事順遂，把握良機大膽前行，貴人相助、心想事成。",
  },
  {
    name: "中吉",
    weight: 11,
    tone: "good",
    headline: "漸入佳境",
    verse: "順風行舟穩，前路漸開闊",
    summary: "運勢平穩上揚，踏實努力便有好結果，切勿急躁。",
  },
  {
    name: "小吉",
    weight: 15,
    tone: "good",
    headline: "積少成多",
    verse: "細水長流處，福氣藏其中",
    summary: "小有收穫，維持好習慣、與人和善，好事會慢慢累積。",
  },
  {
    name: "吉",
    weight: 20,
    tone: "mid",
    headline: "平安順遂",
    verse: "平地起微風，安然度今朝",
    summary: "平順的一天，按部就班即可，不必強求。",
  },
  {
    name: "半吉",
    weight: 15,
    tone: "mid",
    headline: "謹守則安",
    verse: "半明半暗時，靜候雲霧散",
    summary: "吉凶參半，凡事多想一步、留有餘地，謹慎則吉。",
  },
  {
    name: "末吉",
    weight: 13,
    tone: "mid",
    headline: "先苦後甘",
    verse: "先苦而後甘，守得雲開日",
    summary: "先低後高，眼前不順也別放棄，轉機在後頭。",
  },
  {
    name: "凶",
    weight: 10,
    tone: "bad",
    headline: "靜守待時",
    verse: "逆水行舟日，宜守不宜攻",
    summary: "諸事不宜衝動，低調行事、留意言行，避免與人爭執。",
  },
  {
    name: "大凶",
    weight: 4,
    tone: "worst",
    headline: "忍過難關",
    verse: "風雨欲來時，靜心可平安",
    summary: "運勢低迷，重大決定暫緩，多休息、顧健康，忍過此關便好。",
  },
];

const DIAMOND_FILL: Record<Tone, string> = {
  super: "#bb4e2b",
  great: "#d98b3f",
  good: "#dfa22a",
  mid: "#e8d19a",
  bad: "#c8c3b2",
  worst: "#a9a596",
};

const ASPECTS = {
  願望: [
    "誠心則能達成，勿三心二意。",
    "時機未到，再等等便有轉機。",
    "需他人幫助方能成事。",
    "如願，但比預期慢一些。",
  ],
  戀愛: [
    "主動一點，好緣分就在身邊。",
    "以真心相待，感情漸入佳境。",
    "先沉澱自己，緣分自然來。",
    "多點耐心與傾聽，勿因小事爭吵。",
  ],
  事業: [
    "把握機會展現實力，會被看見。",
    "穩紮穩打，不宜貿然換跑道。",
    "與同事合作能事半功倍。",
    "先蹲後跳，累積實力等時機。",
  ],
  財運: [
    "正財穩定，偏財不可貪。",
    "節制開銷，量入為出為上。",
    "有意外小進帳，記得分享福氣。",
    "投資宜保守，勿聽信明牌。",
  ],
  健康: [
    "作息正常，身體自然輕盈。",
    "留意腸胃，飲食清淡為宜。",
    "多走出戶外曬曬太陽。",
    "壓力偏大，記得深呼吸與放鬆。",
  ],
} as const;

const COLORS = ["朱紅", "金黃", "湖水藍", "翠綠", "藕粉", "米白", "靛紫", "橘"];
const DIRECTIONS = ["東", "東南", "南", "西南", "西", "西北", "北", "東北"];

type DrawResult = {
  date: string;
  fortuneName: string;
  aspects: Record<string, string>;
  luckyNumber: number;
  luckyColor: string;
  luckyDirection: string;
};

const STORAGE_KEY = "omikuji.today";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawFortune(): Fortune {
  const total = FORTUNES.reduce((s, f) => s + f.weight, 0);
  let x = Math.random() * total;
  for (const f of FORTUNES) {
    if (x < f.weight) return f;
    x -= f.weight;
  }
  return FORTUNES[0];
}

function makeResult(): DrawResult {
  const f = drawFortune();
  const aspects: Record<string, string> = {};
  for (const key of Object.keys(ASPECTS) as (keyof typeof ASPECTS)[]) {
    aspects[key] = pick(ASPECTS[key]);
  }
  return {
    date: todayStr(),
    fortuneName: f.name,
    aspects,
    luckyNumber: Math.floor(Math.random() * 99) + 1,
    luckyColor: pick(COLORS),
    luckyDirection: pick(DIRECTIONS),
  };
}

export default function OmikujiPage() {
  const [result, setResult] = useState<DrawResult | null>(null);
  const [drawing, setDrawing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as DrawResult;
        if (saved.date === todayStr()) {
          // 還原今日已抽的籤（一次性同步外部狀態）
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setResult(saved);
        }
      } catch {
        /* 忽略損毀資料 */
      }
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function draw() {
    if (drawing) return;
    setDrawing(true);
    setResult(null);
    timer.current = setTimeout(() => {
      const r = makeResult();
      setResult(r);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
      setDrawing(false);
    }, 950);
  }

  const fortune = result
    ? FORTUNES.find((f) => f.name === result.fortuneName) ?? FORTUNES[0]
    : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center gap-9 px-5 py-12 sm:px-8">
      <PageHeader eyebrow="Daily Fortune" title="好運抽籤">
        誠心默念想問的事，搖動籤筒抽出今日運勢（超大吉～大凶）。每天一支，隔日可再抽。
      </PageHeader>

      {/* 籤筒（單線繪製）*/}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={draw}
          disabled={drawing}
          aria-label="抽籤"
          className="omikuji-shaker"
        >
          <svg viewBox="0 0 180 250" className="block h-60 w-auto">
            {/* 竹籤（先畫，下段會被筒身與筒口蓋住）*/}
            {[
              { deg: -19, len: 96, dot: false },
              { deg: -4, len: 108, dot: false },
              { deg: 16, len: 82, dot: true },
            ].map((s, i) => {
              const top = 104 - s.len;
              return (
                <g key={i} transform={`rotate(${s.deg} 90 104)`}>
                  <rect
                    x={84}
                    y={top}
                    width={12}
                    height={s.len}
                    rx={2}
                    fill="#fff"
                    stroke="#14130f"
                    strokeWidth={1.6}
                  />
                  <line x1={84} y1={top + 13} x2={96} y2={top + 13} stroke="#14130f" strokeWidth={1.4} />
                  <line x1={84} y1={top + 21} x2={96} y2={top + 21} stroke="#14130f" strokeWidth={1.4} />
                  {s.dot && <circle cx={90} cy={top + 6} r={3.6} fill="#c0512c" />}
                </g>
              );
            })}

            {/* 筒身 */}
            <path
              d="M56 96 L56 206 Q56 222 72 222 L108 222 Q124 222 124 206 L124 96"
              fill="#fff"
              stroke="#14130f"
              strokeWidth={1.8}
              strokeLinejoin="round"
            />
            {/* 筒口 */}
            <ellipse
              cx={90}
              cy={96}
              rx={34}
              ry={11}
              fill="#f2f0ea"
              stroke="#14130f"
              strokeWidth={1.8}
            />
            {/* 直書：兩字各自置中，避免 writing-mode 造成偏移 */}
            <text
              x={90}
              y={144}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={28}
              fontWeight={800}
              fill="#14130f"
            >
              御
            </text>
            <text
              x={90}
              y={180}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={28}
              fontWeight={800}
              fill="#14130f"
            >
              籤
            </text>
          </svg>
        </button>

        <span className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-tb-ink">
          {drawing ? "搖籤中…" : result ? "再搖一支" : "輕觸籤筒抽一支"}
          {!drawing && <CircleArrow size={22} className="text-tb-ink" />}
        </span>
      </div>

      <style>{`
        @keyframes omikuji-shake {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes omikuji-reveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
        .omikuji-shaker {
          transition: transform 0.15s ease;
          transform-origin: 50% 82%;
        }
        .omikuji-shaker:not(:disabled):hover { transform: translateY(-4px); }
        .omikuji-shaker:disabled {
          cursor: wait;
          animation: omikuji-shake 0.3s ease-in-out infinite;
        }

        .omikuji-frame {
          padding: 16px;
          border: 1px solid #14130f;
          background-color: #fbfbf9;
          background-image:
            repeating-linear-gradient(45deg, #e6e3db 0 1px, transparent 1px 16px),
            repeating-linear-gradient(-45deg, #e6e3db 0 1px, transparent 1px 16px);
          animation: omikuji-reveal 0.4s ease both;
        }
        .omikuji-paper {
          background: #ffffff;
          border: 1.5px solid #14130f;
          padding: 26px 22px 16px;
          color: #14130f;
        }
        .omikuji-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>

      {/* 籤詩 */}
      {result && fortune && !drawing && (
        <div className="omikuji-frame w-full max-w-[340px]">
          <article className="omikuji-paper">
            {/* 抬頭 */}
            <div className="text-center">
              <p className="text-lg font-black tracking-[0.35em]">工具箱 御籤</p>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-[#2c2c2c]/60">
                TOOLBOX OMIKUJI ・ SINCE 2026
              </p>
            </div>

            {/* 菱形徽記 */}
            <div className="my-8 flex items-center justify-center gap-6">
              <span className="text-[11px] tracking-[0.25em] text-[#2c2c2c]/70">馭馬奔騰</span>
              <span
                className="flex h-14 w-14 rotate-45 items-center justify-center border border-[#2c2c2c]"
                style={{ background: DIAMOND_FILL[fortune.tone] }}
              >
                <span className="-rotate-45 text-xl font-black">馬</span>
              </span>
              <span className="text-[11px] tracking-[0.25em] text-[#2c2c2c]/70">之年運勢</span>
            </div>

            {/* 籤名 */}
            <div className="border-y-2 border-[#2c2c2c] py-3 text-center">
              <span className="text-5xl font-black tracking-[0.12em]">{fortune.name}</span>
            </div>

            {/* 四字祝詞 */}
            <div className="border-b-2 border-[#2c2c2c] py-4 text-center">
              <span className="text-2xl font-bold tracking-[0.4em]">{fortune.headline}</span>
            </div>

            {/* 直書內文 + 幸運色 */}
            <div className="my-6 flex justify-center">
              <div className="omikuji-vertical h-[19rem] text-[15px] leading-8">
                <p className="tracking-[0.12em]">{fortune.summary}</p>
                <p className="ml-5 tracking-[0.2em] text-[#2c2c2c]/80">
                  「{fortune.verse}」
                </p>
                <p className="ml-5 font-semibold tracking-[0.25em]">
                  幸運色：{result.luckyColor}
                </p>
              </div>
            </div>

            <p className="text-center text-[10px] tracking-[0.3em] text-[#2c2c2c]/50">
              {result.date} ・ 工具箱
            </p>
          </article>
        </div>
      )}

      {/* 幸運資訊 + 各面向 */}
      {result && fortune && !drawing && (
        <div className="flex w-full max-w-[340px] flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="rounded-sm border border-tb-line bg-tb-card px-3 py-1 font-medium text-tb-ink">
              幸運數字 {result.luckyNumber}
            </span>
            <span className="rounded-sm border border-tb-line bg-tb-card px-3 py-1 font-medium text-tb-ink">
              吉利方位 {result.luckyDirection}
            </span>
          </div>

          <dl className="grid w-full gap-2 sm:grid-cols-1">
            {Object.entries(result.aspects).map(([k, v]) => (
              <div
                key={k}
                className="tb-card flex items-baseline gap-3 px-4 py-2.5 text-sm"
              >
                <dt className="shrink-0 font-bold text-tb-rose">{k}</dt>
                <dd className="text-tb-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {!result && !drawing && (
        <p className="text-sm text-tb-ink/40">尚未抽籤，點上方籤筒開始。</p>
      )}
    </main>
  );
}
