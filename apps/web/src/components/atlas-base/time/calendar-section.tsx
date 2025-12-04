import moment from 'moment';
import { RangeCalendar } from '@zohan/ui/components/calendar';
import { CalendarDate } from '@internationalized/date';
import { parseTimeString } from './time-parser';

interface CalendarSectionProps {
  start: moment.Moment;
  end: moment.Moment;
  startTimeText: string;
  endTimeText: string;
  onDateChange: (start: moment.Moment, end: moment.Moment) => void;
}

export const CalendarSection = ({
  start,
  end,
  startTimeText,
  endTimeText,
  onDateChange,
}: CalendarSectionProps) => {
  const handleChange = (newDateSpan: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    const startParsed = parseTimeString(startTimeText);
    const endParsed = parseTimeString(endTimeText);
    
    const startHours = startParsed?.hours ?? start.hour();
    const startMinutes = startParsed?.minutes ?? start.minute();
    const endHours = endParsed?.hours ?? end.hour();
    const endMinutes = endParsed?.minutes ?? end.minute();
    
    const newStart = moment(newDateSpan.start)
      .hour(startHours)
      .minute(startMinutes)
      .second(0);
    const newEnd = moment(newDateSpan.end)
      .hour(endHours)
      .minute(endMinutes)
      .second(0);
    onDateChange(newStart, newEnd);
  };

  return (
    <div className="flex w-full justify-center">
      <RangeCalendar
        className="dark"
        value={{
          start: new CalendarDate(start.year(), start.month(), start.date()),
          end: new CalendarDate(end.year(), end.month(), end.date()),
        }}
        onChange={handleChange}
      />
    </div>
  );
};

