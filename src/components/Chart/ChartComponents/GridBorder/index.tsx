import React from 'react';
import styles from './styles.module.scss';

type Props = {
  width: number;
  height: number;
};

function GridBorder({ width, height }: Props) {
  return (
    <g className={styles.grid}>
      <line x1={0} x2={width} y1={0} y2={0} />
      <line x1={0} x2={0} y1={0} y2={height} />
      <line x1={0} x2={width} y1={height} y2={height} />
      <line x1={width} x2={width} y1={0} y2={height} />
    </g>
  );
}

export default GridBorder;
