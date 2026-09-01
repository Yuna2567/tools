import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex w-full flex-col gap-3 border-b border-tb-line pb-7">
      <Link
        href="/"
        className="text-[13px] font-medium text-tb-ink-soft transition-colors hover:text-tb-ink"
      >
        ← 回工具箱
      </Link>
      <div className="flex flex-col gap-1.5">
        <span className="tb-eyebrow text-tb-ink-soft">{eyebrow}</span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-tb-ink sm:text-4xl">
          {title}
        </h1>
      </div>
      {children && (
        <p className="max-w-2xl text-sm leading-7 text-tb-ink-soft">{children}</p>
      )}
    </header>
  );
}
