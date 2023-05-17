import { useQuery } from '@tanstack/react-query';
import { Periods } from '@/types';

export type DataItem = {
  date: number;
  transaction_count: number;
};

const API_URL = 'https://tontech.io/api/transactions_count';

const queryMapping = {
  day: 1,
  week: 7,
  month: 30,
  year: 365,
};

const useTransactionsQuery = (period: Periods) => {
  const query = useQuery({
    queryKey: ['data-query-transactions', period],
    queryFn: async () => {
      const response = await fetch(API_URL);
      const json = await response.json();
      const data: Array<DataItem> = json.map(({ from_timestamp, transactions_count }:any) => ({
        date: from_timestamp * 1000,
        transactions_count,
      }));
      return data.slice(-queryMapping[period]);
    },
    staleTime: Infinity,
  });
  return query;
};

export default useTransactionsQuery;
