/* eslint-disable react/no-array-index-key */
import React from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';

type Point = {
  x: number;
  y: number;
  date: number;
  price: number;
};

type Props = {
  dataPoints: Array<Point>;
  height: number;
};

function ToolTip(
  { point, height, xTickWidth }:
  { point: Point; height: number; xTickWidth: number; },
) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <line
        className={styles['tip-line']}
        x1={point.x}
        x2={point.x}
        y1={0}
        y2={height}
        strokeWidth={xTickWidth}
        onMouseOverCapture={() => { setIsVisible(true); }}
        onMouseOutCapture={() => { setIsVisible(false); }}
      />
      <circle
        className={styles.point}
        cx={point.x}
        cy={point.y}
        r={2}
      />
      <text
        className={styles['tool-tip']}
        x={point.x}
        y={height}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        {point.price.toPrecision(5)}
        {'\n'}
        {format(point.date, 'PPp')}
      </text>
    </>
  );
}

function Plot({ dataPoints, height }: Props) {
  const xTickWidth = dataPoints[1].x - dataPoints[0].x;
  return (
    <g>
      {dataPoints.map((point, idx, arr) => {
        if (idx === 0) return null;
        const prevPoint = arr[idx - 1];
        return (
          <line
            className={styles.line}
            key={`line-${point.date}`}
            x1={prevPoint.x}
            y1={prevPoint.y}
            x2={point.x}
            y2={point.y}
          />
        );
      })}
      {dataPoints.map((point) => (
        <ToolTip
          point={point}
          key={`tooltip-${point.date}`}
          height={height}
          xTickWidth={xTickWidth}
        />
      ))}
    </g>
  );
}

export default Plot;
