import { Select } from '../basic/select';
import { IncrementInput } from '../basic/increment-input';
import { cn } from '@/lib/utils';

export type RelativeTimeUnits = 'days' | 'weeks' | 'months' | 'years';
export type RelativeTime = { units: RelativeTimeUnits, amount: number };

interface RelativeTimePickerProps {
  time: RelativeTime;
  setTime: (time: RelativeTime) => void;
  className?: string;
}

export const RelativeTimePicker = ({
  time,
  setTime,
  className,
}: RelativeTimePickerProps) => {
  const timeUnits = [
    { label: 'ימים', value: 'days' },
    { label: 'שבועות', value: 'weeks' },
    { label: 'חודשים', value: 'months' },
    { label: 'שנים', value: 'years' },
  ]

  const changeTimeAmount = (newAmount: number) => setTime({...time, amount: newAmount});
  const changeTimeUnits = (newUnits: RelativeTimeUnits) => setTime({...time, units: newUnits});

  return (
    <div className={cn('flex flex-row gap-2 justify-start items-center ', className)}>
      <div className="w-1/3">
        <p className='mr-5'>זמן אוחר</p>
      </div>
      <IncrementInput className="h-8" value={time.amount} onChange={changeTimeAmount} />
      <Select
        className="w-1/3"
        value={time.units}
        onChange={(newUnit) => changeTimeUnits(newUnit as RelativeTimeUnits)}
        options={timeUnits}
      />
    </div>
  );
};

