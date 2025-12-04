import moment from 'moment';
import { useEffect, useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { CalendarSection } from './calendar-section';
import { DateTimeRow } from './date-time-row';
import { parseTimeString } from './time-parser';

export type AbsoluteTime = { start: any; end: any };

interface AbsoluteTimePickerProps {
  time: AbsoluteTime;
  setTime: (time: AbsoluteTime) => void;
}

export const AbsoluteTimePicker = ({ time, setTime }: AbsoluteTimePickerProps) => {
  const [startText, setStartText] = useState(() => time.start.format('HH:mm'));
  const [endText, setEndText] = useState(() => time.end.format('HH:mm'));

  useEffect(() => {
    setStartText(time.start.format('HH:mm'));
  }, [time.start]);

  useEffect(() => {
    setEndText(time.end.format('HH:mm'));
  }, [time.end]);

  const handleStartTimeTextChange = (value: string) => {
    setStartText(value);

    const parsed = parseTimeString(value);
    if (!parsed) return;

    const { hours, minutes } = parsed;
    const newStart = time.start.clone().hour(hours).minute(minutes).second(0);
    setTime({ ...time, start: newStart });
  };

  const handleEndTimeTextChange = (value: string) => {
    setEndText(value);

    const parsed = parseTimeString(value);
    if (!parsed) return;

    const { hours, minutes } = parsed;
    const newEnd = time.end.clone().hour(hours).minute(minutes).second(0);
    setTime({ ...time, end: newEnd });
  };

  const handleDateChange = (newStart: moment.Moment, newEnd: moment.Moment) => {
    setTime({ start: newStart, end: newEnd });
  };

  return (
    <I18nProvider locale="he">
      <div className="flex w-full flex-col gap-3">
        <CalendarSection
          start={time.start}
          end={time.end}
          startTimeText={startText}
          endTimeText={endText}
          onDateChange={handleDateChange}
        />

        <div className="flex flex-col items-center gap-2" dir="rtl">
          <DateTimeRow
            label="מ"
            date={time.start}
            timeText={startText}
            placeholder="09:00"
            onTimeTextChange={handleStartTimeTextChange}
          />
          <DateTimeRow
            label="עד"
            date={time.end}
            timeText={endText}
            placeholder="23:00"
            onTimeTextChange={handleEndTimeTextChange}
          />
        </div>
      </div>
    </I18nProvider>
  );
};

