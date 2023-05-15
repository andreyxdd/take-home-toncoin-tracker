import React from 'react';
import usePriceQuery from '@/hooks/queries/usePriceQuery';
import { Periods } from '@/types';
import {
  Chart, Plot, PlotBorder, HorizontalGridLines, HorizontalLabels, VerticalLabels,
} from './Chart';
import withLayout from './withLayout';

function PriceSection({ period }:{ period: Periods }) {
  const { data, isError, isLoading } = usePriceQuery(period);

  if (isError) return <p className="error">Something went wrong. Please retry later.</p>;
  if (isLoading) return <p className="loading">Loading...</p>;
  if (!data.length) return <p className="error">No data available</p>;

  return (
    <Chart
      data={data}
      period={period}
      dataKeys={{ x: 'date', y: 'price' }}
    >
      <PlotBorder />
      <HorizontalGridLines />
      <HorizontalLabels />
      <VerticalLabels />
      <Plot />
    </Chart>
  );
}

export default withLayout(
  'Price',
  PriceSection,
);
