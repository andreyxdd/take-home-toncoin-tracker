import React from 'react';

const PLOT_AREA_SCALE = 0.9;

function useSVGContainer() {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const [container, setContainer] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    if (ref.current) {
      const { clientHeight, clientWidth } = ref.current;
      setContainer({
        height: clientHeight,
        width: clientWidth,
      });
    }
  }, []);

  return {
    ref,
    container,
    plotArea: {
      width: container.width * PLOT_AREA_SCALE,
      height: container.height * PLOT_AREA_SCALE,
    },
  };
}

export default useSVGContainer;
