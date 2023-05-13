import React from 'react';
import Labels from './Labels';

type Props = {
  verticalOffset?: number;
  horizontalOffset?: number;
  data: Array<number | string>;
  tickWidth: number;
};

function XLabels(props: Props) {
  return <Labels {...props} axis="y" />;
}

export default XLabels;
