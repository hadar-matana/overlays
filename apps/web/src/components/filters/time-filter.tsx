import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { RelativeTimePicker } from '../atlas-base/time/relative-time-picker';
import { AbsoluteTimePicker } from '../atlas-base/time/absolute-time-picker';
import { TabSelect } from '../atlas-base/basic/tab-select';
import { Expander } from '../atlas-base/basic/expander';

interface TimeFilterProps {
  time: { start: moment.Moment; end: moment.Moment };
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
  defaultTimeMode?: 'relative' | 'absolute';
  className?: string;
}

export const TimeFilter = ({
  time,
  setTime,
  defaultTimeMode = 'relative',
  className,
}: TimeFilterProps) => {
  const [timeMode, setTimeMode] = useState<'relative' | 'absolute'>(defaultTimeMode);
  const hasSetAbsoluteDefault = useRef(false);
  const lastAbsoluteTime = useRef<{ start: moment.Moment; end: moment.Moment } | null>(null);

  useEffect(() => {
    if (timeMode === 'absolute') {
      lastAbsoluteTime.current = {
        start: time.start.clone(),
        end: time.end.clone(),
      };
    }
  }, [time, timeMode]);

  const handleTimeModeChange = (value: string) => {
    const newMode = value as 'relative' | 'absolute';
    setTimeMode(newMode);

    if (newMode === 'absolute') {
      if (!hasSetAbsoluteDefault.current) {
        const newStart = time.start.clone().hour(9).minute(0).second(0);
        const newEnd = time.end.clone().hour(23).minute(0).second(0);
        setTime({ start: newStart, end: newEnd });
        lastAbsoluteTime.current = { start: newStart, end: newEnd };
        hasSetAbsoluteDefault.current = true;
      } else if (lastAbsoluteTime.current) {
        setTime({
          start: lastAbsoluteTime.current.start.clone(),
          end: lastAbsoluteTime.current.end.clone(),
        });
      }
    }
  };

  return (
    <div className={className}>
      <Expander
        items={[
          {
            id: 'times',
            header: 'זמנים',
            content: (
              <TabSelect
                value={timeMode}
                onValueChange={handleTimeModeChange}
                options={[
                  {
                    label: 'זמן אוחר',
                    value: 'relative',
                    content: <RelativeTimePicker setTime={setTime} />,
                  },
                  {
                    label: 'טווח',
                    value: 'absolute',
                    content: <AbsoluteTimePicker time={time} setTime={setTime} />,
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
