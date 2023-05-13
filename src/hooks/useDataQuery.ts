import { useQuery } from '@tanstack/react-query';
// import { DataItem } from '@/types';
// import { format } from 'date-fns';

// const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=7&interval=daily');
// const json = await response.json();
// const data: Array<DataItem> = json.prices.map((item: [number, number]) => ({
//   date: format(item[0], 'MM-dd'),
//   price: item[1],
// }));

const useDataQuery = () => {
  const query = useQuery({
    queryKey: ['data-query'],
    queryFn: async () => (([
      {
        date: '05-06',
        price: 2.088952530016985,
      },
      {
        date: '05-07',
        price: 2.0533840344312644,
      },
      {
        date: '05-08',
        price: 2.0488889352925175,
      },
      {
        date: '05-09',
        price: 1.9877311228148717,
      },
      {
        date: '05-10',
        price: 1.990860719955888,
      },
      {
        date: '05-11',
        price: 1.9475293362954873,
      },
      {
        date: '05-12',
        price: 1.8595464025732713,
      },
      {
        date: '05-13',
        price: 1.8682904343643212,
      },
    ]) as any),
    staleTime: Infinity,
  });
  return query;
};

export default useDataQuery;
