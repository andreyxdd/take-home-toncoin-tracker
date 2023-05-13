import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import React from 'react';
import { DataItem } from '@/types';
import Chart from '@/components/Chart';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = React.useState<Array<DataItem>>([]);
  React.useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=14&interval=daily');
      const json = await response.json();
      const result = json.prices.map((item: Array<any>) => ({
        date: item[0],
        price: item[1],
      }));
      setData(result);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Toncoin Tracker</title>
        <meta name="description" content="Toncoin Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <h3>Toncoin Tracker</h3>
          <Chart data={data} />
        </div>
      </main>
    </>
  );
}
