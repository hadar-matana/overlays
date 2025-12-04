import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

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
  const [inputValue, setInputValue] = React.useState<string>(value.toString());

  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const setValue = (newValue: number) => {
    onChange(Math.max(min, max !== undefined ? Math.min(max, newValue) : newValue));
  };

  const handleIncrement = () => setValue(value + step);
  const handleDecrement = () => value - step >= min && setValue(value - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || val === '-' || !isNaN(Number(val))) {
      setInputValue(val);
    }
  };

  const handleInputBlur = () => {
    const num = Number(inputValue);
    if (isNaN(num) || inputValue.trim() === '') {
      setInputValue(value.toString());
    } else {
      setValue(num);
    }
  };

  return (
    <div
      dir="ltr" 
      tabIndex={0}
      className={cn(
        'inline-flex h-8 w-1/4 items-stretch overflow-hidden',
        'rounded-[7px] border border-[#434343] bg-[#26292F]',
        'text-[14px] leading-[22px] text-white',
        'focus-within:border-[#1FC5A8] focus:border-[#1FC5A8] focus:outline-none',
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
          disabled={value <= min}
          className={cn(
            'flex flex-1 items-center justify-center bg-transparent',
            value <= min && 'opacity-40 cursor-default',
          )}
        >
          <ChevronDownIcon className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-2">
        <input
          {...props}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          className="w-full text-center bg-transparent border-none outline-none tabular-nums text-white"
        />
      </div>
    </div>
  );
};

