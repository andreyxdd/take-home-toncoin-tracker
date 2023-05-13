import { DataItem } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useDataQuery = () => {
  const query = useQuery({
    queryKey: ['data-query'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=14&interval=daily');
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
