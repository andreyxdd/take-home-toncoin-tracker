import React from 'react';
import config from '../config';

/**
 * Hook to construct an object defining the area inside the SVG container that
 * corresponds to the actual plot and data points
 * @param width width of the parential SVG container
 * @param height height of the parential SVG container
 * @returns plot object with its width, height, and paddings
 */
function usePlotContainer(width: number, height: number) {
  const plot = React.useMemo(() => ({
    width: width * config.plotAreaScale.x,
    height: height * config.plotAreaScale.y,
    padding: {
      top: 0,
      bottom: height * (1 - config.plotAreaScale.y),
      left: width * (1 - config.plotAreaScale.x) * 0.5,
      right: width * (1 - config.plotAreaScale.x) * 0.5,
    },
  }), [width, height]);
  return plot;
}

export default usePlotContainer;
