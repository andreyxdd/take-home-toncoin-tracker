import React from 'react';
import { DataItem } from '@/types';
import { tickRange } from '@/utils/calc';
import styles from './styles.module.css';
import XLabels from './ChartComponents/XLabels';
import YLabels from './ChartComponents/YLabels';

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

  const horizontalTicks = React.useMemo(() => {
    const prices = data.map(({ price }) => price);
    return tickRange(prices, yTicks);
  }, [data, yTicks]);

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
        tickWidth={dimensions.width / data.length}
      />
      <YLabels
        data={horizontalTicks}
        verticalOffset={dimensions.height / (2 * (1 + yTicks))}
        horizontalOffset={dimensions.width * 0.025}
        tickWidth={dimensions.height / (1 + yTicks)}
      />
      <g className={styles.data} data-setname="data-set">
        <circle cx="90" cy="192" data-value="7.2" r="4" />
        <circle cx="240" cy="141" data-value="8.1" r="4" />
        <circle cx="388" cy="179" data-value="7.7" r="4" />
        <circle cx="531" cy="200" data-value="6.8" r="4" />
        <circle cx="677" cy="104" data-value="6.7" r="4" />
      </g>
    </svg>
  );
}

export default Chart;
