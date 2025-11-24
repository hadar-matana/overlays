export type OverlayInfoData = {
  label: string;
  value: string;
};

export type OverlayResultItem = {
  id: string;
  sensor: string;
  date: string;
  time: string;
  info?: {
    title: string;
    category: string;
    data: OverlayInfoData[];
  };
};

export const mockOverlayResults: OverlayResultItem[] = [
  {
    id: 'ovr_001',
    sensor: 'צילומי טיסות',
    date: '15/02/24',
    time: '10:15:30',
    info: {
      title: 'נתוני צילום',
      category: 'צילומי טיסות',
      data: [
        { label: 'רזולוציה', value: '1080' },
        { label: 'ברזולוציה גבוהה', value: '4K' },
        { label: 'רזולוציה סטנדרטית', value: '720' },
        { label: 'איכות מלאה', value: '1080P' },
        { label: 'רזולוציה נמוכה', value: '480' },
        { label: 'איכות בינונית', value: '2K' },
      ],
    },
  },
  {
    id: 'ovr_002',
    sensor: 'צילומי טיסות',
    date: '16/02/24',
    time: '14:22:15',
    info: {
      title: 'נתוני צילום',
      category: 'צילומי טיסות',
      data: [
        { label: 'רזולוציה', value: '1920' },
        { label: 'ברזולוציה גבוהה', value: '8K' },
        { label: 'רזולוציה סטנדרטית', value: '1080' },
        { label: 'איכות מלאה', value: '2160P' },
        { label: 'רזולוציה נמוכה', value: '720' },
        { label: 'איכות בינונית', value: '4K' },
      ],
    },
  },
  {
    id: 'ovr_003',
    sensor: 'צילומי טיסות',
    date: '17/02/24',
    time: '09:05:48',
    info: {
      title: 'נתוני צילום',
      category: 'צילומי טיסות',
      data: [
        { label: 'רזולוציה', value: '720' },
        { label: 'ברזולוציה גבוהה', value: '2K' },
        { label: 'רזולוציה סטנדרטית', value: '480' },
        { label: 'איכות מלאה', value: '720P' },
        { label: 'רזולוציה נמוכה', value: '360' },
        { label: 'איכות בינונית', value: '1080' },
      ],
    },
  },
];
