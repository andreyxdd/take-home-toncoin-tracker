import React from 'react';
import { ChartContext, ChartContextProps } from '../index';

const useChartContext = () => React.useContext(ChartContext) as ChartContextProps;

export default useChartContext;
