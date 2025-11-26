import { useState } from 'react';
import moment from 'moment';
import { RelativeTimePicker } from './RelativeTimePicker';
import { AbsoluteTimePicker } from './AbosluteTimePicker';
import { TabSelect } from './TabSelect';
import { Expander } from './Expander';
interface TimeFilterProps {
  time: { start: moment.Moment; end: moment.Moment };
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
  defaultTimeMode?: 'relative' | 'absolute';
  className?: string;
}
export const TimeFilter = ({ time, setTime, defaultTimeMode = 'relative', className }: TimeFilterProps) => {
  const [timeMode, setTimeMode] = useState<'relative' | 'absolute'>(defaultTimeMode);
  return (
    <div className={className}>
      <Expander
        className="gap-0"
        itemClassName="rounded-none"
        triggerClassName="rounded-none px-0 py-2 text-white/60"
        contentClassName="px-0 pt-2"
        items={[
          {
            id: 'times',
            header: 'זמנים',
            content: (
              <TabSelect
                value={timeMode}
                onValueChange={value => setTimeMode(value as 'relative' | 'absolute')}
                options={[
                  { label: 'זמן אוחר', value: 'relative', content: <RelativeTimePicker setTime={setTime} /> },
                  { label: 'טווח', value: 'absolute', content: <AbsoluteTimePicker time={time} setTime={setTime} /> },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

