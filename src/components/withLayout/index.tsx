import React, { SetStateAction } from 'react';
import { periods, Periods } from '@/types';
import styles from './styles.module.css';
import Button from '../Button';

type Props = {
  title: string;
  period: Periods;
  setPeriod: React.Dispatch<SetStateAction<Periods>>;
  children: React.ReactNode;
};

function Layout({
  title, period, setPeriod, children,
}: Props) {
  return (
    <section className={styles.subsection}>
      <div className={styles.subnavbar}>
        <h3>{title}</h3>
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
      {children}
    </section>
  );
}

type HOCProps = {
  period: Periods;
};

function withLayout(
  sectionTitle: string,
  FetchComponent: React.ComponentType<HOCProps>,
) {
  // eslint-disable-next-line func-names
  return function () {
    const [period, setPeriod] = React.useState<Periods>('day');
    return (
      <Layout title={sectionTitle} period={period} setPeriod={setPeriod}>
        <FetchComponent period={period} />
      </Layout>
    );
  };
}

export default withLayout;
