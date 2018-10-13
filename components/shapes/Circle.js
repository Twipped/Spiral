
import React from 'react';
import { ART } from 'react-native';

export default function Circle (props) {
  const { radius, r, ...rest } = props;
  const rad = r || radius || 0;

  const path = ART.Path()
    .move(rad, 0)
    .arc(0, rad * 2, rad)
    .arc(0, rad * -2, rad);

  rest.x = (rest.x || 0) - rad;
  rest.y = (rest.y || 0) - rad;

  return <ART.Shape {...rest} d={path} />;
}
