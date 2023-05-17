import React from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';
import { DATA_POINT_SIZE, numberFormatter } from '../../config';
import useChartContext from '../../hooks/useChartContext';

type Props = {
  point: any;
  height: number;
  xTickWidth: number;
};

function Tooltip({ point, height, xTickWidth }: Props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const { dataKeys, plot } = useChartContext();

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
        r={DATA_POINT_SIZE}
      />
      <foreignObject
        x={point.x - plot.padding.left}
        y={height}
        textAnchor="middle"
        style={{
          display: isVisible ? 'block' : 'none',
          height: '100%',
          width: plot.padding.left * 1.9,
        }}
        overflow="visible"
      >
        <div className={styles['tool-tip']}>
          <p className={styles.date}>{format(point[dataKeys.x], 'MMM d, yy p')}</p>
          <p>
            <span className={styles['tip-label']}>
              {dataKeys.y}
              :
            </span>
            {' '}
            {numberFormatter(3).format(point[dataKeys.y])}
          </p>
        </div>
      </foreignObject>
    </>
  );
}

export default Tooltip;
