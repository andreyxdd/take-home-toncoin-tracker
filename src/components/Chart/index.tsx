import React from 'react';
import { DataItem } from '@/types';
import styles from './styles.module.css';

type Props = {
  data: Array<DataItem>;
};

function Chart({ data }: Props) {
  if (!data.length) {
    return <p>No Data</p>;
  }

  return (
    <div className={styles.chart}>
      <p>Hello world</p>
    </div>
  );
}

export default Chart;
