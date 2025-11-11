import type { ReactNode } from 'react';

export default function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-[646px] w-[300px] flex-col gap-[var(--panel-gap)] rounded-b-[8px] rounded-t-none bg-[linear-gradient(180deg,var(--panel-bg-1)_0%,var(--panel-bg-2)_100%)] px-[var(--panel-pad-x)] py-[var(--panel-pad-y)] opacity-[0.95] shadow-[0_16px_32px_rgba(5,8,15,0.35)]"
      dir="rtl"
    >
      {children}
    </div>
  );
}