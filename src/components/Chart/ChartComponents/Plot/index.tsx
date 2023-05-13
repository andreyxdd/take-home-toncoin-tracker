/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './styles.module.css';

type Point = {
  x: number;
  y: number;
};

type Props = {
  dataPoints: Array<Point>
};

const pointSize = 4;
function Plot({ dataPoints }: Props) {
  return (
    <g>
      {dataPoints.map((point, idx, arr) => {
        if (idx === 0) return null;
        const prevPoint = arr[idx - 1];
        return (
          <line
            className={styles.line}
            key={`line-${point.x * point.y}-${prevPoint.x * prevPoint.y}-${idx}`}
            x1={prevPoint.x}
            y1={prevPoint.y}
            x2={point.x}
            y2={point.y}
          />
        );
      })}
      {dataPoints.map((point, idx) => (
        <circle
          className={styles.point}
          key={`point-${point.x * point.y}-${idx}`}
          cx={point.x}
          cy={point.y}
          r={pointSize}
        />
      ))}
    </g>
  );
}

export default Plot;
