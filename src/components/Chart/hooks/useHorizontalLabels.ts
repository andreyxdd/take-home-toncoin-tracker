import React from 'react';
import { tickDatesRange } from '@/utils/calc';
import { DataType } from '../types';

function useHorizontalLabels<T extends DataType>(
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
