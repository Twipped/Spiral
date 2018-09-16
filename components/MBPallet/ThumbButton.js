
import React from 'react';
import { ART } from 'react-native';

import {
  MB_BUTTON_RADIUS,
  MB_BUTTON_PRESSED_PROPS,
  MB_BUTTON_ACTIVE_PROPS,
  MB_BUTTON_INACTIVE_PROPS,
} from '../../constants';


function Circle (props) {
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

function Rect (props) {
  const { width, height, ...rest } = props;

  const path = ART.Path()
    .move(0, 0)
    .line(width, 0)
    .line(0, height)
    .line(-width, 0)
    .line(0, -height);

  return <ART.Shape {...rest} d={path} />;
}

export default function ThumbButton (props) {
  let BUTTON_PROPS;
  if (props.pressedTarget === 'centerButton') {
    BUTTON_PROPS = MB_BUTTON_PRESSED_PROPS;
  } else if (props.isActive) {
    BUTTON_PROPS = MB_BUTTON_ACTIVE_PROPS;
  } else {
    BUTTON_PROPS = MB_BUTTON_INACTIVE_PROPS;
  }

  props.registerShape({
    nodeName: 'centerButton',
    nodeType: 'circle',
    cx: 0,
    cy: 0,
    r: MB_BUTTON_RADIUS,
  });

  return (
    <ART.Group>
      <Circle cx={0} cy={0} r={MB_BUTTON_RADIUS} {...BUTTON_PROPS} />
      <Rect fill={BUTTON_PROPS.stroke} x={-3}  y={-20} width={6}  height={40} />
      <Rect fill={BUTTON_PROPS.stroke} x={-20} y={-3}  width={40} height={6} />
    </ART.Group>
  );
}
