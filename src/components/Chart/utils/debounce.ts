/**
 * Simple debounce wrapper
 * @param fn callback
 * @param ms debounce period (in milliseconds)
 * @returns debounced function
 */
function debounce<ARG = unknown, RET = void>(
  fn: (args: ARG) => RET,
  ms: number,
) {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: ARG): Promise<RET> => new Promise((resolve) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      resolve(fn(args));
    }, ms);
  });

  return debouncedFunc;
}

export default debounce;
