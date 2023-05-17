import React from 'react';
import { NonEmptyArray, Interval, IntervalWithoutDay } from '@/types';
import useQueryWrapper from '@/hooks/useQueryWrapper';
import Button from '../Button';
import {
  Chart, Plot, PlotBorder, HorizontalGridLines, HorizontalLabels, VerticalLabels,
} from '../Chart';
import styles from './styles.module.css';

type Props = {
  title: string;
  url: string;
  staleTime: number;
  dataKeys: { x: string, y: string };
  availableIntervals: NonEmptyArray<Interval> | NonEmptyArray<IntervalWithoutDay>;
};

function Section({
  title, url, staleTime, dataKeys, availableIntervals,
}: Props) {
  const [interval, setInterval] = React.useState(availableIntervals[0]);
  const { data, isError, isLoading } = useQueryWrapper(
    `${url}?interval=${interval}`,
    staleTime,
  );

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
          {availableIntervals.map((p) => (
            <Button
              key={p}
              isClicked={p === interval}
              onClick={() => { setInterval(p); }}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
      <Chart data={data} interval={interval} dataKeys={dataKeys}>
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
