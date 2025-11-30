export const parseTimeString = (
  value: string,
): { hours: number; minutes: number } | null => {
  const m = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;

  const hours = Number(m[1]);
  const minutes = Number(m[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return { hours, minutes };
};

