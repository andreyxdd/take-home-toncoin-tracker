/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-extraneous-dependencies
import Series from 'time-series-data-generator';

import { DataItem } from '@/types';
import { isPeriod } from '@/utils/typeguards';
import sub from 'date-fns/sub';

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
  const { query: { period } } = req;

  if (typeof period !== 'string') return res.status(404).end();
  if (!isPeriod(period)) return res.status(404).end();

  try {
    const until = sub(new Date(), { days: 1 }).toISOString();
    const from = sub(new Date(until), { days: queryParams[period] }).toISOString();
    const series = new Series({
      until,
      from,
      interval: 3600 * 24,
      keyName: 'mock',
      type: 'monospaced',
    });

    const generated = series.gaussian();
    const data = generated.map(({ timestamp, mock }: any, idx: number) => ({
      date: new Date(timestamp).getTime(),
      mock: mock * (idx + 1),
    }));

    return res.status(200).send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
