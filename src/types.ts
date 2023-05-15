export type DataItem = {
  date: number;
  price: number;
};

export const periods = ['day', 'week', 'month', 'year'] as const;
export type Periods = typeof periods[number];

export type Dimensions = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
