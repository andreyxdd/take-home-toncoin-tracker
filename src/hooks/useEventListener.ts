import React from 'react';
import usePrevious from './usePrevious';

function useEventListener(type: string, cb: (event: Event) => void) {
  const prevoisCb = usePrevious(cb);

  React.useEffect(() => {
    const handler = (event: Event) => {
      prevoisCb.current(event);
    };

    window.addEventListener(type, handler);

    return () => window.removeEventListener(type, handler);
  }, [prevoisCb, type]);
}

export default useEventListener;
