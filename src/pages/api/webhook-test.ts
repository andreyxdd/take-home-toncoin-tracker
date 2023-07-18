/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    const body = JSON.parse(req.body)

    console.log(JSON.stringify(body, null, 2));

    return res.status(200);
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
}
