import { useState } from 'react';
import moment from 'moment';
import { RelativeTimePicker } from './RelativeTimePicker';
import { AbsoluteTimePicker } from './AbosluteTimePicker';
import { TabSelect } from './TabSelect';
interface TimePickerProps {
  time: { start: moment.Moment; end: moment.Moment };
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
  defaultTimeMode?: 'relative' | 'absolute';
  className?: string;
}
export const TimePicker = ({ time, setTime, defaultTimeMode = 'relative', className }: TimePickerProps) => {
  const [timeMode, setTimeMode] = useState<'relative' | 'absolute'>(defaultTimeMode);
  return (
    <div className={className}>
      <TabSelect
        value={timeMode}
        onValueChange={value => setTimeMode(value as 'relative' | 'absolute')}
        options={[
          { label: 'זמן אוחר', value: 'relative', content: <RelativeTimePicker setTime={setTime} /> },
          { label: 'טווח', value: 'absolute', content: <AbsoluteTimePicker time={time} setTime={setTime} /> },
        ]}
      />
    </div>
  );
};
