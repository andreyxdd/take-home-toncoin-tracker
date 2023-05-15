/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Point } from '@/types';
import styles from './styles.module.css';
import useChartContext from '../../hooks/useChartContext';

type Props = {
  labels: Array<number | string>;
  offset: Point;
  tickWidth: number;
  alongAxis: 'x' | 'y';
};

function Labels({
  labels, offset, tickWidth, alongAxis,
}: Props) {
  return (
    <g className={`${styles.labels} ${styles[`${alongAxis}-labels`]}`}>
      {labels.map((label, idx) => {
        // x-axis is by default
        let x = offset.x + idx * tickWidth;
        let { y } = offset;

        if (alongAxis === 'y') { // if y-axis is specified instead
          x = offset.x;
          y = offset.y + idx * tickWidth;
        }

        return (
          <text x={x} y={y} key={`key-${label}-${idx}`}>
            {label}
          </text>
        );
      })}
    </g>
  );
}

export const XLabels = React.memo(() => {
  const {
    labelsTickLengths,
    horizontalLabels,
    container,
  } = useChartContext();
  return (
    <Labels
      alongAxis="x"
      labels={horizontalLabels}
      offset={{ x: labelsTickLengths.x / 2, y: container.height * 0.95 }}
      tickWidth={labelsTickLengths.x}
    />
  );
});

export const YLabels = React.memo(() => {
  const {
    labelsTickLengths,
    verticalLabels,
    container,
  } = useChartContext();
  return (
    <Labels
      alongAxis="y"
      labels={verticalLabels}
      offset={{ x: container.width * 0.93, y: labelsTickLengths.y / 2 }}
      tickWidth={labelsTickLengths.y}
    />
  );
});
