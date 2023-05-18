# TON Tracker

## Introduction

This a simple dashboard PWA displaying some historical data of the [TON (the-open-network)](https://ton.org/en) coin. At the moment there are five sections:
- Market price over the past day, week, month, year (updates every 10 minutes) 
- Trading volume over the past day, week, month, year (updates every 10 minutes)
- Total number of transactions over the past week, month, year
- Transactions per second over the past week, month, year <strong>(defined as total count over the given day divided by the 24-hours - this might be incorrect)</strong>
- Finally, there is a mock data series that was used for the testing and development

The app includes a  reusable chart component for representing different time series that is separated into its own context, and has its own components, hooks, etc. See details in the corresponding [README](https://github.com/andreyxdd/toncoin-tracker/tree/main/src/components/Chart).

Certain critical parts of the code include documentation.

## Demo version

Check out the demo version of the app deployed on Vercel: [toncoin-tracker](https://toncoin-tracker.vercel.app/).

Since it's a PWA, the native version can be downloaded by clicking the corresponding button in the browser:

The mobile version:

## Local Development

First, in the root directory, create a `.env.local` file with the following variables:
```bash
COINGECKO_STATS_API=https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd
TON_STATS_API=https://tontech.io/api/transactions_count
```

Then install the necessary packages:
```bash
npm install
```

Now everything is ready to run the development server:
```bash
npm run dev
```

The app should now be available in the [http://localhost:3000](http://localhost:3000).

## Possible Imporvements

### First SSR fetch

Currently, the app fetches data from the 'client' side, meaning the javascript code dynamically modifies the DOM to create the charts. A great [react-query](https://tanstack.com/query/v3/docs/react/overview) library was used in this case for fetching, refetching, revalidating, and caching API calls. 

However, there is an alternative approach to the first fetch -- which is to use `Next.js` functional to generate the HTML/CSS on the server without asking the client to do that. This can be done by utilizing the `getServerSideProps` method on the page component. The data received from `getServerSideProps` can be passed as `initialData` prop into the `useQueryWrapper` hooks. This would prevent react-query from making the first fetch.

The only downside of this approach is that the data from `getServerSideProps` needs to be passed from the page component down to the Sections components, i.e., prop-drilling. That's why Next.js team came up with so-called "server components" that allow making asynchronous calls inside the component body, thus avoiding prop-drilling.

### Chart code implementation: SVG vs Canvas

Most often, the chart components are implemented using the Canvas component. Nevertheless, for this little project, I've decided to utilize SVG elements. Let's quickly discuss the pros and cons of each:
- SVG elements are resolution independent, while canvas elements are not (at least not out of the box)
- SVG elements are in the DOM, meaning responding to user actions like clicks on particular elements is as simple as responding to events on any other DOM element. On the other hand, it's harder to handle user interactions with Canvas.
- The biggest downside of the SVG is that it's not performant for a large number of elements. This is the opposite of Canvas, which is often used for impressive 3D or immersive animations. The below chart shows a performance comparison.

![Canvas vs SVG](https://barchart-news-media-prod.aws.barchart.com/BCBLOG/c02c0334e9edbadf5d1d426557ee3056/0_ghn4jn17jwbh5yrw.png)

For this app, the SVG elements were selected, because:
- It was easier to start
- There were not so many elements to display on the charts
