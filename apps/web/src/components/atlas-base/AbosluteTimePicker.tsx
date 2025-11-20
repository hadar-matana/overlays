import moment from 'moment';
import { RangeCalendar } from '@zohan/ui/components/calendar';
import { CalendarDate } from '@internationalized/date';
interface AbsoluteTimePickerProps {
  time: { start: moment.Moment; end: moment.Moment };
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
}

export const AbsoluteTimePicker = ({ time, setTime }: AbsoluteTimePickerProps) => {
  return (
    <div>
      <RangeCalendar
        className="dark"
        value={{
          start: new CalendarDate(time.start.year(), time.start.month(), time.start.date() + 1),
          end: new CalendarDate(time.end.year(), time.end.month(), time.end.date() + 1),
        }}
        onChange={newDateSpan =>
          setTime({
            start: moment(newDateSpan.start),
            end: moment(newDateSpan.end),
          })
        }
      />
    </div>
  );
};
