import React from 'react';
import debounce from '../utils/debounce';
import useEventListener from '../../../hooks/useEventListener';

/**
 * ACKNOWLEDGEMENTS:
 * Thanks to the usehooks-ts library (https://usehooks-ts.com/).
 * The below implemented is based on their code.
 */
function useSVGContainer(resizeDelay: number = 300) {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component:
  // e.g. const ref = React.useRef<SVGSVGElement | null>(null);
  // So, instead, let's use a state as a ref to be reactive.
  const [ref, setRef] = React.useState<SVGSVGElement | null>(null);

  const [container, setContainer] = React.useState({ width: 0, height: 0 });

  // Prevent unnecessary renders:
  const handleContainer = React.useCallback(() => {
    if (ref) {
      const { clientHeight, clientWidth } = ref;
      setContainer({
        height: clientHeight,
        width: clientWidth,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.clientHeight, ref?.clientWidth]);

  useEventListener('resize', debounce<Event>(handleContainer, resizeDelay));

  React.useLayoutEffect(() => {
    handleContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.clientHeight, ref?.clientWidth]);

  return {
    ref: setRef,
    container,
  };
}

export default useSVGContainer;
