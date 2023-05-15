import React from 'react';
import styles from './styles.module.scss';
import useChartContext from '../../hooks/useChartContext';

function PlotBorder() {
  const { plot: { height, width } } = useChartContext();
  return (
    <g className={styles.grid}>
      <line x1={0} x2={width} y1={0} y2={0} />
      <line x1={0} x2={0} y1={0} y2={height} />
      <line x1={0} x2={width} y1={height} y2={height} />
      <line x1={width} x2={width} y1={0} y2={height} />
    </g>
  );
}

export default PlotBorder;
