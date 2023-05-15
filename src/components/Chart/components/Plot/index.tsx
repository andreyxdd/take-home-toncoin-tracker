import React from 'react';
import styles from './styles.module.css';
import Tooltip from '../Tooltip';
import useChartContext from '../../hooks/useChartContext';

function Plot() {
  const { plot: { height }, data } = useChartContext();

  const xTickWidth = data[1].x - data[0].x;
  return (
    <g>
      {data.map((point, idx, arr) => {
        if (idx === 0) {
          return (
            <Tooltip
              point={point}
              key={`first-point-${point.date}`}
              height={height}
              xTickWidth={xTickWidth}
            />
          );
        }
        const prevPoint = arr[idx - 1];
        return (
          <React.Fragment key={`data-point-${point.date}`}>
            <line
              className={styles.line}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
            />
            <Tooltip
              point={point}
              height={height}
              xTickWidth={xTickWidth}
            />
          </React.Fragment>
        );
      })}
    </g>
  );
}

export default Plot;
