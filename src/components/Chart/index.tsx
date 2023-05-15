import React from 'react';
import useSVGContainer from '@/components/Chart/hooks/useSVGContainer';
import { Dimensions, Periods, Point } from '@/types';
import format from 'date-fns/format';
import {
  initialContext, PLOT_AREA_SCALE, numberOfTicks, formatString,
} from './config';
import styles from './styles.module.css';
import useDataScale from './hooks/useDataScale';
import useVerticalLabels from './hooks/useVerticalLabels';
import useHorizontalLabels from './hooks/useHorizontalLabels';

export type ChartContextProps = {
  container: Dimensions;
  plot: Dimensions;
  period: Periods;
  labelsTickLengths: Point;
  offset: Point;
  verticalLabels: Array<number | string>;
  horizontalLabels: Array<number | string>;
  data: Array<any>;
};
export const ChartContext = React.createContext<ChartContextProps>(initialContext);

type Props = {
  children: React.ReactNode;
  period: Periods;
  data: Array<any>;
};

function Chart({ children, period, data }: Props) {
  const { ref, container } = useSVGContainer();
  const plot = React.useMemo(() => ({
    width: container.width * PLOT_AREA_SCALE.x,
    height: container.height * PLOT_AREA_SCALE.y,
  }), [container.width, container.height]);

  const labelsTickLengths = React.useMemo(() => ({
    x: plot.width / (1 + numberOfTicks.x),
    y: plot.height / (1 + numberOfTicks.y),
  }), [plot.width, plot.height]);
  const offset = React.useMemo(() => ({
    x: 0,
    y: labelsTickLengths.y / 2,
  }), [labelsTickLengths.y]);
  const dataTickLengths = {
    x: plot.width / data.length,
    y: labelsTickLengths.y,
  };

  const { labels: verticalLabels, minValue, maxValue } = useVerticalLabels(data, numberOfTicks.y);
  const horizontalLabels = useHorizontalLabels(data, numberOfTicks.x);
  const dataPoints = useDataScale(data, minValue, maxValue, plot.height, dataTickLengths, offset);

  // See details regarding this memoization in eslint : react/jsx-no-constructed-context-values
  const momoizedData = React.useMemo(() => ({
    container,
    plot,
    period,
    labelsTickLengths,
    offset,
    verticalLabels,
    horizontalLabels: horizontalLabels.map((d) => format(d, formatString[period])),
    data: dataPoints,
  }), [
    container,
    plot,
    period,
    labelsTickLengths,
    offset,
    verticalLabels, horizontalLabels,
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
