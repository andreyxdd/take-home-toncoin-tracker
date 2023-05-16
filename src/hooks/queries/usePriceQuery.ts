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
