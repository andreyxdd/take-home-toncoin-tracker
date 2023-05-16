import { useQuery } from '@tanstack/react-query';
import { Periods } from '@/types';

export type DataItem = {
  date: number;
  price: number;
};

const API_URL = 'https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd';

const queryMapping = {
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

// [
//         {
//           date: 1684242059302,
//           price: 1.9730524589423437,
//         },
//         {
//           date: 1684242356138,
//           price: 1.9730572109279176,
//         },
//         {
//           date: 1684242658033,
//           price: 1.973079861351471,
//         },
//         {
//           date: 1684242969460,
//           price: 1.9726824946406056,
//         },
//         {
//           date: 1684243284100,
//           price: 1.9727125046942118,
//         },
//         {
//           date: 1684243552236,
//           price: 1.972425822624428,
//         },
//         {
//           date: 1684243868600,
//           price: 1.9734557321736586,
//         },
//         {
//           date: 1684244155989,
//           price: 1.9720734650509082,
//         },
//         {
//           date: 1684244496525,
//           price: 1.974382030393772,
//         },
//         {
//           date: 1684244703000,
//           price: 1.9742305841222239,
//         },
//       ],

const usePriceQuery = (period: Periods) => {
  const query = useQuery({
    queryKey: ['price-query', period],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}${queryMapping[period].days}${queryMapping[period].interval}`,
      );
      const json = await response.json();
      const data: Array<DataItem> = json.prices.map((item: [number, number]) => ({
        date: item[0],
        price: item[1],
      }));
      return data;
    },
    staleTime: Infinity,
  });
  return query;
};

export default usePriceQuery;
