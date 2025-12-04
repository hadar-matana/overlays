export const formatTimeInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  
  if (digits.length === 1) {
    const firstDigit = Number(digits[0]);
    if (firstDigit > 2) return '';
    return digits;
  }
  
  if (digits.length === 2) {
    const hours = Number(digits);
    if (hours > 23) {
      return '23';
    }
    return digits;
  }
  
  const hoursStr = digits.slice(0, 2);
  let hours = Number(hoursStr);
  
  if (hours > 23) {
    hours = 23;
  }
  
  const minutesStr = digits.slice(2, 4);
  
  if (digits.length === 3) {
    return `${String(hours).padStart(2, '0')}:${minutesStr}`;
  }
  
  if (digits.length >= 4) {
    let minutes = Number(minutesStr);
    if (minutes > 59) {
      minutes = 59;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  
  return `${String(hours).padStart(2, '0')}:${minutesStr}`;
};

export const handleTimeInputChange = (
  value: string,
  cursorPosition: number,
): { formatted: string; newCursor: number } => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return { formatted: '', newCursor: 0 };
  }
  
  if (digits.length <= 2) {
    return { formatted: digits, newCursor: digits.length };
  }
  
  const hours = digits.slice(0, 2);
  const minutes = digits.slice(2, 4);
  const formatted = `${hours}:${minutes}`;
  
  let newCursor = cursorPosition;
  if (cursorPosition <= 2 && digits.length > 2) {
    newCursor = 3;
  } else if (cursorPosition === 3 && digits.length > 2) {
    newCursor = 4;
  } else if (cursorPosition > formatted.length) {
    newCursor = formatted.length;
  }
  
  return { formatted, newCursor };
};

