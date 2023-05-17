import React from 'react';
import { DataItem } from '@/types';
import { tickDatesRange } from '../utils/calc';

/**
 * Memoization hooks to construct the array of horionztal lables on the plot
 * @param data original dataset
 * @param dataKey a data key corresponding to the horizontal labels
 * @param nTicks number of ticks
 * @returns array of dates (timestamps)
 */
function useHorizontalLabels<T extends DataItem>(
  data: Array<T>,
  dataKey: keyof T,
  nTicks: number,
) {
  const labels = React.useMemo(() => {
    const dates = data.map((item) => item[dataKey]);
    return tickDatesRange(dates, nTicks);
  }, [data, dataKey, nTicks]);

  return labels;
}

export default useHorizontalLabels;
