/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Point } from '../../types';
import styles from './styles.module.css';
import useChartContext from '../../hooks/useChartContext';

type Props = {
  labels: Array<number | string>;
  offset: Point;
  tickWidth: number;
  alongAxis: 'x' | 'y';
};

export function Labels({
  labels, offset, tickWidth, alongAxis,
}: Props) {
  return (
    <g className={styles.labels} textAnchor="middle">
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

export const HorizontalLabels = React.memo(() => {
  const {
    labelsTickLengths,
    horizontalLabels,
    plot: { height, padding: { left, bottom } },
  } = useChartContext();
  return (
    <Labels
      alongAxis="x"
      labels={horizontalLabels}
      offset={{
        x: left,
        y: height + bottom / 2,
      }}
      tickWidth={labelsTickLengths.x}
    />
  );
});

export const VerticalLabels = React.memo(() => {
  const {
    labelsTickLengths,
    verticalLabels,
    container,
    plot: { padding: { left, right } },
  } = useChartContext();
  return (
    <>
      <Labels
        alongAxis="y"
        labels={verticalLabels}
        offset={{
          x: left / 2,
          y: labelsTickLengths.y / 2,
        }}
        tickWidth={labelsTickLengths.y}
      />
      <Labels
        alongAxis="y"
        labels={verticalLabels}
        offset={{
          x: container.width - right / 2,
          y: labelsTickLengths.y / 2,
        }}
        tickWidth={labelsTickLengths.y}
      />
    </>
  );
});
