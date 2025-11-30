import moment from 'moment';
import { formatTimeInput } from './time-formatter';

interface DateTimeRowProps {
  label: string;
  date: moment.Moment;
  timeText: string;
  placeholder: string;
  onTimeTextChange: (value: string) => void;
}

const timeInputClass =
  'h-8 w-[70px] rounded-[4px] border border-[color:var(--line)] ' +
  'bg-[#26292F] px-1.5 text-[13px] leading-[20px] tabular-nums text-white ' +
  'placeholder:text-white/40 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1FC5A8] focus-visible:border-[#1FC5A8] ' +
  'transition-colors duration-150';

export const DateTimeRow = ({
  label,
  date,
  timeText,
  placeholder,
  onTimeTextChange,
}: DateTimeRowProps) => {
  const formatDate = (date: moment.Moment) => date.format('DD/MM/YYYY');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatTimeInput(value);
    onTimeTextChange(formatted);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="w-4 shrink-0 text-[13px] leading-[20px] text-[#FFFFFFCC]">
        {label}
      </span>
      <span className="min-w-[90px] tabular-nums text-[13px] leading-[20px] text-[#FFFFFFE0]">
        {formatDate(date)}
      </span>
      <input
        type="text"
        inputMode="numeric"
        maxLength={5}
        value={timeText}
        onChange={handleChange}
        placeholder={placeholder}
        className={timeInputClass}
        dir="ltr"
      />
    </div>
  );
};

