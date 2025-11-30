import { useState } from 'react';
import { Info, Plane, Wand2 } from 'lucide-react';
import type { OverlayResultItem } from '@/lib/mock-overlays';
import { cn } from '@/lib/utils';
import { OverlayInfo } from './overlay-info';

type OverlayResultProps = Pick<OverlayResultItem, 'sensor' | 'date' | 'time' | 'info'> & {
  className?: string;
  onClick?: () => void;
};

export const OverlayResult = ({ sensor, date, time, info, className, onClick }: OverlayResultProps) => {
  const [isPluginSearchOpen, setIsPluginSearchOpen] = useState(false);

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPluginSearchOpen(true);
  };

  const handleClosePluginSearch = () => {
    setIsPluginSearchOpen(false);
  };

  return (
    <>
      <button
        type="button"
        dir="ltr"
        onClick={onClick}
        className={cn(
          'flex w-full items-center justify-between py-[6px] px-3 rounded-md',
          'text-white outline-none hover:bg-white/5 focus-visible:bg-white/10',
          className,
        )}
        aria-label={`תוצאה עבור ${sensor} בתאריך ${date} בשעה ${time}`}
      >
        <div className="flex items-center gap-4 text-white/70" aria-hidden>
          <button
            type="button"
            onClick={handleInfoClick}
            className="flex h-4 w-4 items-center justify-center hover:text-white/90 transition-colors"
            aria-label="פתח מידע נוסף"
          >
            <Info className="h-3 w-3" strokeWidth={1.5} />
          </button>
          <span className="flex h-4 w-4 items-center justify-center">
            <Wand2 className="h-3 w-3" strokeWidth={1.5} />
          </span>
        </div>

        <div className="flex flex-col items-end text-right" dir="rtl">
          <div className="flex flex-row-reverse items-center gap-2">
            <span className="text-[14px] leading-[22px] font-bold text-white/90">{sensor}</span>
            <Plane
              className="h-[12px] w-[13px] text-white/90 rotate-45 transform translate-x-[6px]"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>

          <div className="mt-1 flex items-center justify-end gap-2 text-[12px] leading-[20px] text-white/50" dir="ltr">
            <span className="tabular-nums">{time}</span>
            <span aria-hidden className="h-5 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
            <span className="tabular-nums">{date}</span>
          </div>
        </div>
      </button>

      {isPluginSearchOpen && info && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClosePluginSearch}
        >
          <div className="w-[300px]" onClick={e => e.stopPropagation()}>
            <OverlayInfo
              title={info.title}
              category={info.category}
              date={date}
              time={time}
              data={info.data}
              onClose={handleClosePluginSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};

