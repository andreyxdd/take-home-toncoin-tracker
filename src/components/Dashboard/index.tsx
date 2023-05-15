import React from 'react';
import usePriceQuery from '@/hooks/queries/usePriceQuery';
import { periods, Periods } from '@/types';
import styles from './styles.module.css';
import {
  Chart, Plot, PlotBorder, HorizontalGridLines, HorizontalLabels, VerticalLabels,
} from '../Chart';
import Button from '../Button';

function Dashboard() {
  const [period, setPeriod] = React.useState<Periods>('day');
  const { data, isError, isLoading } = usePriceQuery(period);

  if (isError) {
    return (
      <div className={styles.dashboard}>
        <p className={styles.error}>Something went wrong. Please retry later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles.dashboard}>
        <p className={styles.loading}>No data available</p>
      </div>
    );
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.subnavbar}>
        <h3>Toncoin Price</h3>
        <div className={styles['button-container']}>
          {periods.map((p) => (
            <Button
              key={p}
              isClicked={p === period}
              onClick={() => { setPeriod(p); }}
            >
              {p}
            </Button>
          ))}

        </div>
      </div>
      <Chart data={data} period={period}>
        <PlotBorder />
        <HorizontalGridLines />
        <HorizontalLabels />
        <VerticalLabels />
        <Plot />
      </Chart>
    </section>
  );
}

export default Dashboard;
