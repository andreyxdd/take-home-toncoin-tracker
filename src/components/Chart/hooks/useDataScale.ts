import React from 'react';
import { DataItem } from '../types';

/**
 * Hook to project values from the data set into X and Y coordinates.
 * @param data - original dataset
 * @param yMin - minimal value in the dataset
 * @param yMax - maximum value in the dataset
 * @param height - height of the plot area
 * @param tickLength - length of the data point ticks (both vertical and horziontal)
 * @param offset - paddings for the data inside plot area (relative to the SVG container)
 * @returns new dataset with coordinates corresponding to the actual values
 */

function useDataScale<T extends DataItem>(
  data: Array<T>,
  dataKey: keyof T,
  yMin: number,
  yMax: number,
  height: number,
  tickLengths: { x:number, y:number },
  offset: { x:number, y:number },
) {
  const dataPoints = React.useMemo(() => data.map((item, idx) => {
    const x = offset.x + idx * tickLengths.x;
    const y = offset.y + (height - tickLengths.y)
    * (1 - Math.abs(item[dataKey] - yMin) / Math.abs(yMax - yMin));
    return { x, y, ...item };
  }), [data, offset.x, offset.y, tickLengths.x, tickLengths.y, height, dataKey, yMin, yMax]);

  return dataPoints;
}

export default useDataScale;
