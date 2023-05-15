import React from 'react';
import { range } from '@/utils/calc';
import styles from './styles.module.scss';
import { numberOfTicks } from '../../config';
import useChartContext from '../../hooks/useChartContext';

type Props = {
  nTicks: number;
  alongAxis: 'x' | 'y';
};

function GridLines({ nTicks, alongAxis }: Props) {
  const {
    plot: { height, width },
    labelsTickLengths,
    offset,
  } = useChartContext();
  return (
    <g className={styles.grid}>
      {range({ to: nTicks - 1 }).map((idx) => {
        // alongAxis === 'x' is default:
        let x1 = 0;
        let x2 = width;
        let y1 = offset.y + idx * labelsTickLengths.y;
        let y2 = offset.y + idx * labelsTickLengths.y;

        if (alongAxis === 'y') { // otherwise y-axis
          x1 = offset.x + idx * labelsTickLengths.x;
          x2 = offset.x + idx * labelsTickLengths.x;
          y1 = 0;
          y2 = height;
        }

        return (
          <line key={`gridline-${idx}`} x1={x1} x2={x2} y1={y1} y2={y2} />
        );
      })}
    </g>
  );
}

export const HorizontalGridLines = React.memo(
  () => <GridLines alongAxis="x" nTicks={numberOfTicks.x} />,
);

export const VerticalGridLines = React.memo(
  () => <GridLines alongAxis="y" nTicks={numberOfTicks.y} />,
);
