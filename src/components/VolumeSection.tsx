import React from 'react';
import useVolumeQuery from '@/hooks/queries/useVolumeQuery';
import { Periods } from '@/types';
import {
  Chart, Plot, PlotBorder, HorizontalGridLines, HorizontalLabels, VerticalLabels,
} from './Chart';
import withLayout from './withLayout';

function VolumeSection({ period }:{ period: Periods }) {
  const { data, isError, isLoading } = useVolumeQuery(period);

  if (isError) return <p className="error">Something went wrong. Please retry later.</p>;
  if (isLoading) return <p className="loading">Loading...</p>;
  if (!data.length) return <p className="error">No data available</p>;

  return (
    <Chart
      data={data}
      period={period}
      dataKeys={{ x: 'date', y: 'volume' }}
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
  'Trading volume',
  VolumeSection,
);
