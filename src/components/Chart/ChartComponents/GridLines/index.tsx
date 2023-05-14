import React from 'react';
import { range } from '@/utils/calc';
import styles from './styles.module.scss';

type Props = {
  size: number;
  tickWidth: number;
  nTicks: number;
  offset: number;
  alongAxis: 'x' | 'y';
};

function GridLines({
  size, tickWidth, nTicks, offset, alongAxis,
}: Props) {
  return (
    <g className={styles.grid}>
      {range({ to: nTicks + 1 }).map((idx) => {
        let x1 = 0;
        let x2 = size;
        let y1 = offset + idx * tickWidth;
        let y2 = offset + idx * tickWidth;

        if (alongAxis === 'y') {
          x1 = offset + idx * tickWidth;
          x2 = offset + idx * tickWidth;
          y1 = 0;
          y2 = size;
        }

        return (
          <line x1={x1} x2={x2} y1={y1} y2={y2} />
        );
      })}
    </g>
  );
}

export function HorizontalGridLines(props: Omit<Props, 'alongAxis'>) {
  return <GridLines {...props} alongAxis="x" />;
}

export function VerticalGridLines(props: Omit<Props, 'alongAxis'>) {
  return <GridLines {...props} alongAxis="y" />;
}
