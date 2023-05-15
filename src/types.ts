export const periods = ['day', 'week', 'month', 'year'] as const;
export type Periods = typeof periods[number];
