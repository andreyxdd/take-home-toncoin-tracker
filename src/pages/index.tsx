import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import React from 'react';
import Dashboard from '@/components/Dashboard';

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
          <h3>Toncoin Tracker</h3>
          <Dashboard />
        </div>
      </main>
    </>
  );
}
