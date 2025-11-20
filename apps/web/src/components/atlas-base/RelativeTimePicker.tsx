import moment from 'moment';
import { useState, useEffect } from 'react';
import { Select } from './Select';
import { IncrementInput } from './IncrementInput';
import { cn } from '@/lib/utils';
interface RelativeTimePickerProps {
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
  timeUnits?: { label: string; value: moment.unitOfTime.Base }[];
  className?: string;
}

export const RelativeTimePicker = ({
  timeUnits = [
    { label: 'ימים', value: 'days' },
    { label: 'שבועות', value: 'weeks' },
    { label: 'חודשים', value: 'months' },
    { label: 'שנים', value: 'years' },
  ],
  setTime,
  className,
}: RelativeTimePickerProps) => {
  const [timeUnit, setTimeUnit] = useState<moment.unitOfTime.Base>(timeUnits[0].value);
  const [timeAmount, setTimeAmount] = useState(1);

  useEffect(() => {
    setTime({ start: moment().subtract(timeAmount, timeUnit), end: moment() });
  }, [timeAmount, timeUnit, setTime]);

  return (
    <div className={cn('flex flex-row gap-2 justify-start items-center ', className)}>
      <div className="w-1/3">
        <p>זמן אוחר</p>
      </div>
      <IncrementInput className="w-1/3" value={timeAmount} onChange={setTimeAmount} />
      <Select
        className="w-1/3 flex justify-between p-1"
        value={timeUnit}
        onChange={value => setTimeUnit(value as moment.unitOfTime.Base)}
        options={timeUnits}
      />
    </div>
  );
};
