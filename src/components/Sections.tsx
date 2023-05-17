import usePriceQuery from '@/hooks/queries/usePriceQuery';
import useVolumeQuery from '@/hooks/queries/useVolumeQuery';
import useTransactionsQuery from '@/hooks/queries/useTransactionsQuery';
import Section from './Section';

const sections = [
  {
    title: 'Price',
    useQuery: usePriceQuery,
    dataKeys: { x: 'date', y: 'price' },
    availablePeriods: ['day', 'week', 'month', 'year'],
  },
  {
    title: 'Trading Volume',
    useQuery: useVolumeQuery,
    dataKeys: { x: 'date', y: 'volume' },
    availablePeriods: ['day', 'week', 'month', 'year'],
  },
  {
    title: 'Transactions Count',
    useQuery: useTransactionsQuery,
    dataKeys: { x: 'date', y: 'transactions_count' },
    availablePeriods: ['week', 'month', 'year'] as any,
  },
];

function Sections() {
  return (
    <>
      {sections.map(({
        title, useQuery, dataKeys, availablePeriods,
      }) => (
        <Section
          key={`${title}-${JSON.stringify(dataKeys)}`}
          title={title}
          useQuery={useQuery}
          dataKeys={dataKeys}
          availablePeriods={availablePeriods}
        />
      ))}
    </>
  );
}

export default Sections;
