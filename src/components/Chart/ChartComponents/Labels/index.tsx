/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './styles.module.css';

type Props = {
  offset?: {
    x: number;
    y: number;
  };
  data: Array<number | string>;
  tickWidth: number;
  alongAxis: 'x' | 'y'
};

function Labels({
  offset, data, tickWidth, alongAxis,
}: Props) {
  return (
    <g className={`${styles.labels} ${styles[`${alongAxis}-labels`]}`}>
      {data.map((item, idx) => {
        // x-axis is by default
        let x = (offset?.x || 0) + idx * tickWidth;
        let y = (offset?.y || 0);

        if (alongAxis === 'y') { // if y-axis is specified instead
          x = (offset?.x || 0);
          y = (offset?.y || 0) + idx * tickWidth;
        }

        return (
          <text x={x} y={y} key={`key-${item}-${idx}`}>
            {item}
          </text>
        );
      })}
    </g>
  );
}

export function XLabels(props: Omit<Props, 'alongAxis'>) {
  return <Labels {...props} alongAxis="x" />;
}

export function YLabels(props: Omit<Props, 'alongAxis'>) {
  return <Labels {...props} alongAxis="y" />;
}
