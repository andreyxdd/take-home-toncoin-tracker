import React from 'react';
import { tickRange } from '@/utils/calc';
import { DataItem } from '@/types';

function useVerticalLabels<T extends DataItem>(
  data: Array<T>,
  dataKey: keyof T,
  nTicks: number,
) {
  const { ticks: labels, minValue, maxValue } = React.useMemo(() => {
    const items = data.map((item) => item[dataKey]);
    return tickRange(items, nTicks);
  }, [data, dataKey, nTicks]);

  return { labels, minValue, maxValue };
}

export default useVerticalLabels;
