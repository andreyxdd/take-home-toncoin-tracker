import React from 'react';
import useEventListener from './useEventListener';

/**
 * ACKNOWLEDGEMENTS:
 * Thanks to the usehooks-ts library (https://usehooks-ts.com/).
 * The deas implemented below were taken from there.
 */

const PLOT_AREA_SCALE = 0.9;

function useSVGContainer() {
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

  useEventListener('resize', handleContainer);

  React.useLayoutEffect(() => {
    handleContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.clientHeight, ref?.clientWidth]);

  return {
    ref: setRef,
    container,
    plotArea: {
      width: container.width * PLOT_AREA_SCALE,
      height: container.height * PLOT_AREA_SCALE,
    },
  };
}

export default useSVGContainer;
