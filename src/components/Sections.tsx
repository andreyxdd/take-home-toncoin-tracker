import Section from './Section';

const sections = [
  // {
  //   title: 'Price',
  //   url: '/api/market/prices',
  //   staleTime: 10 * 60 * 1000, // revalidate query every 10 minutes
  //   dataKeys: { x: 'date', y: 'prices' },
  //   availablePeriods: ['day', 'week', 'month', 'year'],
  // },
  // {
  //   title: 'Trading Volume',
  //   url: '/api/market/total_volumes',
  //   staleTime: 10 * 60 * 1000, // revalidate query every 10 minutes
  //   dataKeys: { x: 'date', y: 'total_volumes' },
  //   availablePeriods: ['day', 'week', 'month', 'year'],
  // },
  // {
  //   title: 'Transactions Count',
  //   url: '/api/transactions/total',
  //   staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
  //   dataKeys: { x: 'date', y: 'total' },
  //   availablePeriods: ['week', 'month', 'year'] as any,
  // },
  // {
  //   title: 'Transactions per second (TPS)',
  //   url: '/api/transactions/tps',
  //   staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
  //   dataKeys: { x: 'date', y: 'tps' },
  //   availablePeriods: ['week', 'month', 'year'] as any,
  // },
  {
    title: 'Mock Timeseries',
    url: '/api/mock',
    staleTime: Infinity, // no need to revalidate as this data doesn't change hourly
    dataKeys: { x: 'date', y: 'mock' },
    availablePeriods: ['week', 'month', 'year'],
  },
];

function Sections() {
  return (
    <>
      {sections.map(({
        title, url, staleTime, dataKeys, availablePeriods,
      }) => (
        <Section
          key={`${title}-${JSON.stringify(dataKeys)}`}
          title={title}
          url={url}
          staleTime={staleTime}
          dataKeys={dataKeys}
          availablePeriods={availablePeriods}
        />
      ))}
    </>
  );
}

export default Sections;
