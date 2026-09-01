"use client";

import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";

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
  super: "#f0a29b",
  great: "#f2a9be",
  good: "#f7c9d5",
  mid: "#f4d59f",
  bad: "#cfd5db",
  worst: "#b9bfc7",
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
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center gap-8 px-6 py-12">
      <PageHeader emoji="🎋" title="好運抽籤">
        誠心默念想問的事，搖動籤筒抽出今日運勢（超大吉～大凶）。每天一支，隔日可再抽。
      </PageHeader>

      {/* 籤筒 */}
      <button
        onClick={draw}
        disabled={drawing}
        className="omikuji-tube"
        style={drawing ? { animation: "omikuji-shake 0.3s ease-in-out infinite" } : undefined}
        aria-label="抽籤"
      >
        <span className="tube-sticks">
          <span className="tube-stick" data-a="-25" style={{ left: "-32px", height: "148px" }} />
          <span className="tube-stick" data-a="-9" style={{ left: "-12px", height: "126px" }} />
          <span className="tube-stick" data-a="8" style={{ left: "6px", height: "140px" }}>
            <span className="tube-knot" />
          </span>
          <span className="tube-stick" data-a="23" style={{ left: "22px", height: "112px" }} />
        </span>

        <span className="tube-box">
          <span className="tube-box-depth" />
          <span className="tube-box-face">
            <span className="tube-box-mouth" />
            <span className="tube-box-word">籤筒</span>
          </span>
        </span>

        <span className="tube-label">
          {drawing ? "搖籤中…" : result ? "再抽一支" : "抽 籤"}
        </span>
      </button>

      <style>{`
        @keyframes omikuji-shake {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes omikuji-reveal {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
        .omikuji-tube {
          position: relative;
          width: 210px;
          height: 250px;
          background: transparent;
          transition: transform 0.15s ease;
          transform-origin: 50% 90%;
        }
        .omikuji-tube:not(:disabled):hover { transform: translateY(-4px); }
        .omikuji-tube:disabled { cursor: wait; }

        .tube-sticks { position: absolute; left: 105px; bottom: 120px; width: 0; height: 0; }
        .tube-stick {
          position: absolute; bottom: 0; width: 11px;
          border-radius: 2px 2px 1px 1px;
          transform-origin: bottom center;
          background:
            repeating-linear-gradient(0deg, transparent 0 21px, rgba(74,48,8,0.28) 21px 22px),
            linear-gradient(90deg, #c68f2c 0%, #f1d585 44%, #e3ad42 72%, #ac7d1e 100%);
          border: 1px solid #9c7220;
          box-shadow: 0 3px 5px rgba(0,0,0,0.18);
        }
        .tube-stick[data-a="-25"] { transform: rotate(-25deg); }
        .tube-stick[data-a="-9"] { transform: rotate(-9deg); }
        .tube-stick[data-a="8"] { transform: rotate(8deg); }
        .tube-stick[data-a="23"] { transform: rotate(23deg); }
        .tube-knot {
          position: absolute; top: 12px; left: 50%; width: 11px; height: 11px;
          margin-left: -5.5px; border-radius: 9999px; background: #d94a4a;
          box-shadow: 0 7px 0 -3px #d94a4a;
        }

        .tube-box { position: absolute; left: 44px; bottom: 0; width: 122px; height: 150px; }
        .tube-box-depth {
          position: absolute; left: 9px; top: -9px; width: 100%; height: 100%;
          background: #e8e3d6; border: 1.5px solid #2c2c2c;
        }
        .tube-box-face {
          position: absolute; inset: 0; overflow: hidden;
          background: linear-gradient(118deg, #ffffff 0%, #ffffff 58%, #efeade 100%);
          border: 1.5px solid #2c2c2c;
        }
        .tube-box-mouth {
          position: absolute; left: 15px; right: 15px; top: 11px; height: 12px;
          background: #cec7b5; border: 1.5px solid #2c2c2c;
        }
        .tube-box-word {
          position: absolute; left: 0; right: 0; top: 34px; margin: 0 auto;
          writing-mode: vertical-rl; text-orientation: upright;
          font-size: 30px; font-weight: 800; letter-spacing: 4px;
          color: #2c2c2c; text-align: center;
        }
        .tube-label {
          position: absolute; top: 34px; right: -8px;
          background: #1f1f1f; color: #fff;
          font-weight: 800; font-size: 14px; letter-spacing: 2px;
          padding: 6px 14px; border-radius: 9999px; white-space: nowrap;
          box-shadow: 0 8px 16px -6px rgba(0,0,0,0.4);
        }

        .omikuji-frame {
          padding: 18px;
          border-radius: 10px;
          background-color: #f2a49c;
          background-image:
            repeating-linear-gradient(45deg, rgba(255,255,255,0.28) 0 2px, transparent 2px 15px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.28) 0 2px, transparent 2px 15px);
          box-shadow: 0 22px 50px -22px rgba(198,56,92,0.55);
          animation: omikuji-reveal 0.5s ease both;
        }
        .omikuji-paper {
          background: #fff;
          border: 1.5px solid #2c2c2c;
          padding: 26px 22px 16px;
          color: #2c2c2c;
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
            <div className="my-6 flex items-center justify-center gap-6">
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
              <div className="omikuji-vertical h-72 text-[15px] leading-8">
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
            <span className="rounded-full bg-white/80 px-3 py-1 font-medium text-tb-rose-deep ring-1 ring-tb-line">
              幸運數字 {result.luckyNumber}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 font-medium text-tb-rose-deep ring-1 ring-tb-line">
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
