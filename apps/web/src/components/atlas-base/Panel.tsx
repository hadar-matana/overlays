import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

type PanelProps = HTMLAttributes<HTMLDivElement>;

const Panel = forwardRef<HTMLDivElement, PanelProps>(({ className, dir = 'rtl', ...props }, ref) => {
  const panelClasses = cn(
    'flex h-[646px] w-full flex-col gap-[var(--panel-gap)] rounded-b-[8px] rounded-t-none bg-[linear-gradient(180deg,var(--panel-bg-1)_0%,var(--panel-bg-2)_100%)] px-[var(--panel-pad-x)] py-[var(--panel-pad-y)] opacity-[0.95] shadow-[0_16px_32px_rgba(5,8,15,0.35)]',
    className,
  );

  return <div ref={ref} dir={dir} className={panelClasses} {...props} />;
});

Panel.displayName = 'Panel';

export default Panel;
