import React from 'react';
import { DataItem, NonEmptyArray, Period } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import Button from '../Button';
import {
  Chart, Plot, PlotBorder, HorizontalGridLines, HorizontalLabels, VerticalLabels,
} from '../Chart';
import styles from './styles.module.css';

type Props = {
  title: string;
  useQuery: (period: Period) => UseQueryResult<Array<DataItem>>;
  dataKeys: { x: string, y: string };
  availablePeriods: NonEmptyArray<Period>;
};

function Section({
  title, useQuery, dataKeys, availablePeriods,
}: Props) {
  const [period, setPeriod] = React.useState(availablePeriods[0] as Period);
  const { data, isError, isLoading } = useQuery(period);

  if (isError) {
    return (
      <section className={styles.subsection}>
        <p className="error">Something went wrong. Please retry later.</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={styles.subsection}>
        <p className="loading">Loading...</p>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section className={styles.subsection}>
        <p className="error">No data available</p>
      </section>
    );
  }

  return (
    <section className={styles.subsection}>
      <div className={styles.subnavbar}>
        <h3>{title}</h3>
        <div className={styles['button-container']}>
          {availablePeriods.map((p) => (
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
      <Chart data={data} period={period} dataKeys={dataKeys}>
        <PlotBorder />
        <HorizontalGridLines />
        <HorizontalLabels />
        <VerticalLabels />
        <Plot />
      </Chart>
    </section>
  );
}

export default Section;
