import React from 'react';
import useDataQuery from '@/hooks/useDataQuery';
import { periods, Periods } from '@/types';
import styles from './styles.module.css';
import Chart from '../Chart';
import Button from '../Button';

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

  return (
    <div className={styles.dashboard}>
      <div className={styles.subnavbar}>
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
      <Chart data={data} period={period} />
    </div>
  );
}

export default Dashboard;
