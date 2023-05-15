import { Periods } from '@/types';

export const initialContext = {
  container: { width: 0, height: 0 },
  plot: { width: 0, height: 0 },
  period: 'day' as Periods,
  labelsTickLengths: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  verticalLabels: [],
  horizontalLabels: [],
  data: [],
};

export const PLOT_AREA_SCALE = {
  x: 0.92,
  y: 0.9,
};
export const DATA_POINT_SIZE = 4;

export const formatString = {
  day: 'h aa',
  week: 'LLL d',
  month: 'LLL d',
  year: 'MMM',
};

export const numberOfTicks = {
  x: 6,
  y: 4,
};
