import React from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';
import { DATA_POINT_SIZE } from '../../config';

type Props = {
  point: any;
  height: number;
  xTickWidth: number;
};

function Tooltip({ point, height, xTickWidth }: Props) {
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
        r={DATA_POINT_SIZE}
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

export default Tooltip;
