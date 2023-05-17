import {
  MARKET_SLUGS, MarketSlug, TRANSACTIONS_SLUGS, TransactionsSlug, INTERVALS, Interval,
} from '@/types';

export function isMarketSlug(indicator: string): indicator is MarketSlug {
  return MARKET_SLUGS.includes(indicator as MarketSlug);
}

export function isTransactionsSlug(indicator: string): indicator is TransactionsSlug {
  return TRANSACTIONS_SLUGS.includes(indicator as TransactionsSlug);
}

export function isInterval(interval: string): interval is Interval {
  return INTERVALS.includes(interval as Interval);
}
