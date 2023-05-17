import React from 'react';
import { DataItem } from '@/types';
import { tickRange } from '../utils/calc';
/**
 * Memoization hooks to construct the array of vertical lables on the plot
 * @param data original dataset
 * @param dataKey a data key corresponding to the vertical labels
 * @param nTicks number of ticks
 * @returns array of labels, the maximum and mimnal numerical values in the oringal array
 */
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
