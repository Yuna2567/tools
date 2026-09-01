import Link from "next/link";
import type { ReactNode } from "react";
import { Rule } from "@/components/ui";

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
    <header className="flex w-full flex-col gap-4">
      <Link
        href="/"
        className="text-[12px] tracking-wide text-tb-ink-soft transition-colors hover:text-tb-ink"
      >
        ← 回工具箱
      </Link>
      <Rule />
      <div className="flex flex-col gap-2 pt-3">
        <span className="tb-eyebrow text-tb-ink-soft">{eyebrow}</span>
        <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight text-tb-ink sm:text-[2.6rem]">
          {title}
        </h1>
      </div>
      {children && (
        <p className="max-w-2xl text-sm leading-7 text-tb-ink-soft">{children}</p>
      )}
    </header>
  );
}
