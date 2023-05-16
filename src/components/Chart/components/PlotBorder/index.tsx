import React from 'react';
import styles from './styles.module.scss';
import useChartContext from '../../hooks/useChartContext';

function PlotBorder() {
  const {
    plot: { height, width, padding: { left } },
  } = useChartContext();
  return (
    <g className={styles.grid}>
      {/* horizontal lines */}
      <line x1={left} x2={left + width} y1={0} y2={0} />
      <line x1={left} x2={left + width} y1={height} y2={height} />
      {/* vertical lines */}
      <line x1={left} x2={left} y1={0} y2={height} />
      <line x1={left + width} x2={left + width} y1={0} y2={height} />
    </g>
  );
}

export default React.memo(PlotBorder);
