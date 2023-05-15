import React from 'react';
import { tickDatesRange } from '@/utils/calc';

function useHorizontalLabels(
  data: Array<any>,
  nTicks: number,
) {
  const labels = React.useMemo(() => {
    const dates = data.map(({ date }) => date);
    return tickDatesRange(dates, nTicks);
  }, [data, nTicks]);

  return labels;
}

export default useHorizontalLabels;
