/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataItem } from '@/types';
import { isMarketSlug, isPeriod } from '@/utils/typeguards';

const queryParams = {
  day: {
    interval: '',
    days: '&days=1',
  },
  week: {
    interval: '',
    days: '&days=7',
  },
  month: {
    interval: '&interval=daily',
    days: '&days=60',
  },
  year: {
    interval: '&interval=daily',
    days: '&days=365',
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<DataItem>>,
) {
  const { query: { slug, period } } = req;

  if (typeof slug !== 'string') return res.status(404).end();
  if (!isMarketSlug(slug)) return res.status(404).end();

  if (typeof period !== 'string') return res.status(404).end();
  if (!isPeriod(period)) return res.status(404).end();

  try {
    const apiUrl: string | undefined = process.env.COINGECKO_STATS_API;
    if (!apiUrl) throw new Error('COINGECKO_STATS_API is not found');

    const response = await fetch(
      `${apiUrl}${queryParams[period].days}${queryParams[period].interval}`,
    );
    const json = await response.json();

    const data: Array<DataItem> = json[slug].map((item: [number, number]) => ({
      date: item[0],
      [slug]: item[1],
    }));

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
