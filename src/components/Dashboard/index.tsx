import React from 'react';
import useDataQuery from '@/hooks/useDataQuery';
import { periods, Periods } from '@/types';
import styles from './styles.module.css';
import Chart from '../Chart';
import Button from '../Button';
import PlotBorder from '../Chart/components/PlotBorder';
import { HorizontalGridLines } from '../Chart/components/GridLines';
import { XLabels, YLabels } from '../Chart/components/Labels';
import Plot from '../Chart/components/Plot';

function Dashboard() {
  const [period, setPeriod] = React.useState<Periods>('day');
  const { data, isError, isLoading } = useDataQuery(period);

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
        <XLabels />
        <YLabels />
        <Plot />
      </Chart>
    </section>
  );
}

export default Dashboard;
