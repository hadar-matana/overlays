import { cn } from '../../lib/utils';

interface DataRow {
  label: string;
  value: string;
}

interface OverlayInfoProps {
  title: string;
  category: string;
  date: string;
  time: string;
  data: DataRow[];
  onClose?: () => void;
  className?: string;
}

const DividerVertical = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="h-full w-px shrink-0 bg-[rgba(255,255,255,0.14)]" />
    </div>
  );
};

export function OverlayInfo({ className, title, category, date, time, data, onClose }: OverlayInfoProps) {
  return (
    <div className={cn('relative flex h-full w-full flex-col items-start', className)}>
      <div
        className="relative flex h-[var(--ctl-h)] w-full shrink-0 items-center justify-between rounded-t-[var(--ctl-radius)] bg-[var(--ctl-bg)] px-[var(--ctl-pad-x)] py-0"
        dir="ltr"
      >
        <button
          type="button"
          onClick={onClose}
          className="relative flex h-6 shrink-0 items-center justify-center gap-2 rounded p-1 hover:bg-[var(--hover)] transition-colors"
          aria-label="סגור"
        >
          <div className="relative h-4 w-4 shrink-0 overflow-clip">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--ctl-fg)]"
              />
            </svg>
          </div>
        </button>
        <p
          className="relative shrink-0 text-right font-['Heebo'] text-sm font-bold leading-[22px] text-[var(--ctl-fg)]"
          dir="ltr"
        >
          {title}
        </p>
      </div>

      <div
        className="relative flex w-full shrink-0 flex-col items-end gap-2 rounded-b-[var(--ctl-radius)] bg-[linear-gradient(180deg,var(--panel-bg-1)_0%,var(--panel-bg-2)_100%)] px-4 py-6 opacity-90"
        dir="ltr"
      >
        <div className="relative flex w-full shrink-0 items-start justify-end gap-4">
          <div className="relative flex shrink-0 items-center justify-end" dir="ltr">
            <p className="relative shrink-0 text-right font-['Heebo'] text-xs font-normal leading-5 text-[var(--ctl-muted)]">
              {time}
            </p>
            <div className="flex h-full flex-row items-center self-stretch">
              <DividerVertical className="relative flex h-full shrink-0 items-start px-2 py-0" />
            </div>
            <p className="relative shrink-0 text-right font-['Heebo'] text-xs font-normal leading-5 text-[var(--ctl-muted)]">
              {date}
            </p>
          </div>
          <div className="relative flex w-[100px] shrink-0 items-center justify-end">
            <p
              className="relative shrink-0 text-right font-['Heebo'] text-sm font-bold leading-[22px] text-[var(--ctl-fg)]"
              dir="rtl"
            >
              {category}
            </p>
          </div>
        </div>

        {data.map((item, index) => (
          <div key={index} className="relative flex w-full shrink-0 flex-col items-end gap-2">
            <div className="relative flex w-full shrink-0 items-center justify-end gap-4">
              <div className="relative flex shrink-0 items-center justify-end">
                <p
                  className="relative shrink-0 text-right font-['Heebo'] text-xs font-normal leading-5 text-[var(--ctl-fg)]"
                  dir="ltr"
                >
                  {item.value}
                </p>
              </div>
              <div className="relative flex w-[100px] shrink-0 items-center justify-end">
                <p
                  className="relative shrink-0 text-right font-['Heebo'] text-xs font-normal leading-5 text-[var(--ctl-fg)]"
                  dir="rtl"
                >
                  {item.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

