import React from 'react';
import { ChartContext } from '../context';
import { ChartContextProps } from '../types';

const useChartContext = () => React.useContext(ChartContext) as ChartContextProps;

export default useChartContext;
