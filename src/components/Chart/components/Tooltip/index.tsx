import React from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';
import { DATA_POINT_SIZE } from '../../config';
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
          width: plot.padding.left * 2,
        }}
      >
        <div className={styles['tool-tip']}>
          <p>
            <b>
              {dataKeys.y}
              :
            </b>
            {' '}
            {point[dataKeys.y].toPrecision(4)}
          </p>
          <p>{format(point[dataKeys.x], 'PPp')}</p>
        </div>
      </foreignObject>
    </>
  );
}

export default Tooltip;
