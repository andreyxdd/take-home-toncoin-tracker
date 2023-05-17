export function range({ from = 0, to }:{ from?: number, to: number }):Array<number> {
  return [...Array(to).keys()].map((i) => i + from);
}

/**
 * Construct an array of ticks between the largest and
 * smallest elements of the given array
 * @param array array of number
 * @param nTicks number of ticks in the resulting range
 * @returns array of ticks
 */
export function tickRange(array: Array<number>, nTicks: number) {
  const maxValue = array.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
  const minValue = array.reduce((acc, curr) => Math.min(acc, curr), Infinity);
  const tickWidth = (Math.abs(maxValue - minValue)) / (nTicks - 1);

  const ticks = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nTicks; ++i) {
    ticks[i] = maxValue - i * tickWidth;
  }

  return { ticks, minValue, maxValue };
}

/**
 * Construct an array of dates (timestamps) excluding some elemnts in the oringal
 * array based on the number of ticks
 * @param array array of number
 * @param nTicks number of ticks in the resulting range (of dates)
 * @returns array of ticks (dates)
 */
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
