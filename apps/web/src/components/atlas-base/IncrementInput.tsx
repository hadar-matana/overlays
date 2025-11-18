import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@zohan/ui/components/button';
import { cn } from '../../lib/utils';

export interface IncrementInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const IncrementInput = ({ value, onChange, step = 1, min = 0, className, ...props }: IncrementInputProps) => {
  const BG = '#26292F';
  const RADIUS = 'rounded-[4px]';
  const BORDER_IDLE = '#26292F';

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const canDecrement = value > min;

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-between overflow-hidden',
          RADIUS,
          'text-sm font-medium text-white',
          `bg-[${BG}]`,
          `border border-[${BORDER_IDLE}]`,
          'transition-colors',
          'hover:border-white/30',
          'outline-none ring-0 focus-within:outline-none focus-within:ring-0 focus-within:border-[#1FC5A8]',
          className,
        )}
      >
        <div className="display-flex flex-col items-center justify-center min-w-0">
          <p className="w-7 text-center tabular-nums text-sm text-white outline-none ring-0" {...props}>
            {value}
          </p>
        </div>
        <div className="flex h-6 flex-col border-[#26292F]">
          <Button
            className="h-1/2 w-6 rounded-none border-white/10 bg-transparent hover:bg-[#1FC5A8]/10 hover:border-transparent transition-colors outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 p-0"
            onClick={() => onChange(value + step)}
          >
            <ChevronUpIcon />
          </Button>
          <Button
            className="h-1/2 w-6 rounded-none border-white/10 bg-transparent hover:bg-[#1FC5A8]/10 hover:border-transparent transition-colors outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 p-0"
            onClick={handleDecrement}
            disabled={!canDecrement}
          >
            <ChevronDownIcon />
          </Button>
        </div>
      </div>
    </>
  );
};
