import React from 'react';
import useSVGContainer from '@/components/Chart/hooks/useSVGContainer';
import { Periods } from '@/types';
import format from 'date-fns/format';
import { ChartContextProps, DataItem, DataKeys } from '../types';
import {
  PLOT_AREA_SCALE, periodConfig, nVerticalTicks,
} from '../config';
import styles from './styles.module.css';
import useDataScale from '../hooks/useDataScale';
import useVerticalLabels from '../hooks/useVerticalLabels';
import useHorizontalLabels from '../hooks/useHorizontalLabels';

export const ChartContext = React.createContext<ChartContextProps | null>(null);

type Props<T extends DataItem> = {
  children: React.ReactNode;
  period: Periods;
  data: Array<T>;
  dataKeys: DataKeys<DataItem>;
};

const numberFormatter = new Intl.NumberFormat(
  'en-US',
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'compact',
  },
);

function Chart<T extends DataItem>({
  children, period, data, dataKeys,
}: Props<T>) {
  const { ref, container } = useSVGContainer();
  const plot = React.useMemo(() => ({
    width: container.width * PLOT_AREA_SCALE.x,
    height: container.height * PLOT_AREA_SCALE.y,
    padding: {
      top: 0,
      bottom: container.height * (1 - PLOT_AREA_SCALE.y),
      left: container.width * (1 - PLOT_AREA_SCALE.x) * 0.5,
      right: container.width * (1 - PLOT_AREA_SCALE.x) * 0.5,
    },
  }), [container.width, container.height]);

  const nTicks = React.useMemo(() => ({
    x: periodConfig.nHorizontalTicks[period],
    y: nVerticalTicks,
  }), [period]);

  const labelsTickLengths = React.useMemo(() => ({
    x: plot.width / nTicks.x,
    y: plot.height / nTicks.y,
  }), [plot.width, plot.height, nTicks.x, nTicks.y]);

  const { labels: verticalLabels, minValue, maxValue } = useVerticalLabels<T>(
    data,
    dataKeys.y,
    nTicks.y,
  );
  const horizontalLabels = useHorizontalLabels<T>(
    data,
    dataKeys.x,
    nTicks.x,
  );

  const dataTickLengths = {
    x: plot.width / data.length,
    y: labelsTickLengths.y,
  };
  const dataOffset = React.useMemo(() => ({
    x: plot.padding.left,
    y: labelsTickLengths.y / 2,
  }), [labelsTickLengths.y, plot.padding.left]);
  const dataPoints = useDataScale<T>(
    data,
    dataKeys.y,
    minValue,
    maxValue,
    plot.height,
    dataTickLengths,
    dataOffset,
  );

  // See details regarding this memoization in eslint : react/jsx-no-constructed-context-values
  const momoizedData = React.useMemo(() => ({
    container,
    plot,
    period,
    labelsTickLengths,
    dataOffset,
    verticalLabels: verticalLabels.map(
      (v) => numberFormatter.format(v),
    ),
    horizontalLabels: horizontalLabels.map(
      (d) => format(d, periodConfig.dateStringFormat[period]),
    ),
    dataKeys,
    data: dataPoints,
    nTicks,
  }), [
    container,
    plot,
    period,
    labelsTickLengths,
    dataOffset,
    verticalLabels, horizontalLabels,
    dataKeys,
    dataPoints,
    nTicks,
  ]);

  return (
    <svg className={styles.container} ref={ref}>
      <ChartContext.Provider value={momoizedData}>
        {children}
      </ChartContext.Provider>
    </svg>
  );
}

export default Chart;
