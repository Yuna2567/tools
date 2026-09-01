"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Wheel from "./Wheel";

const STORAGE_KEY = "lottery.names";
const DEFAULT_NAMES = "項目1\n項目2\n項目3\n項目4\n項目5\n項目6";

function parseNames(raw: string): string[] {
  return raw
    .split(/[\n,，、]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function LotteryPage() {
  const [raw, setRaw] = useState(DEFAULT_NAMES);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [removeWinner, setRemoveWinner] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const pendingWinner = useRef<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== null) setRaw(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, raw);
  }, [raw]);

  const entries = useMemo(() => parseNames(raw), [raw]);
  const n = entries.length;
  const seg = n > 0 ? 360 / n : 360;

  function spin() {
    if (spinning || n < 2) return;
    const index = Math.floor(Math.random() * n);
    pendingWinner.current = entries[index];

    const centerAngle = seg * index + seg / 2;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta =
      360 * 6 + ((((360 - centerAngle - currentMod) % 360) + 360) % 360);

    setWinner(null);
    setSpinning(true);
    setRotation((prev) => prev + delta);
  }

  function handleTransitionEnd() {
    if (!spinning) return;
    setSpinning(false);
    const w = pendingWinner.current;
    if (!w) return;
    setWinner(w);
    setHistory((h) => [w, ...h]);
    if (removeWinner) {
      setRaw((prev) => {
        const list = parseNames(prev);
        const idx = list.indexOf(w);
        if (idx >= 0) list.splice(idx, 1);
        return list.join("\n");
      });
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <PageHeader emoji="🎡" title="抽獎轉盤">
        左側輸入名單（每行一項，或用逗號分隔），點轉盤中央的「GO」開始抽獎。
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        {/* 名單輸入 */}
        <section className="flex flex-col gap-3">
          <label htmlFor="names" className="text-sm font-semibold text-tb-rose-deep">
            參加者名單（{n} 項）
          </label>
          <textarea
            id="names"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            disabled={spinning}
            rows={12}
            placeholder={"項目一\n項目二\n項目三"}
            className="tb-input w-full resize-y font-mono text-sm leading-6 disabled:opacity-60"
          />
          <label className="flex items-center gap-2 text-sm text-tb-ink/70">
            <input
              type="checkbox"
              checked={removeWinner}
              onChange={(e) => setRemoveWinner(e.target.checked)}
              className="h-4 w-4 accent-tb-rose"
            />
            中獎後自動從名單移除
          </label>
          <button
            onClick={() => {
              setRaw(DEFAULT_NAMES);
              setHistory([]);
              setWinner(null);
            }}
            disabled={spinning}
            className="self-start text-sm text-tb-rose underline underline-offset-2 hover:text-tb-rose-deep disabled:opacity-50"
          >
            重設範例名單
          </button>

          {history.length > 0 && (
            <div className="tb-card mt-2 p-4">
              <p className="text-sm font-semibold text-tb-rose-deep">中獎紀錄</p>
              <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-tb-ink/70">
                {history.map((h, i) => (
                  <li key={`${h}-${i}`}>{h}</li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* 轉盤 */}
        <section className="flex flex-col items-center gap-6">
          <Wheel
            entries={entries}
            rotation={rotation}
            spinning={spinning}
            onSpin={spin}
            onTransitionEnd={handleTransitionEnd}
          />

          <button
            onClick={spin}
            disabled={spinning || n < 2}
            className="tb-btn tb-btn-primary text-lg"
          >
            {spinning ? "抽獎中…" : "開始抽獎"}
          </button>
          {n < 2 && (
            <p className="text-sm text-tb-rose-deep">至少需要 2 項才能抽獎。</p>
          )}

          <div className="h-16 text-center">
            {winner && (
              <p className="text-2xl font-bold text-tb-rose-deep">
                🎉 中獎：<span className="text-tb-purple">{winner}</span>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
