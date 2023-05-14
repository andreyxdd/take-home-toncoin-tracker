import { useQuery } from '@tanstack/react-query';
import { DataItem, Periods } from '@/types';

const mapping = {
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

const useDataQuery = (period: Periods) => {
  const query = useQuery({
    queryKey: ['data-query', period],
    queryFn: async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd${mapping[period].days}${mapping[period].interval}`);
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

export default useDataQuery;
