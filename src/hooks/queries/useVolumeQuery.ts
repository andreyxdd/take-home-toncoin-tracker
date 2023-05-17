import { useQuery } from '@tanstack/react-query';
import { Period } from '@/types';

const useVolumeQuery = (period: Period) => {
  const query = useQuery({
    queryKey: ['data-query', period],
    queryFn: async () => {
      const response = await fetch(`/api/market/total_volumes?period=${period}`);
      const data = await response.json();
      return data;
    },
    staleTime: Infinity,
  });
  return query;
};

export default useVolumeQuery;
