import { createFileRoute } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { BasicPanel } from '@/components/basic-panel';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-bg p-6 text-white">
      <div className="flex flex-col items-stretch gap-0" dir="rtl" style={{ width: '300px' }}>
        <header
          dir="ltr"
          className="flex h-11 items-center justify-between rounded-t-[8px] rounded-b-none bg-[#303142] px-2 text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
        >
          <button
            type="button"
            aria-label="סגור חלונית"
            tabIndex={0}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X className="size-5" />
          </button>
          <div className="flex flex-col items-end text-right" dir="rtl">
            <h1 className="text-base font-bold leading-5 text-white">צילומים מהעולם</h1>
          </div>
        </header>
        <div className="rounded-b-[20px]">
          <BasicPanel />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
