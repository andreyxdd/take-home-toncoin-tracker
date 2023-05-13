import React from 'react';
import useDataQuery from '@/hooks/useDataQuery';
import styles from './styles.module.css';
import Chart from '../Chart';

function Dashboard() {
  const { data, isError, isLoading } = useDataQuery();

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
      <Chart data={data} />
    </div>
  );
}

export default Dashboard;
