import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeader({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex w-full flex-col gap-2">
      <Link
        href="/"
        className="text-sm font-medium text-tb-rose-deep/60 transition-colors hover:text-tb-rose-deep"
      >
        ← 回工具箱
      </Link>
      <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight text-tb-rose-deep">
        <span>{emoji}</span>
        {title}
      </h1>
      {children && (
        <p className="text-sm leading-6 text-tb-ink/70">{children}</p>
      )}
    </header>
  );
}
