import React from 'react';
import { range } from '../../utils/calc';
import styles from './styles.module.scss';
import config from '../../config';
import useChartContext from '../../hooks/useChartContext';

type Props = {
  nTicks: number;
  alongAxis: 'x' | 'y';
};

export function GridLines({ nTicks, alongAxis }: Props) {
  const {
    plot: { height, width },
    labelsTickLengths,
    dataOffset,
  } = useChartContext();
  return (
    <g className={styles.grid}>
      {range({ to: nTicks }).map((idx) => {
        // alongAxis === 'x' is default:
        let x1 = dataOffset.x;
        let x2 = dataOffset.x + width;
        let y1 = dataOffset.y + idx * labelsTickLengths.y;
        let y2 = dataOffset.y + idx * labelsTickLengths.y;

        if (alongAxis === 'y') { // otherwise y-axis
          x1 = dataOffset.x + idx * labelsTickLengths.x;
          x2 = dataOffset.x + idx * labelsTickLengths.x;
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
  () => <GridLines alongAxis="x" nTicks={config.nVerticalTicks} />,
);
