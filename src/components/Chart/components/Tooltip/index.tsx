import React from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';
import config from '../../config';
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
        r={config.dataPointSize}
      />
      <foreignObject
        x={point.x - plot.padding.left}
        y={height - plot.padding.bottom / 8}
        textAnchor="middle"
        style={{
          display: isVisible ? 'block' : 'none',
          width: plot.padding.left * 2,
        }}
        overflow="visible"
      >
        <div className={styles['tool-tip']}>
          <p className={styles.date}>{format(point[dataKeys.x], 'MMM d, yyyy p')}</p>
          <p className={styles['tip-label']}>
            <span>
              Value
              :
            </span>
            {' '}
            {config.numberFormatter(3).format(point[dataKeys.y])}
          </p>
        </div>
      </foreignObject>
    </>
  );
}

export default Tooltip;
