export const pages = ['Trucks', 'Analyzer', 'Order'] as const;

export type PageTypes = typeof pages[number];

export const RecordOfPages: Record<PageTypes, string> = {
  Trucks: 'Trucks',
  Analyzer: 'Analyzer',
  Order: 'Order',
};
