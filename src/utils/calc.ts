export function range({ from = 0, to }:{ from?: number, to: number }):Array<number> {
  return [...Array(to).keys()].map((i) => i + from);
}

export function tickRange(array: Array<number>, nTicks: number): Array<string> {
  const maxValue = array.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
  const minValue = array.reduce((acc, curr) => Math.min(acc, curr), Infinity);
  const tickWidth = (Math.abs(maxValue - minValue)) / nTicks;

  const res = [];
  let tmp = minValue;
  while (tmp < maxValue) {
    tmp += tickWidth;
    res.unshift(tmp.toPrecision(3));
  }
  res.push(minValue.toPrecision(3));

  return res;
}
