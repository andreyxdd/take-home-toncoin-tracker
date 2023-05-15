import React from 'react';
import { tickRange } from '@/utils/calc';

function useVerticalLabels(
  data: Array<any>,
  nTicks: number,
) {
  const { ticks: labels, minValue, maxValue } = React.useMemo(() => {
    const prices = data.map(({ price }) => price);
    return tickRange(prices, nTicks);
  }, [data, nTicks]);

  return { labels, minValue, maxValue };
}

export default useVerticalLabels;
