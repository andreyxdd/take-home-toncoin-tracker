export function range({ from = 0, to }:{ from?: number, to: number }):Array<number> {
  return [...Array(to).keys()].map((i) => i + from);
}

export function tickRange(array: Array<number>, nTicks: number) {
  const maxValue = array.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
  const minValue = array.reduce((acc, curr) => Math.min(acc, curr), Infinity);
  const tickWidth = (Math.abs(maxValue - minValue)) / nTicks;

  const ticks = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nTicks; ++i) {
    ticks[i] = (maxValue - i * tickWidth).toPrecision(3);
  }

  return { ticks, minValue, maxValue };
}

export function tickDatesRange(
  array: Array<number>,
  nTicks: number,
) {
  const size = array.length;
  const startDate = array[0];
  const endDate = array[size - 1];
  const tickWidth = (endDate - startDate) / nTicks;

  const ticks = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nTicks; ++i) {
    ticks[i] = startDate + i * tickWidth;
  }
  ticks.push(endDate);

  return ticks;
}
