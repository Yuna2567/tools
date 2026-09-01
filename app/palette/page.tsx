"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Kicker, Rule } from "@/components/ui";

type Role = "bg" | "surface" | "text" | "muted" | "border" | "primary";
type Scheme = Record<Role, string>;
type Palette = { name: string; en: string; light: Scheme; dark: Scheme };

const ROLE_LABELS: Record<Role, string> = {
  bg: "背景",
  surface: "卡片",
  text: "內文",
  muted: "次要文字",
  border: "邊框",
  primary: "主色",
};

const PRESETS: Palette[] = [
  {
    name: "紙墨",
    en: "Paper",
    light: { bg: "#fbfbf9", surface: "#ffffff", text: "#1c1a17", muted: "#6b6760", border: "#e4e1d8", primary: "#b4532a" },
    dark: { bg: "#171613", surface: "#201e1a", text: "#efece4", muted: "#a09a8d", border: "#322f29", primary: "#e0894a" },
  },
  {
    name: "霧藍",
    en: "Slate",
    light: { bg: "#f7f8fa", surface: "#ffffff", text: "#1b2430", muted: "#5b6675", border: "#e0e4ea", primary: "#2f6fed" },
    dark: { bg: "#0f141b", surface: "#161d27", text: "#e7ecf3", muted: "#93a0b2", border: "#262f3c", primary: "#5b9bff" },
  },
  {
    name: "森林",
    en: "Forest",
    light: { bg: "#f6f8f4", surface: "#ffffff", text: "#17231a", muted: "#566557", border: "#dfe6da", primary: "#2f7d4f" },
    dark: { bg: "#0f150f", surface: "#161e17", text: "#e6efe6", muted: "#93a593", border: "#26302a", primary: "#4fb87a" },
  },
  {
    name: "夜櫻",
    en: "Plum",
    light: { bg: "#fbf7f9", surface: "#ffffff", text: "#241a22", muted: "#6e5c66", border: "#ecdfe6", primary: "#b23a6b" },
    dark: { bg: "#161214", surface: "#1e1920", text: "#efe6ec", muted: "#a695a0", border: "#2f2730", primary: "#e06a99" },
  },
  {
    name: "石灰",
    en: "Stone",
    light: { bg: "#fafafa", surface: "#ffffff", text: "#171717", muted: "#6b6b6b", border: "#e5e5e5", primary: "#171717" },
    dark: { bg: "#0e0e0e", surface: "#171717", text: "#f2f2f2", muted: "#9a9a9a", border: "#2b2b2b", primary: "#f2f2f2" },
  },
  {
    name: "琥珀",
    en: "Amber",
    light: { bg: "#fdf9f0", surface: "#ffffff", text: "#241f14", muted: "#6e6653", border: "#ece2cc", primary: "#c8890f" },
    dark: { bg: "#16130c", surface: "#1e1a11", text: "#f0e9d8", muted: "#a99f86", border: "#2e2819", primary: "#e6b23f" },
  },
];

const STORAGE_KEY = "palette.custom";

/* ── 色彩計算 ── */
function toRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h.padEnd(6, "0").slice(0, 6);
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}
function luminance(hex: string) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function bestOn(hex: string) {
  return contrast(hex, "#ffffff") >= contrast(hex, "#111111") ? "#ffffff" : "#111111";
}
const isHex = (s: string) => /^#[0-9a-fA-F]{6}$/.test(s);

/* ── 評分 ── */
type Check = {
  label: string;
  pair: string;
  ratio: number;
  target: number;
  weight: number;
  note: string;
  kind: "text" | "ui";
};
function scoreScheme(s: Scheme) {
  const checks: Check[] = [
    { label: "內文可讀性", pair: "內文 × 背景", ratio: contrast(s.text, s.bg), target: 7, weight: 40, note: "AAA ≥ 7", kind: "text" },
    { label: "次要文字", pair: "次要文字 × 背景", ratio: contrast(s.muted, s.bg), target: 4.5, weight: 25, note: "AA ≥ 4.5", kind: "text" },
    { label: "按鈕文字", pair: "文字 × 主色", ratio: contrast(bestOn(s.primary), s.primary), target: 4.5, weight: 20, note: "AA ≥ 4.5", kind: "text" },
    { label: "邊框辨識度", pair: "邊框 × 背景", ratio: contrast(s.border, s.bg), target: 1.6, weight: 15, note: "看得到但不搶眼", kind: "ui" },
  ];
  let total = 0;
  const rows = checks.map((c) => {
    const pts = Math.round(Math.min(1, c.ratio / c.target) * c.weight);
    total += pts;
    return { ...c, pts };
  });
  const grade =
    total >= 90 ? "A" : total >= 78 ? "B" : total >= 65 ? "C" : total >= 50 ? "D" : "E";
  return { total, grade, rows };
}
function rateText(ratio: number) {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA 大字";
  return "不足";
}
function rateUi(ratio: number) {
  if (ratio >= 2.6) return "明顯";
  if (ratio >= 1.3) return "適中";
  return "偏淡";
}

/* ── UI ── */
function Swatch({
  role,
  value,
  onChange,
}: {
  role: Role;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[12px]">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-7 cursor-pointer rounded-sm border border-tb-line bg-transparent p-0"
        aria-label={ROLE_LABELS[role]}
      />
      <span className="w-11 shrink-0 text-tb-ink-soft">{ROLE_LABELS[role]}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (isHex(v) || v === "" || v.startsWith("#")) onChange(v);
        }}
        className="tb-input w-[86px] font-mono text-[11px] uppercase"
      />
    </label>
  );
}

function Preview({ s }: { s: Scheme }) {
  return (
    <div
      className="overflow-hidden rounded-md text-[13px]"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: s.surface, borderBottom: `1px solid ${s.border}` }}
      >
        <span className="flex items-center gap-1.5 font-semibold">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: s.primary }}
          />
          我的網站
        </span>
        <span style={{ color: s.muted }}>選單</span>
      </div>
      <div className="flex flex-col gap-2 px-3 py-3">
        <p className="text-[15px] font-bold">標題文字</p>
        <p className="leading-5">
          這是一段內文，用來看文字擺在背景色上讀起來清不清楚。
        </p>
        <p className="text-[12px] leading-5" style={{ color: s.muted }}>
          這是次要說明文字，通常放註解或時間戳。
        </p>
        <div className="my-1 h-px w-full" style={{ background: s.border }} />
        <div className="flex items-center gap-3">
          <span
            className="rounded-sm px-3 py-1.5 text-[12px] font-semibold"
            style={{ background: s.primary, color: bestOn(s.primary) }}
          >
            主要按鈕
          </span>
          <span
            className="text-[12px] font-semibold underline underline-offset-2"
            style={{ color: s.primary }}
          >
            連結文字
          </span>
        </div>
      </div>
    </div>
  );
}

function Scorecard({ s }: { s: Scheme }) {
  const { total, grade, rows } = useMemo(() => scoreScheme(s), [s]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-3">
        <span className="font-mono text-4xl font-bold tabular-nums text-tb-ink">
          {total}
        </span>
        <span className="text-sm text-tb-ink-soft">/ 100</span>
        <span className="ml-auto rounded-sm border border-tb-ink px-2 py-0.5 text-lg font-extrabold text-tb-ink">
          {grade}
        </span>
      </div>
      <ul className="flex flex-col divide-y divide-tb-line border-y border-tb-line">
        {rows.map((r) => (
          <li key={r.label} className="flex flex-col gap-1.5 py-2.5">
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="font-semibold text-tb-ink">{r.label}</span>
              <span className="text-tb-ink-soft">
                {r.ratio.toFixed(2)}:1 ·{" "}
                <span className="font-semibold text-tb-ink">
                  {r.kind === "text" ? rateText(r.ratio) : rateUi(r.ratio)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-tb-panel">
                <div
                  className="h-full rounded-full bg-tb-ink"
                  style={{ width: `${(r.pts / r.weight) * 100}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums text-tb-ink-soft">
                {r.pts}/{r.weight}
              </span>
            </div>
            <span className="text-[11px] text-tb-ink-soft">
              {r.pair}｜目標 {r.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ROLES: Role[] = ["bg", "surface", "text", "muted", "border", "primary"];

export default function PalettePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [light, setLight] = useState<Scheme>(PRESETS[0].light);
  const [dark, setDark] = useState<Scheme>(PRESETS[0].dark);
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const p = JSON.parse(raw);
        if (p.light && p.dark) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLight(p.light);
          setDark(p.dark);
          setCustom(true);
        }
      } catch {
        /* 忽略 */
      }
    }
  }, []);

  function loadPreset(i: number) {
    setActiveIdx(i);
    setLight(PRESETS[i].light);
    setDark(PRESETS[i].dark);
    setCustom(false);
    localStorage.removeItem(STORAGE_KEY);
  }
  function edit(mode: "light" | "dark", role: Role, v: string) {
    const next =
      mode === "light" ? { ...light, [role]: v } : { ...dark, [role]: v };
    if (mode === "light") setLight(next);
    else setDark(next);
    setCustom(true);
    const payload = mode === "light" ? { light: next, dark } : { light, dark: next };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  const columns: { mode: "light" | "dark"; title: string; scheme: Scheme }[] = [
    { mode: "light", title: "亮版 Light", scheme: light },
    { mode: "dark", title: "暗版 Dark", scheme: dark },
  ];

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 sm:px-8">
      <PageHeader eyebrow="Palettes" title="配色參考">
        六組給網頁用的配色，每組都有亮版與暗版。挑一組來看預覽與對比評分，
        也能直接改顏色，即時看分數怎麼變。
      </PageHeader>

      {/* 精選配色 */}
      <section className="mt-10">
        <Kicker label="Presets" sub="點一組載入" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => loadPreset(i)}
              className={`flex flex-col gap-2 border p-2.5 text-left transition-colors ${
                !custom && activeIdx === i
                  ? "border-tb-ink"
                  : "border-tb-line hover:border-tb-ink-soft"
              }`}
            >
              <div className="flex h-8 overflow-hidden rounded-sm border border-tb-line">
                {(["bg", "surface", "muted", "text", "primary"] as Role[]).map(
                  (r) => (
                    <span
                      key={r}
                      className="flex-1"
                      style={{ background: p.light[r] }}
                    />
                  ),
                )}
              </div>
              <div className="flex h-8 overflow-hidden rounded-sm border border-tb-line">
                {(["bg", "surface", "muted", "text", "primary"] as Role[]).map(
                  (r) => (
                    <span
                      key={r}
                      className="flex-1"
                      style={{ background: p.dark[r] }}
                    />
                  ),
                )}
              </div>
              <div>
                <p className="text-[13px] font-bold text-tb-ink">{p.name}</p>
                <p className="tb-eyebrow text-tb-ink-soft">{p.en}</p>
              </div>
            </button>
          ))}
        </div>
        {custom && (
          <button
            onClick={() => loadPreset(activeIdx)}
            className="mt-3 text-xs text-tb-ink-soft underline underline-offset-2 hover:text-tb-ink"
          >
            重設為「{PRESETS[activeIdx].name}」
          </button>
        )}
      </section>

      {/* 亮 / 暗 兩欄 */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {columns.map((col) => (
          <section key={col.mode} className="flex flex-col gap-5">
            <Rule />
            <h2 className="pt-2 text-lg font-bold text-tb-ink">{col.title}</h2>

            <Preview s={col.scheme} />

            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <Swatch
                  key={r}
                  role={r}
                  value={col.scheme[r]}
                  onChange={(v) => edit(col.mode, r, v)}
                />
              ))}
            </div>

            <Scorecard s={col.scheme} />
          </section>
        ))}
      </div>

      <p className="mt-10 text-xs leading-6 text-tb-ink-soft">
        對比值採 WCAG 2.1 相對亮度公式計算。AA 一般文字需 ≥ 4.5:1、AAA 需 ≥ 7:1；
        大型文字（約 24px 以上）AA 只需 3:1。評分是這幾項的加權，滿分 100。
      </p>
    </main>
  );
}
