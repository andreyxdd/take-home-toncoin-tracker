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
