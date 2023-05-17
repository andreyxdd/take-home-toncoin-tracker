import { NonEmptyArray, IntervalWithoutDay } from '@/types';
import Section from './Section';

// array of properties passed to the Chart component
const sections = [
  {
    title: 'Price',
    url: '/api/market/prices',
    staleTime: 10 * 60 * 1000, // revalidate query every 10 minutes
    dataKeys: { x: 'date', y: 'prices' },
    availableIntervals: ['day', 'week', 'month', 'year'],
  },
  {
    title: 'Trading Volume',
    url: '/api/market/total_volumes',
    staleTime: 10 * 60 * 1000, // revalidate query every 10 minutes
    dataKeys: { x: 'date', y: 'total_volumes' },
    availableIntervals: ['day', 'week', 'month', 'year'],
  },
  {
    title: 'Transactions Count',
    url: '/api/transactions/total',
    staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
    dataKeys: { x: 'date', y: 'total' },
    availableIntervals: ['week', 'month', 'year'] as any,
  },
  {
    title: 'Transactions per second (TPS)',
    url: '/api/transactions/tps',
    staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
    dataKeys: { x: 'date', y: 'tps' },
    availableIntervals: ['week', 'month', 'year'] as any,
  },
  {
    title: 'Mock Timeseries',
    url: '/api/mock',
    staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
    dataKeys: { x: 'date', y: 'mock' },
    availableIntervals: ['week', 'month', 'year'] as NonEmptyArray<IntervalWithoutDay>,
  },
];

function Sections() {
  return (
    <>
      {sections.map(({
        title, url, staleTime, dataKeys, availableIntervals,
      }) => (
        <Section
          key={`${title}-${JSON.stringify(dataKeys)}`}
          title={title}
          url={url}
          staleTime={staleTime}
          dataKeys={dataKeys}
          availableIntervals={availableIntervals}
        />
      ))}
    </>
  );
}

export default Sections;
