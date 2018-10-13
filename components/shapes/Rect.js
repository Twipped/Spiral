
import React from 'react';
import { ART } from 'react-native';

export default function Rect (props) {
  const { width, height, ...rest } = props;

  const path = ART.Path()
    .move(0, 0)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return <ART.Shape {...rest} d={path} />;
}
