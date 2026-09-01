"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";

type Mode = "focus" | "short" | "long";

const MODES: Record<Mode, { label: string; minutes: number; color: string; ring: string }> = {
  focus: { label: "專注", minutes: 25, color: "text-tb-clay", ring: "#bb4e2b" },
  short: { label: "短休息", minutes: 5, color: "text-tb-sage", ring: "#5c7150" },
  long: { label: "長休息", minutes: 15, color: "text-tb-indigo", ring: "#34417a" },
};

const SETTINGS_KEY = "pomodoro.settings";
const LOGS_KEY = "pomodoro.logs";
const LONG_BREAK_EVERY = 4;

type FocusLog = { id: string; task: string; minutes: number; endedAt: number };

function sameDay(a: number, b: number) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isToday(ts: number) {
  return sameDay(ts, new Date().getTime());
}

function dayLabel(ts: number) {
  const d = new Date(ts);
  const today = new Date();
  const yst = new Date();
  yst.setDate(today.getDate() - 1);
  if (sameDay(ts, today.getTime())) return "今天";
  if (sameDay(ts, yst.getTime())) return "昨天";
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function format(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function beep() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc.start();
    osc.stop(ctx.currentTime + 0.95);
    osc.onended = () => ctx.close();
  } catch {
    /* 忽略無法播放音效的情況 */
  }
}

export default function PomodoroPage() {
  const [durations, setDurations] = useState({
    focus: MODES.focus.minutes,
    short: MODES.short.minutes,
    long: MODES.long.minutes,
  });
  const [mode, setMode] = useState<Mode>("focus");
  const [remaining, setRemaining] = useState(MODES.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);
  const [autoStart, setAutoStart] = useState(true);
  const [task, setTask] = useState("");
  const [logs, setLogs] = useState<FocusLog[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const taskRef = useRef("");
  useEffect(() => {
    taskRef.current = task;
  }, [task]);

  const total = durations[mode] * 60;

  // 載入 / 儲存設定
  useEffect(() => {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      try {
        const s = JSON.parse(raw);
        /* eslint-disable react-hooks/set-state-in-effect */
        if (s.durations) setDurations(s.durations);
        if (typeof s.autoStart === "boolean") setAutoStart(s.autoStart);
        setRemaining((s.durations?.focus ?? MODES.focus.minutes) * 60);
        /* eslint-enable react-hooks/set-state-in-effect */
      } catch {
        /* 忽略損毀的設定 */
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ durations, autoStart }));
  }, [durations, autoStart]);

  // 載入 / 儲存專注紀錄
  useEffect(() => {
    const raw = localStorage.getItem(LOGS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setLogs(parsed);
      } catch {
        /* 忽略損毀的紀錄 */
      }
    }
  }, []);
  const logsLoaded = useRef(false);
  useEffect(() => {
    if (!logsLoaded.current) {
      logsLoaded.current = true;
      return;
    }
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  const switchMode = useCallback(
    (next: Mode, start: boolean) => {
      setMode(next);
      setRemaining(durations[next] * 60);
      setRunning(start);
    },
    [durations],
  );

  const handleComplete = useCallback(() => {
    beep();
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification(mode === "focus" ? "專注時間結束，休息一下！" : "休息結束，繼續加油！");
    }
    if (mode === "focus") {
      const done = completedFocus + 1;
      setCompletedFocus(done);
      setLogs((l) => [
        {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now()),
          task: taskRef.current.trim() || "未命名項目",
          minutes: durations.focus,
          endedAt: Date.now(),
        },
        ...l,
      ]);
      const next: Mode = done % LONG_BREAK_EVERY === 0 ? "long" : "short";
      switchMode(next, autoStart);
    } else {
      switchMode("focus", autoStart);
    }
  }, [mode, completedFocus, autoStart, durations.focus, switchMode]);

  // 計時
  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(tick.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running, mode]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (running && remaining === 0) handleComplete();
  }, [remaining, running, handleComplete]);

  // 分頁標題
  useEffect(() => {
    document.title = `${format(remaining)} · ${MODES[mode].label} — 蕃茄鐘`;
    return () => {
      document.title = "工具箱";
    };
  }, [remaining, mode]);

  function toggle() {
    if (!running && remaining === 0) setRemaining(total);
    if (!running && typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    setRemaining(durations[mode] * 60);
  }

  // 跳過目前階段：不計數、不記錄，直接進下一階段
  function skip() {
    if (mode === "focus") {
      const next: Mode =
        (completedFocus + 1) % LONG_BREAK_EVERY === 0 ? "long" : "short";
      switchMode(next, false);
    } else {
      switchMode("focus", false);
    }
  }

  const progress = total > 0 ? 1 - remaining / total : 0;
  const R = 130;
  const C = 2 * Math.PI * R;

  const setDuration = (m: Mode, v: number) => {
    const clamped = Math.min(180, Math.max(1, Math.round(v)));
    setDurations((d) => ({ ...d, [m]: clamped }));
    if (m === mode && !running) setRemaining(clamped * 60);
  };

  const cycleDots = useMemo(() => {
    const mod = completedFocus % LONG_BREAK_EVERY;
    const filled = completedFocus > 0 && mod === 0 ? LONG_BREAK_EVERY : mod;
    return Array.from({ length: LONG_BREAK_EVERY }, (_, i) => i < filled);
  }, [completedFocus]);

  const todayMinutes = useMemo(
    () =>
      logs
        .filter((l) => isToday(l.endedAt))
        .reduce((sum, l) => sum + l.minutes, 0),
    [logs],
  );

  // 依日期分組
  const groupedLogs = useMemo(() => {
    const groups: { key: string; label: string; items: FocusLog[]; minutes: number }[] = [];
    for (const log of logs) {
      const key = new Date(log.endedAt).toDateString();
      let g = groups.find((x) => x.key === key);
      if (!g) {
        g = { key, label: dayLabel(log.endedAt), items: [], minutes: 0 };
        groups.push(g);
      }
      g.items.push(log);
      g.minutes += log.minutes;
    }
    return groups;
  }, [logs]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-12">
      <PageHeader eyebrow="Focus Timer" title="蕃茄鐘">
        25 分鐘專注、5 分鐘休息，每 4 輪專注後有一次長休息，幫助你保持節奏。
      </PageHeader>

      <div className="tb-card flex flex-col items-center gap-8 p-8">
        {/* 模式切換 */}
        <div className="flex gap-1 rounded-full bg-tb-bg p-1">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m, false)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                mode === m
                  ? "bg-white text-tb-rose-deep shadow-sm"
                  : "text-tb-ink/50 hover:text-tb-rose-deep"
              }`}
            >
              {MODES[m].label}
            </button>
          ))}
        </div>

        {/* 目前專注項目 */}
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="正在專注的項目…（完成一輪專注時會記錄）"
          className="tb-input w-full max-w-md text-center"
        />

        {/* 計時圓環 */}
        <div className="relative">
          <svg width={300} height={300} viewBox="0 0 300 300">
            <circle
              cx={150}
              cy={150}
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth={14}
              className="text-tb-pink-soft"
            />
            <circle
              cx={150}
              cy={150}
              r={R}
              fill="none"
              stroke={MODES[mode].ring}
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
              transform="rotate(-90 150 150)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-6xl font-bold tabular-nums text-tb-rose-deep">
              {format(remaining)}
            </span>
            <span className={`mt-1 text-sm font-semibold ${MODES[mode].color}`}>
              {MODES[mode].label}
            </span>
          </div>
        </div>

        {/* 控制鈕 */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button onClick={toggle} className="tb-btn tb-btn-primary text-lg">
            {running ? "暫停" : "開始"}
          </button>
          <button onClick={reset} className="tb-btn tb-btn-ghost text-lg">
            重設
          </button>
          <button
            onClick={skip}
            title={mode === "focus" ? "跳過此輪專注（不計入紀錄）" : "跳過休息"}
            className="tb-btn tb-btn-ghost text-lg"
          >
            跳過
          </button>
        </div>

        {/* 進度 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {cycleDots.map((filled, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${filled ? "bg-tb-rose" : "bg-tb-pink-soft"}`}
              />
            ))}
          </div>
          <p className="text-sm text-tb-ink/60">
            今日已完成{" "}
            <span className="font-bold text-tb-rose-deep">{completedFocus}</span> 輪專注
            {todayMinutes > 0 && (
              <>
                {" · "}累積{" "}
                <span className="font-bold text-tb-rose-deep">{todayMinutes}</span> 分鐘
              </>
            )}
          </p>
        </div>
      </div>

      {/* 設定 */}
      <section className="tb-card p-5">
        <h2 className="mb-4 text-sm font-bold text-tb-rose-deep">設定（分鐘）</h2>
        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <label key={m} className="flex flex-col gap-1 text-sm">
              <span className="text-tb-ink/60">{MODES[m].label}</span>
              <input
                type="number"
                min={1}
                max={180}
                value={durations[m]}
                onChange={(e) => setDuration(m, Number(e.target.value))}
                className="tb-input"
              />
            </label>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-tb-ink/70">
          <input
            type="checkbox"
            checked={autoStart}
            onChange={(e) => setAutoStart(e.target.checked)}
            className="h-4 w-4 accent-tb-rose"
          />
          自動開始下一階段
        </label>
      </section>

      {/* 專注紀錄 */}
      <section className="tb-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-tb-rose-deep">
            專注紀錄
            {logs.length > 0 && (
              <span className="ml-2 font-normal text-tb-ink/40">共 {logs.length} 筆</span>
            )}
          </h2>
          {logs.length > 0 && (
            <button
              onClick={() => {
                if (confirm("確定要清除所有專注紀錄嗎？")) setLogs([]);
              }}
              className="text-xs text-tb-ink/40 underline underline-offset-2 hover:text-tb-rose"
            >
              清除紀錄
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-tb-ink/40">
            完成一輪專注後，項目會自動記錄在這裡。
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {groupedLogs.map((g) => (
              <div key={g.key}>
                <div className="mb-1.5 flex items-baseline justify-between text-xs text-tb-ink/40">
                  <span className="font-semibold text-tb-ink/60">{g.label}</span>
                  <span>
                    {g.items.length} 輪 · {g.minutes} 分鐘
                  </span>
                </div>
                <ul className="divide-y divide-tb-line/60">
                  {g.items.map((log) => (
                    <li key={log.id} className="flex items-center gap-3 py-2 text-sm">
                      <span className="w-14 shrink-0 font-mono text-xs text-tb-ink/40">
                        {new Date(log.endedAt).toLocaleTimeString("zh-TW", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                      <span className="flex-1 truncate text-tb-ink">{log.task}</span>
                      <span className="shrink-0 text-xs text-tb-ink/40">{log.minutes} 分</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
