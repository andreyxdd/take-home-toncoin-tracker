import usePriceQuery from '@/hooks/queries/usePriceQuery';
import useVolumeQuery from '@/hooks/queries/useVolumeQuery';
import Section from './Section';

const sections = [
  {
    title: 'Price',
    useQuery: usePriceQuery,
    dataKeys: { x: 'date', y: 'price' },
  },
  {
    title: 'Trading Volume',
    useQuery: useVolumeQuery,
    dataKeys: { x: 'date', y: 'volume' },
  },
];

function Sections() {
  return (
    <>
      {sections.map(({ title, useQuery, dataKeys }) => (
        <Section
          key={`${title}-${JSON.stringify(dataKeys)}`}
          title={title}
          useQuery={useQuery}
          dataKeys={dataKeys}
        />
      ))}
    </>
  );
}

export default Sections;
