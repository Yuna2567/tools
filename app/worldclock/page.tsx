"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Kicker, Rule } from "@/components/ui";

const BASE_ZONE = "Asia/Taipei";
const BASE_LABEL = "中原標準時間";

type City = { zone: string; city: string; flag: string };

const CITIES: City[] = [
  { zone: "Asia/Tokyo", city: "東京", flag: "🇯🇵" },
  { zone: "Asia/Seoul", city: "首爾", flag: "🇰🇷" },
  { zone: "Asia/Hong_Kong", city: "香港", flag: "🇭🇰" },
  { zone: "Asia/Singapore", city: "新加坡", flag: "🇸🇬" },
  { zone: "Asia/Bangkok", city: "曼谷", flag: "🇹🇭" },
  { zone: "Asia/Jakarta", city: "雅加達", flag: "🇮🇩" },
  { zone: "Asia/Kolkata", city: "新德里", flag: "🇮🇳" },
  { zone: "Asia/Dubai", city: "杜拜", flag: "🇦🇪" },
  { zone: "Europe/Moscow", city: "莫斯科", flag: "🇷🇺" },
  { zone: "Europe/Istanbul", city: "伊斯坦堡", flag: "🇹🇷" },
  { zone: "Europe/Paris", city: "巴黎", flag: "🇫🇷" },
  { zone: "Europe/London", city: "倫敦", flag: "🇬🇧" },
  { zone: "America/Sao_Paulo", city: "聖保羅", flag: "🇧🇷" },
  { zone: "America/New_York", city: "紐約", flag: "🇺🇸" },
  { zone: "America/Chicago", city: "芝加哥", flag: "🇺🇸" },
  { zone: "America/Los_Angeles", city: "洛杉磯", flag: "🇺🇸" },
  { zone: "Pacific/Honolulu", city: "檀香山", flag: "🇺🇸" },
  { zone: "Australia/Sydney", city: "雪梨", flag: "🇦🇺" },
  { zone: "Pacific/Auckland", city: "奧克蘭", flag: "🇳🇿" },
];

function parts(zone: string, d: Date) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const p: Record<string, number> = {};
  for (const { type, value } of f.formatToParts(d)) {
    if (type !== "literal") p[type] = Number(value);
  }
  p.hour %= 24;
  return p;
}

function offsetMinutes(zone: string, d: Date) {
  const p = parts(zone, d);
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, 0);
  return Math.round((asUTC - d.getTime()) / 60000);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

function phrase(h: number) {
  if (h < 5) return "深夜";
  if (h < 6) return "拂曉";
  if (h < 9) return "清晨";
  if (h < 12) return "上午";
  if (h < 14) return "中午";
  if (h < 18) return "下午";
  if (h < 21) return "傍晚";
  return "晚上";
}

// 0 = 適合聯絡(白天)，1 = 邊緣(剛起床/快睡)，2 = 睡眠時間
function band(h: number) {
  if (h >= 8 && h <= 21) return 0;
  if (h === 6 || h === 7 || h === 22 || h === 23) return 1;
  return 2;
}
const BAND_META = [
  { key: 0, label: "適合聯絡", note: "當地約 8:00–22:00，多半醒著", dot: "var(--tb-sage)" },
  { key: 1, label: "剛起床或快睡了", note: "傳訊息還行，打電話留意一下", dot: "var(--tb-amber)" },
  { key: 2, label: "深夜・別打擾", note: "當地在睡覺", dot: "var(--tb-clay)" },
];

function diffText(min: number) {
  if (min === 0) return "與台北同時";
  const slow = min < 0;
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  const hm = `${h} 小時${m ? ` ${m} 分` : ""}`;
  return slow ? `比台北慢 ${hm}` : `比台北快 ${hm}`;
}

export default function WorldClockPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [mode, setMode] = useState<"live" | "fixed">("live");
  const [fixed, setFixed] = useState("15:00");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const instant = useMemo(() => {
    if (!now) return null;
    if (mode === "live") return now;
    const bp = parts(BASE_ZONE, now);
    const [hh, mm] = fixed.split(":").map(Number);
    const baseOff = offsetMinutes(BASE_ZONE, now);
    return new Date(
      Date.UTC(bp.year, bp.month - 1, bp.day, hh || 0, mm || 0, 0) - baseOff * 60000,
    );
  }, [now, mode, fixed]);

  const rows = useMemo(() => {
    if (!instant) return [];
    const bp = parts(BASE_ZONE, instant);
    const baseOff = offsetMinutes(BASE_ZONE, instant);
    const baseDay = Date.UTC(bp.year, bp.month - 1, bp.day);
    return CITIES.map((c) => {
      const p = parts(c.zone, instant);
      const rel = offsetMinutes(c.zone, instant) - baseOff;
      const dayDelta = Math.round(
        (Date.UTC(p.year, p.month - 1, p.day) - baseDay) / 86400000,
      );
      return {
        ...c,
        hour: p.hour,
        minute: p.minute,
        weekday: new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay(),
        rel,
        dayDelta,
        b: band(p.hour),
      };
    }).sort((a, b) => Math.abs(a.rel) - Math.abs(b.rel) || a.rel - b.rel);
  }, [instant]);

  if (!instant) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 sm:px-8">
        <PageHeader eyebrow="World Clock" title="世界時間">
          載入中…
        </PageHeader>
      </main>
    );
  }

  const bp = parts(BASE_ZONE, instant);
  const baseWeekday = new Date(
    Date.UTC(bp.year, bp.month - 1, bp.day),
  ).getUTCDay();
  const okCities = rows.filter((r) => r.b === 0);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 sm:px-8">
      <PageHeader eyebrow="World Clock" title="世界時間">
        用「{BASE_LABEL}」（台灣的 UTC+8）當基準，一眼看出世界各地現在幾點、
        還醒著嗎、適不適合現在敲他。
      </PageHeader>

      {/* 台北基準 */}
      <section className="mt-10 flex flex-col gap-5 border border-tb-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <Kicker label="Taipei" sub={`${BASE_LABEL}・UTC+8`} />
          <div className="mt-2 font-mono text-5xl font-bold tabular-nums tracking-tight text-tb-ink sm:text-6xl">
            {pad(bp.hour)}
            <span className="mx-0.5 text-tb-ink-soft">:</span>
            {pad(bp.minute)}
          </div>
          <p className="mt-1.5 text-sm text-tb-ink-soft">
            {bp.year} 年 {bp.month} 月 {bp.day} 日・週{WEEKDAY[baseWeekday]}・
            {phrase(bp.hour)}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex gap-1 rounded-sm border border-tb-line p-1 text-xs">
            <button
              onClick={() => setMode("live")}
              className={`rounded-[2px] px-3 py-1 font-semibold transition-colors ${
                mode === "live"
                  ? "bg-tb-ink text-tb-bg"
                  : "text-tb-ink-soft hover:text-tb-ink"
              }`}
            >
              現在
            </button>
            <button
              onClick={() => setMode("fixed")}
              className={`rounded-[2px] px-3 py-1 font-semibold transition-colors ${
                mode === "fixed"
                  ? "bg-tb-ink text-tb-bg"
                  : "text-tb-ink-soft hover:text-tb-ink"
              }`}
            >
              假設一個時間
            </button>
          </div>
          {mode === "fixed" && (
            <label className="flex items-center gap-2 text-xs text-tb-ink-soft">
              當台北是
              <input
                type="time"
                value={fixed}
                onChange={(e) => setFixed(e.target.value)}
                className="tb-input font-mono text-sm"
              />
            </label>
          )}
        </div>
      </section>

      {/* 一句話摘要 */}
      <p className="mt-6 text-sm leading-7 text-tb-ink">
        {mode === "fixed" ? "那個時候，" : "現在，"}
        名單裡有{" "}
        <span className="font-bold text-tb-ink">{okCities.length}</span> /{" "}
        {rows.length} 個城市適合聯絡
        {okCities.length > 0 && (
          <span className="text-tb-ink-soft">
            （{okCities.slice(0, 5).map((c) => c.city).join("、")}
            {okCities.length > 5 ? " 等" : ""}）
          </span>
        )}
        。
      </p>

      {/* 依狀態分組 */}
      <div className="mt-8 flex flex-col gap-10">
        {BAND_META.map((bm) => {
          const list = rows.filter((r) => r.b === bm.key);
          if (list.length === 0) return null;
          return (
            <section key={bm.key}>
              <Rule />
              <div className="flex items-baseline justify-between pt-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: bm.dot }}
                  />
                  <h2 className="text-base font-bold text-tb-ink">{bm.label}</h2>
                  <span className="text-xs text-tb-ink-soft">{list.length} 個</span>
                </div>
                <span className="hidden text-xs text-tb-ink-soft sm:block">
                  {bm.note}
                </span>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((r) => (
                  <li
                    key={r.zone}
                    className="flex flex-col gap-2 border border-tb-line p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span aria-hidden className="text-lg">
                          {r.flag}
                        </span>
                        <span className="font-bold text-tb-ink">{r.city}</span>
                      </span>
                      <span className="text-[11px] text-tb-ink-soft">
                        {phrase(r.hour)}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold tabular-nums text-tb-ink">
                        {pad(r.hour)}:{pad(r.minute)}
                      </span>
                      <span className="text-xs text-tb-ink-soft">
                        週{WEEKDAY[r.weekday]}
                        {r.dayDelta === -1 && "・昨天"}
                        {r.dayDelta === 1 && "・明天"}
                      </span>
                    </div>

                    <p className="text-[11px] text-tb-ink-soft">
                      {diffText(r.rel)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-10 text-xs leading-6 text-tb-ink-soft">
        時區與日光節約時間依你裝置的資料自動計算。「{BASE_LABEL}」是台灣採用的
        UTC+8 時區舊稱，和香港、新加坡、北京同一時區。
      </p>
    </main>
  );
}
