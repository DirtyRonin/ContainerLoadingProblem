export const pages = ['Trucks', 'Goods', 'Analyzer', 'Order'] as const;

export type PageTypes = typeof pages[number];

export const RecordOfPages: Record<PageTypes, string> = {
  Trucks: 'Trucks',
  Goods: 'Goods',
  Analyzer: 'Analyzer',
  Order: 'Order',
};
