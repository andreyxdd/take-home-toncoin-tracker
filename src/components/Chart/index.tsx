import React from 'react';
import { DataItem } from '@/types';
import { tickRange } from '@/utils/calc';
import styles from './styles.module.css';
import XLabels from './ChartComponents/XLabels';
import YLabels from './ChartComponents/YLabels';
import Plot from './ChartComponents/Plot';

type Props = {
  data: Array<DataItem>;
  yTicks?: number;
};

const PADDING = 0.05;

function Chart({ data, yTicks = 5 }: Props) {
  const [dimensions, setDiemnsions] = React.useState({ width: 0, height: 0 });
  const ref = React.useRef<SVGSVGElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      const { clientHeight, clientWidth } = ref.current;
      setDiemnsions({
        height: clientHeight * (1 - PADDING),
        width: clientWidth * (1 - PADDING),
      });
    }
  }, []);

  const { ticks: horizontalTicks, minValue, maxValue } = React.useMemo(() => {
    const prices = data.map(({ price }) => price);
    return tickRange(prices, yTicks);
  }, [data, yTicks]);

  const getYCoordinateFromValue = React.useCallback((value: number) => (
    dimensions.width * 0.025 + (dimensions.height - dimensions.width * 0.05)
    * (1 - Math.abs(value - minValue) / Math.abs(maxValue - minValue))
  ), [dimensions.height, dimensions.width, minValue, maxValue]);

  const yTickWidth = dimensions.height / (1 + yTicks);
  const xTickWidth = dimensions.width / data.length;

  const dataPoints = React.useMemo(() => data.map((item, idx) => ({
    x: dimensions.width * 0.1 + idx * xTickWidth,
    y: getYCoordinateFromValue(item.price),
  })), [data, dimensions.width, getYCoordinateFromValue, xTickWidth]);

  if (!data.length) {
    return <p>No Data</p>;
  }

  return (
    <svg className={styles.container} aria-labelledby="title" role="img" ref={ref}>
      <title id="title">Chart</title>
      <XLabels
        data={data.map((item) => item.date)}
        horizontalOffset={dimensions.width * 0.05}
        verticalOffset={dimensions.height}
        tickWidth={xTickWidth}
      />
      <YLabels
        data={horizontalTicks}
        verticalOffset={yTickWidth / 2}
        horizontalOffset={dimensions.width * 0.025}
        tickWidth={yTickWidth}
      />
      <Plot dataPoints={dataPoints} />
    </svg>
  );
}

export default Chart;
