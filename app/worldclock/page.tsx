"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";

const BASE_ZONE = "Asia/Taipei";
const BASE_LABEL = "中原標準時間";

type City = { zone: string; city: string; flag: string };
type Group = { title: string; cities: City[] };

const GROUPS: Group[] = [
  {
    title: "亞洲・大洋洲",
    cities: [
      { zone: "Asia/Tokyo", city: "東京", flag: "🇯🇵" },
      { zone: "Asia/Seoul", city: "首爾", flag: "🇰🇷" },
      { zone: "Asia/Hong_Kong", city: "香港", flag: "🇭🇰" },
      { zone: "Asia/Singapore", city: "新加坡", flag: "🇸🇬" },
      { zone: "Asia/Bangkok", city: "曼谷", flag: "🇹🇭" },
      { zone: "Asia/Jakarta", city: "雅加達", flag: "🇮🇩" },
      { zone: "Asia/Kolkata", city: "新德里", flag: "🇮🇳" },
      { zone: "Australia/Sydney", city: "雪梨", flag: "🇦🇺" },
      { zone: "Pacific/Auckland", city: "奧克蘭", flag: "🇳🇿" },
    ],
  },
  {
    title: "中東・歐洲・非洲",
    cities: [
      { zone: "Asia/Dubai", city: "杜拜", flag: "🇦🇪" },
      { zone: "Europe/Moscow", city: "莫斯科", flag: "🇷🇺" },
      { zone: "Europe/Istanbul", city: "伊斯坦堡", flag: "🇹🇷" },
      { zone: "Africa/Cairo", city: "開羅", flag: "🇪🇬" },
      { zone: "Europe/Paris", city: "巴黎", flag: "🇫🇷" },
      { zone: "Europe/Berlin", city: "柏林", flag: "🇩🇪" },
      { zone: "Europe/London", city: "倫敦", flag: "🇬🇧" },
    ],
  },
  {
    title: "美洲",
    cities: [
      { zone: "America/Sao_Paulo", city: "聖保羅", flag: "🇧🇷" },
      { zone: "America/New_York", city: "紐約", flag: "🇺🇸" },
      { zone: "America/Chicago", city: "芝加哥", flag: "🇺🇸" },
      { zone: "America/Denver", city: "丹佛", flag: "🇺🇸" },
      { zone: "America/Los_Angeles", city: "洛杉磯", flag: "🇺🇸" },
      { zone: "Pacific/Honolulu", city: "檀香山", flag: "🇺🇸" },
    ],
  },
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
    second: "2-digit",
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
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUTC - d.getTime()) / 60000);
}

function utcLabel(min: number) {
  const sign = min < 0 ? "−" : "+";
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `UTC${sign}${h}${m ? ":" + String(m).padStart(2, "0") : ""}`;
}

function diffLabel(min: number) {
  const sign = min < 0 ? "−" : "+";
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  if (min === 0) return "同時";
  return `${sign}${h}${m ? " 小時 " + m + " 分" : " 小時"}`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

export default function WorldClockPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [mode, setMode] = useState<"live" | "fixed">("live");
  const [fixed, setFixed] = useState("12:00");

  useEffect(() => {
    // 掛載後才取得時間，避免 SSR/CSR hydration 不一致
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // 基準時刻（instant）
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

  if (!instant) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-5 py-12 sm:px-8">
        <PageHeader eyebrow="World Clock" title="世界時間">
          載入中…
        </PageHeader>
      </main>
    );
  }

  const bp = parts(BASE_ZONE, instant);
  const baseOff = offsetMinutes(BASE_ZONE, instant);
  const baseDay = Date.UTC(bp.year, bp.month - 1, bp.day);
  const baseWeekday = new Date(baseDay).getUTCDay();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-5 py-12 sm:px-8">
      <PageHeader eyebrow="World Clock" title="世界時間">
        以「{BASE_LABEL}」（{utcLabel(baseOff)}）為基準，對照世界各地此刻幾點、差幾個小時、是白天還是晚上。
      </PageHeader>

      {/* 基準時鐘 */}
      <section className="tb-card flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <span className="tb-eyebrow text-tb-ink-soft">{BASE_LABEL}・臺北</span>
          <div className="mt-1 font-mono text-5xl font-bold tabular-nums tracking-tight text-tb-ink sm:text-6xl">
            {pad(bp.hour)}
            <span className="text-tb-ink-soft">:</span>
            {pad(bp.minute)}
            <span className="text-2xl text-tb-ink-soft sm:text-3xl">
              :{pad(bp.second)}
            </span>
          </div>
          <p className="mt-1 text-sm text-tb-ink-soft">
            {bp.year} 年 {bp.month} 月 {bp.day} 日・週{WEEKDAY[baseWeekday]}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 self-start rounded-sm border border-tb-line p-1 text-xs">
            <button
              onClick={() => setMode("live")}
              className={`rounded-[3px] px-3 py-1 font-semibold transition-colors ${
                mode === "live"
                  ? "bg-tb-ink text-tb-bg"
                  : "text-tb-ink-soft hover:text-tb-ink"
              }`}
            >
              現在
            </button>
            <button
              onClick={() => setMode("fixed")}
              className={`rounded-[3px] px-3 py-1 font-semibold transition-colors ${
                mode === "fixed"
                  ? "bg-tb-ink text-tb-bg"
                  : "text-tb-ink-soft hover:text-tb-ink"
              }`}
            >
              指定時間
            </button>
          </div>
          {mode === "fixed" && (
            <label className="flex items-center gap-2 text-xs text-tb-ink-soft">
              當{BASE_LABEL}為
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

      {/* 各地時間 */}
      <div className="flex flex-col gap-8">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="tb-eyebrow mb-2 text-tb-ink-soft">{g.title}</h2>
            <ul className="border-t border-tb-line">
              {g.cities.map((c) => {
                const p = parts(c.zone, instant);
                const off = offsetMinutes(c.zone, instant) - baseOff;
                const dayDelta =
                  Math.round(
                    (Date.UTC(p.year, p.month - 1, p.day) - baseDay) / 86400000,
                  );
                const isDay = p.hour >= 6 && p.hour < 18;
                return (
                  <li
                    key={c.zone}
                    className="grid grid-cols-[1.4rem_1fr_auto] items-center gap-x-3 gap-y-0.5 border-b border-tb-line py-3 sm:grid-cols-[1.6rem_10rem_1fr_auto] sm:gap-x-5"
                  >
                    <span aria-hidden className="text-lg">
                      {c.flag}
                    </span>
                    <span className="font-semibold text-tb-ink">{c.city}</span>

                    <span className="col-start-2 row-start-2 text-[11px] text-tb-ink-soft sm:col-start-3 sm:row-start-1">
                      {utcLabel(offsetMinutes(c.zone, instant))} ·{" "}
                      {off === 0 ? "同時" : diffLabel(off)}
                      {dayDelta !== 0 && (
                        <span className="ml-1 text-tb-clay">
                          （{dayDelta > 0 ? "明日" : "昨日"}）
                        </span>
                      )}
                    </span>

                    <span className="col-start-3 row-start-1 flex items-baseline gap-1.5 justify-self-end font-mono tabular-nums text-tb-ink sm:col-start-4">
                      <span aria-hidden className="text-xs text-tb-ink-soft">
                        {isDay ? "☀" : "☾"}
                      </span>
                      <span className="text-lg font-semibold sm:text-xl">
                        {pad(p.hour)}:{pad(p.minute)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-xs leading-6 text-tb-ink-soft">
        時區與日光節約時間依你裝置的 Intl 資料計算。「{BASE_LABEL}」是臺灣採用的
        UTC+8 時區舊稱，與香港、新加坡、北京同一時區。
      </p>
    </main>
  );
}
