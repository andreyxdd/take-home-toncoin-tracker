/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataItem } from '@/types';
import { isTransactionsSlug, isInterval } from '@/utils/typeguards';

const queryParams = {
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<DataItem>>,
) {
  const { query: { slug, interval } } = req;

  if (typeof slug !== 'string') return res.status(404).end();
  if (!isTransactionsSlug(slug)) return res.status(404).end();

  if (typeof interval !== 'string') return res.status(404).end();
  if (!isInterval(interval)) return res.status(404).end();

  let multiplier = 1;
  if (slug === 'tps') multiplier = 1 / (24 * 60 * 60);

  try {
    const apiUrl: string | undefined = process.env.TON_STATS_API;
    if (!apiUrl) throw new Error('TON_STATS_API is not found');

    const response = await fetch(apiUrl);
    const json = await response.json();

    const data: Array<DataItem> = json.map((item: any) => ({
      date: item.to_timestamp * 1000, // convert to ms
      [slug]: item.transactions_count * multiplier,
    })).slice(-queryParams[interval] - 1);
    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
