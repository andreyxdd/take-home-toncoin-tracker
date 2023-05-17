import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import React from 'react';
import Sections from '@/components/Sections';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
          <h2>The Open Network: Historical Data</h2>
          <Sections />
        </div>
        <footer className={styles['footer-container']}>
          <div className={styles['footer-content']}>
            <p>Proudly created by Andrey Volkov</p>
            <p>
              Checkout source code on
              {' '}
              <a href="https://github.com/andreyxdd/toncoin-tracker">Github</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
