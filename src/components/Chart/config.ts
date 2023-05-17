/**
 * This is a configuration file for the time series chart component.
 * Potentially, these settings can be used as props allowing for better customization.
 */

export default {
  // how much width and height the plot area gets from the main svg container
  plotAreaScale: {
    x: 0.86,
    y: 0.9,
  },

  // size of the dots
  dataPointSize: 4,

  intervals: {
    // string format settings for the horizontal labels
    dateStringFormat: {
      day: 'h aa',
      week: 'LLL d',
      month: 'LLL d',
      year: 'MMM, yyyy',
    },
    // number of horizontal ticks also depends on the selected interval
    nHorizontalTicks: {
      day: 6,
      week: 7,
      month: 6,
      year: 6,
    },
  },

  // number of vertical ticks
  nVerticalTicks: 4,

  // formatting numerical labels on the plot
  numberFormatter: (precision: number = 2) => new Intl.NumberFormat(
    undefined,
    {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      notation: 'compact',
    },
  ),
};
