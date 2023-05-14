import React from 'react';
import { DataItem, Periods } from '@/types';
import { tickRange, tickDatesRange } from '@/utils/calc';
import useSVGContainer from '@/hooks/useSVGContainer';
import format from 'date-fns/format';
import styles from './styles.module.css';
import GridBorder from './ChartComponents/GridBorder';
import { XLabels, YLabels } from './ChartComponents/Labels';
import Plot from './ChartComponents/Plot';
import { HorizontalGridLines } from './ChartComponents/GridLines';

type Props = {
  data: Array<DataItem>;
  xTicks?: number;
  yTicks?: number;
  period: Periods;
};

const formatString = {
  day: 'h aa',
  week: 'LLL d',
  month: 'LLL d',
  year: 'MMM',
};

function Chart({
  data, xTicks = 6, yTicks = 4, period,
}: Props) {
  const { ref, container, plotArea } = useSVGContainer();

  const { ticks: verticalTicks, minValue, maxValue } = React.useMemo(() => {
    const prices = data.map(({ price }) => price);
    return tickRange(prices, yTicks);
  }, [data, yTicks]);

  const horizontalTicks = React.useMemo(() => {
    const dates = data.map(({ date }) => date);
    return tickDatesRange(dates, xTicks);
  }, [data, xTicks]);

  const yTickWidth = plotArea.height / (1 + yTicks);
  const xTickWidth = plotArea.width / data.length;
  const xLabelsTickWidth = plotArea.width / (1 + xTicks);

  const getYCoordinateFromValue = React.useCallback((value: number) => (
    (plotArea.height - yTickWidth)
    * (1 - Math.abs(value - minValue) / Math.abs(maxValue - minValue))
  ), [plotArea, yTickWidth, minValue, maxValue]);

  const dataPoints = React.useMemo(() => data.map((item, idx) => ({
    x: idx * xTickWidth,
    y: yTickWidth / 2 + getYCoordinateFromValue(item.price),
    ...item,
  })), [data, getYCoordinateFromValue, xTickWidth, yTickWidth]);

  if (!data.length) {
    return <p>No Data</p>;
  }

  return (
    <svg className={styles.container} role="img" ref={ref}>
      <GridBorder
        width={plotArea.width}
        height={plotArea.height}
      />
      <HorizontalGridLines
        size={plotArea.width}
        nTicks={yTicks}
        tickWidth={yTickWidth}
        offset={yTickWidth / 2}
      />
      <XLabels
        data={horizontalTicks.map((d) => format(d, formatString[period]))}
        offset={{ x: xLabelsTickWidth / 2, y: container.height * 0.93 }}
        tickWidth={xLabelsTickWidth}
      />
      <YLabels
        data={verticalTicks}
        offset={{ x: container.width * 0.91, y: yTickWidth / 2 }}
        tickWidth={yTickWidth}
      />
      <Plot dataPoints={dataPoints} height={plotArea.height} />
    </svg>
  );
}

export default Chart;
