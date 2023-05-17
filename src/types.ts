export const INTERVALS = ['day', 'week', 'month', 'year'] as const;
export type Interval = typeof INTERVALS[number];
export type IntervalWithoutDay = Exclude<Interval, 'day'>;

export const MARKET_SLUGS = ['prices', 'total_volumes'] as const;
export type MarketSlug = typeof MARKET_SLUGS[number];

export const TRANSACTIONS_SLUGS = ['total', 'tps'] as const;
export type TransactionsSlug = typeof TRANSACTIONS_SLUGS[number];

export type NonEmptyArray<T> = [T, ...T[]];

export type DataItem = {
  date: number;
  [key: string]: number;
};
