import { useQuery } from '@tanstack/react-query';
import { Period } from '@/types';

export type DataItem = {
  date: number;
  transaction_count: number;
};

const useTransactionsQuery = (period: Period) => {
  const query = useQuery({
    queryKey: ['data-query-transactions', period],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/total?period=${period}`);
      const data = await response.json();
      return data;
    },
    staleTime: Infinity,
  });
  return query;
};

export default useTransactionsQuery;
