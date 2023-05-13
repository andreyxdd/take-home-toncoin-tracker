/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './styles.module.css';

type Props = {
  verticalOffset?: number;
  horizontalOffset?: number;
  data: Array<number | string>;
  tickWidth: number;
  axis: 'x' | 'y'
};

function Labels({
  verticalOffset = 0, horizontalOffset = 0, data, tickWidth, axis,
}: Props) {
  return (
    <g className={`${styles.labels} ${styles[`${axis}-labels`]}`}>
      {data.map((item, idx) => {
        // x-axis is by default
        let x = horizontalOffset + idx * tickWidth;
        let y = verticalOffset;

        if (axis === 'y') {
          x = horizontalOffset;
          y = verticalOffset + idx * tickWidth;
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

export default Labels;
