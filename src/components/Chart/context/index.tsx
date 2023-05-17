import React from 'react';
import useSVGContainer from '@/components/Chart/hooks/useSVGContainer';
import { DataItem, Interval } from '@/types';
import format from 'date-fns/format';
import { ChartContextProps, DataKeys } from '../types';
import config from '../config';
import styles from './styles.module.css';
import useDataScale from '../hooks/useDataScale';
import useVerticalLabels from '../hooks/useVerticalLabels';
import useHorizontalLabels from '../hooks/useHorizontalLabels';
import usePlotContainer from '../hooks/usePlotContainer';

export const ChartContext = React.createContext<ChartContextProps | null>(null);

type Props<T extends DataItem> = {
  children: React.ReactNode;
  interval: Interval;
  data: Array<T>;
  dataKeys: DataKeys<DataItem>;
};

/**
 * Main chart component that takes:
 * @param children sub-components of the Chart
 * @param interval interval, in which the time series should
 * be displayed ('day' | 'week' | 'month' 'year')
 * @param data array of data points of the type DataItem, which is
 * a pair of date (number,i.e. timestamp) and value (number)
 * @param dataKeys specifies what key should be used to access the @data array
 *  in horizontal (timestamp) and vertical  directions (actual values)
 * @returns context provider so that different subcomponents can be
 * included/excluded, thus, providing imporved customization of the chart
 */
function Chart<T extends DataItem>({
  children, interval, data, dataKeys,
}: Props<T>) {
  // getting sizes of the main svg container (helps in resizing responsively)
  const { ref, container } = useSVGContainer();

  // sizes of the plot inside the svg container
  const plot = usePlotContainer(container.width, container.height);

  // number of ticks may depend on the interval
  const nTicks = React.useMemo(() => ({
    x: config.intervals.nHorizontalTicks[interval],
    y: config.nVerticalTicks,
  }), [interval]);

  // distance between labels for horizontal (x) and vertical (y) axes
  const labelsTickLengths = React.useMemo(() => ({
    x: plot.width / nTicks.x,
    y: plot.height / nTicks.y,
  }), [plot.width, plot.height, nTicks.x, nTicks.y]);

  // constructing the vertical labels array
  const { labels: verticalLabels, minValue, maxValue } = useVerticalLabels<T>(
    data,
    dataKeys.y,
    nTicks.y,
  );

  // constructing the horizontal labels array
  const horizontalLabels = useHorizontalLabels<T>(
    data,
    dataKeys.x,
    nTicks.x,
  );

  // distance between data points
  const dataTickLengths = {
    x: plot.width / (data.length - 1),
    y: labelsTickLengths.y, // same as labels tick in vertical direction
  };
  // getting offset for the data points relative to the svg container
  const dataOffset = React.useMemo(() => ({
    x: plot.padding.left,
    y: labelsTickLengths.y / 2,
  }), [labelsTickLengths.y, plot.padding.left]);
  // transforming timeseries into the x-y coordinates onto the plot
  const dataPoints = useDataScale<T>(
    data,
    dataKeys.y,
    minValue,
    maxValue,
    plot.height,
    dataTickLengths,
    dataOffset,
  );

  // Details regarding this memoization in eslint : react/jsx-no-constructed-context-values
  const momoizedData = React.useMemo(() => ({
    container,
    plot,
    interval,
    labelsTickLengths,
    dataOffset,
    verticalLabels: verticalLabels.map(
      (v) => config.numberFormatter().format(v),
    ),
    horizontalLabels: horizontalLabels.map(
      (d) => format(d, config.intervals.dateStringFormat[interval]),
    ),
    dataKeys,
    data: dataPoints,
    nTicks,
  }), [
    container,
    plot,
    interval,
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
