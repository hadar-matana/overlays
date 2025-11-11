import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '@zohan/ui/components/button';
import { cn } from '../../lib/utils';

type PrimaryActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export const PrimaryActionButton = ({
  children,
  className,
  type = 'button',
  ...props
}: PrimaryActionButtonProps) => {
  return (
    <Button
      type={type}
      dir="rtl"
      className={cn(
        'h-[32px] w-[61px] items-center justify-center gap-2 rounded-[8px] border-none',
        'bg-[linear-gradient(225deg,#06E0B2_0%,#048268_100%)] px-[12px] py-[6px]',
        'text-[14px] leading-[22px] font-normal text-white',
        'transition-transform duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06E0B2]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F111A]',
        'disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none',
        className,
      )}
      style={{ fontFamily: 'Heebo, sans-serif' }}
      {...props}
    >
      {children}
    </Button>
  );
};

