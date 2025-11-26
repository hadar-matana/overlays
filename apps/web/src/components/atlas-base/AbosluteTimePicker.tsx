import moment from 'moment';
import { RangeCalendar } from '@zohan/ui/components/calendar';
import { CalendarDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
interface AbsoluteTimePickerProps {
  time: { start: moment.Moment; end: moment.Moment };
  setTime: (time: { start: moment.Moment; end: moment.Moment }) => void;
}

export const AbsoluteTimePicker = ({ time, setTime }: AbsoluteTimePickerProps) => {
  return (
    <div>
      <I18nProvider locale="he">
        <RangeCalendar
          className="dark"
          value={{
            start: new CalendarDate(time.start.year(), time.start.month(), time.start.date()),
            end: new CalendarDate(time.end.year(), time.end.month(), time.end.date()),
          }}
          onChange={newDateSpan =>
            setTime({
              start: moment(newDateSpan.start),
              end: moment(newDateSpan.end),
            })
          }
        />
      </I18nProvider>
    </div>
  );
};
