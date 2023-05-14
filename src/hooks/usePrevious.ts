import React from 'react';

function usePrevious<T>(value: T) {
  const valueRef = React.useRef(value);
  React.useLayoutEffect(() => { valueRef.current = value; });
  return valueRef;
}

export default usePrevious;
