import { DataItem, Period } from '@/types';

export type DataKeys<T> = {
  x: keyof T;
  y: keyof T;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Padding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type Point = {
  x: number;
  y: number;
};

export type ChartContextProps = {
  container: Dimensions;
  plot: Dimensions & { padding: Padding };
  period: Period;
  labelsTickLengths: Point;
  dataOffset: Point;
  verticalLabels: Array<number | string>;
  horizontalLabels: Array<number | string>;
  dataKeys: DataKeys<DataItem>;
  data: Array<DataItem>;
  nTicks: Point;
};
