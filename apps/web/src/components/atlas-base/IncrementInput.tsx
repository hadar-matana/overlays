import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface IncrementInputProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const IncrementInput = ({
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  className,
  ...props
}: IncrementInputProps) => {
  const canDecrement = value > min;

  const handleIncrement = () => {
    let next = value + step;
    if (max !== undefined) next = Math.min(max, next);
    onChange(next);
  };

  const handleDecrement = () => {
    let next = value - step;
    if (next < min) return;
    onChange(next);
  };

  return (
    <div
      dir="ltr" 
      className={cn(
        'inline-flex h-[30px] items-stretch overflow-hidden',
        'rounded-[7px] border border-[#1FC5A8] bg-[#26292F]',
        'text-[14px] leading-[22px] text-white',
        className,
      )}
    >
      <div className="flex w-4 flex-col border-r border-[#434343]">
        <button
          type="button"
          onClick={handleIncrement}
          className="flex flex-1 items-center justify-center border-b border-[#434343] bg-transparent"
        >
          <ChevronUpIcon className="h-3 w-3" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          className={cn(
            'flex flex-1 items-center justify-center bg-transparent',
            !canDecrement && 'opacity-40 cursor-default',
          )}
        >
          <ChevronDownIcon className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      {/* number */}
      <div className="flex flex-1 items-center justify-center px-2">
        <input {...props} type="hidden" value={value} readOnly />
        <span className="tabular-nums">{value}</span>
      </div>
    </div>
  );
};
