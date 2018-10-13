
import React from 'react';
import { ART } from 'react-native';
import * as d3 from 'd3-shape';
export default function Arc (props) {

  const {
    radius,
    innerRadius,
    outerRadius,
    cornerRadius,
    startAngle,
    endAngle,
    strokePosition,
    rotateChildren,
    key,
    ...rest
  } = props;
  const {
    strokeWidth,
    children,
  } = props;

  let angleDelta = 0;
  let radiusDelta = 0;
  if (strokeWidth) {
    switch (strokePosition) {
    case 'inside':
      radiusDelta = -strokeWidth / 2;
      break;
    case 'outside':
      radiusDelta = strokeWidth / 2;
      break;
    case 'center':
    default:
      angleDelta = 0;
      radiusDelta = 0;
      break;
    }
  }

  const arc = d3.arc()
    .innerRadius(innerRadius ? innerRadius - radiusDelta : 0)
    .outerRadius((radius || outerRadius) + radiusDelta)
    .cornerRadius(cornerRadius || 0)
    .startAngle(startAngle - angleDelta)
    .endAngle(endAngle + angleDelta)
  ;

  const path = arc();

  // If there's no children, then we're done
  if (!children) return <ART.Shape {...rest} d={path} />;

  const [ textX, textY ] = arc.centroid();

  let transform;
  if (rotateChildren) {
    const angle = (startAngle + endAngle) / 2;
    transform = ART.Transform()
      .rotate((angle * 180 / Math.PI));
  }

  return (
    <ART.Group key={key}>
      <ART.Shape {...rest} d={path} />
      <ART.Group x={textX} y={textY} transform={transform}>
        {children}
      </ART.Group>
    </ART.Group>
  );
}
