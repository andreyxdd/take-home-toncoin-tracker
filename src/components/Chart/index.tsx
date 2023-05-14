import React from 'react';
import { DataItem } from '@/types';
import { tickRange } from '@/utils/calc';
import useSVGContainer from '@/hooks/useSVGContainer';
import styles from './styles.module.css';
import GridBorder from './ChartComponents/GridBorder';
import { XLabels, YLabels } from './ChartComponents/Labels';
import Plot from './ChartComponents/Plot';
import { HorizontalGridLines } from './ChartComponents/GridLines';

type Props = {
  data: Array<DataItem>;
  yTicks?: number;
};

function Chart({ data, yTicks = 5 }: Props) {
  const { ref, container, plotArea } = useSVGContainer();

  const { ticks: verticalTicks, minValue, maxValue } = React.useMemo(() => {
    const prices = data.map(({ price }) => price);
    return tickRange(prices, yTicks);
  }, [data, yTicks]);

  const yTickWidth = plotArea.height / (1 + yTicks);
  const xTickWidth = plotArea.width / data.length;

  const getYCoordinateFromValue = React.useCallback((value: number) => (
    (plotArea.height - yTickWidth)
    * (1 - Math.abs(value - minValue) / Math.abs(maxValue - minValue))
  ), [plotArea, yTickWidth, minValue, maxValue]);

  const dataPoints = React.useMemo(() => data.map((item, idx) => ({
    x: idx * xTickWidth,
    y: yTickWidth / 2 + getYCoordinateFromValue(item.price),
  })), [data, getYCoordinateFromValue, xTickWidth, yTickWidth]);

  if (!data.length) {
    return <p>No Data</p>;
  }

  return (
    <svg className={styles.container} aria-labelledby="title" role="img" ref={ref}>
      <title id="title">Chart</title>
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
        data={data.map((item) => item.date)}
        offset={{ x: 0, y: container.height * 0.93 }}
        tickWidth={xTickWidth}
      />
      <YLabels
        data={verticalTicks}
        offset={{ x: container.width * 0.91, y: yTickWidth / 2 }}
        tickWidth={yTickWidth}
      />
      <Plot dataPoints={dataPoints} />
    </svg>
  );
}

export default Chart;
