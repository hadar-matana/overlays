import { RelativeTimePicker, type RelativeTime } from '../atlas-base/time/relative-time-picker';
import { AbsoluteTimePicker, type AbsoluteTime } from '../atlas-base/time/absolute-time-picker';
import { TabSelect } from '../atlas-base/basic/tab-select';
import { Expander } from '../atlas-base/basic/expander';

export type TimeMode = 'relative' | 'absolute';

interface TimeFilterProps {
  timeMode: TimeMode;
  absoluteTime: AbsoluteTime;
  relativeTime: RelativeTime;
  setTimeMode: (mode: TimeMode) => void;
  setAbsoluteTime: (time: AbsoluteTime) => void;
  setRelativeTime: (time: RelativeTime) => void;
  className?: string;
}

export const TimeFilter = ({
  timeMode,
  absoluteTime,
  relativeTime,
  setTimeMode,
  setAbsoluteTime,
  setRelativeTime,
  className,
}: TimeFilterProps) => {
  return (
    <div className={className}>
      <Expander
        contentClassName="px-3.5 pt-3.5"
        items={[
          {
            id: 'times',
            header: 'זמנים',
            content: (
              <TabSelect
                value={timeMode}
                onValueChange={setTimeMode}
                options={[
                  {
                    label: 'זמן אוחר',
                    value: 'relative',
                    content: <RelativeTimePicker time={relativeTime} setTime={setRelativeTime} />,
                  },
                  {
                    label: 'טווח',
                    value: 'absolute',
                    content: <AbsoluteTimePicker time={absoluteTime} setTime={setAbsoluteTime} />,
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
