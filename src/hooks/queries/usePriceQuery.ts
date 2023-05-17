import { useQuery } from '@tanstack/react-query';
import { Period } from '@/types';

const usePriceQuery = (period: Period) => {
  const query = useQuery({
    queryKey: ['price-query', period],
    queryFn: async () => {
      const response = await fetch(`/api/market/prices?period=${period}`);
      const data = await response.json();
      return data;
    },
    staleTime: Infinity,
  });
  return query;
};

export default usePriceQuery;
