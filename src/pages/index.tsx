import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import React from 'react';
import PriceSection from '@/components/PriceSection';
import VolumeSection from '@/components/VolumeSection';

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
          <h2>The Open Network: Market Indicators</h2>
          <PriceSection />
          <VolumeSection />
        </div>
      </main>
    </>
  );
}
