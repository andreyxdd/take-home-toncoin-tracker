export const PLOT_AREA_SCALE = {
  x: 0.86,
  y: 0.9,
};
export const DATA_POINT_SIZE = 4;

export const periodConfig = {
  dateStringFormat: {
    day: 'h aa',
    week: 'LLL d',
    month: 'LLL d',
    year: 'MMM, yyyy',
  },
  nHorizontalTicks: {
    day: 6,
    week: 7,
    month: 6,
    year: 6,
  },
};

export const nVerticalTicks = 4;

export const numberFormatter = (precision: number = 2) => new Intl.NumberFormat(
  undefined,
  {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    notation: 'compact',
  },
);
