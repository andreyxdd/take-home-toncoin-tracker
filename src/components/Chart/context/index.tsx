import React from 'react';
import useSVGContainer from '@/components/Chart/hooks/useSVGContainer';
import { Periods } from '@/types';
import format from 'date-fns/format';
import { ChartContextProps, DataItem, DataKeys } from '../types';
import { PLOT_AREA_SCALE, numberOfTicks, formatString } from '../config';
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

function Chart<T extends DataItem>({
  children, period, data, dataKeys,
}: Props<T>) {
  const { ref, container } = useSVGContainer();
  const plot = React.useMemo(() => ({
    width: container.width * PLOT_AREA_SCALE.x,
    height: container.height * PLOT_AREA_SCALE.y,
  }), [container.width, container.height]);

  const labelsTickLengths = React.useMemo(() => ({
    x: plot.width / (1 + numberOfTicks.x),
    y: plot.height / numberOfTicks.y,
  }), [plot.width, plot.height]);
  const offset = React.useMemo(() => ({
    x: 0,
    y: labelsTickLengths.y / 2,
  }), [labelsTickLengths.y]);
  const dataTickLengths = {
    x: plot.width / data.length,
    y: labelsTickLengths.y,
  };

  const { labels: verticalLabels, minValue, maxValue } = useVerticalLabels<T>(
    data,
    dataKeys.y,
    numberOfTicks.y,
  );
  const horizontalLabels = useHorizontalLabels<T>(
    data,
    dataKeys.x,
    numberOfTicks.x,
  );
  const dataPoints = useDataScale<T>(
    data,
    dataKeys.y,
    minValue,
    maxValue,
    plot.height,
    dataTickLengths,
    offset,
  );

  // See details regarding this memoization in eslint : react/jsx-no-constructed-context-values
  const momoizedData = React.useMemo(() => ({
    container,
    plot,
    period,
    labelsTickLengths,
    offset,
    verticalLabels,
    horizontalLabels: horizontalLabels.map((d) => format(d, formatString[period])),
    dataKeys,
    data: dataPoints,
  }), [
    container,
    plot,
    period,
    labelsTickLengths,
    offset,
    verticalLabels, horizontalLabels,
    dataKeys,
    dataPoints,
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
