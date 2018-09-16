
import React from 'react';
import { ART } from 'react-native';
import * as d3 from 'd3-shape';
import color from 'color';

import {
  MB_BUTTON_RADIUS,
  MB_MOODS,
  MB_OUTER_BUTTONS,
  MB_ARCH_SPACING,
  MB_ARC_LENGTH_FACTOR,
  MB_INNER_ARC_THICKNESS_FACTOR,
  MB_INNER_ARC_PADDING,
  MB_OUTER_ARC_THICKNESS_FACTOR,
  MB_OUTER_ARC_PADDING,
  MB_MOOD_INACTIVE_PROPS,
  MB_MOOD_ACTIVE_PROPS,
  MB_MOOD_PRESSED_PROPS,
  MB_MOOD_TEXT_PROPS,
} from '../../constants';

function Text (props) {
  const { fontSize, fontWeight, fontFamily, fontStyle, textAnchor, ...rest } = props;

  const alignment = [
    'end': 'right',
    'start': 'left',
    'middle': 'center',
  ][textAnchor || 'start'];

  const font = {
    fontFamily: fontFamily || 'Helvetica, Neue Helvetica, Arial',
    fontSize,
    fontWeight,
    fontStyle,
  };

  return <ART.Text font={font} alignment={alignment} {...rest} />;
}

function InnerArcs (props) {
  const ARC_THICKNESS = props.INNER_ARC_THICKNESS;
  const ARC_INNER_RADIUS = MB_BUTTON_RADIUS + 5;
  const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
  const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
  const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
  const ARC_TEXT_Y = (-ARC_THICKNESS / 2) + 2;

  const arc = d3.arc()
    .innerRadius(ARC_INNER_RADIUS)
    .outerRadius(ARC_OUTER_RADIUS)
    .cornerRadius(3)
  ;
  const pie = d3.pie()
    .startAngle(ARC_START_ANGLE)
    .endAngle(-ARC_START_ANGLE)
    .padAngle(MB_INNER_ARC_PADDING)
    .sort(null)
  ;
  return pie(MB_MOODS.map((m) => (m.factor || 1)))
    .map((slice, i) => {
      const mood = MB_MOODS[i];
      const key = 'tab/' + mood.name;
      const d = arc(slice);

      let pathProps;
      if (props.pressedTarget === key) {
        const c = color(mood.fill).alpha(0.5).hsl().toString();
        pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS, d };
      } else if (props.currentTarget === key) {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_ACTIVE_PROPS, d };
      } else {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_INACTIVE_PROPS, d };
      }

      const textProps = {
        ...MB_MOOD_TEXT_PROPS,
        x: 0,
        y: ARC_TEXT_Y,
      };

      if (pathProps.textFill) textProps.fill = pathProps.textFill

      const angle = (slice.startAngle + slice.endAngle) / 2;
      const [ textX, textY ] = arc.centroid(slice);

      props.registerShape({ nodeName: key, nodeType: 'path', ...pathProps });

      const transform = ART.Transform()
        .rotate((angle * 180 / Math.PI));

      return (
        <ART.Group key={key}>
          <ART.Shape {...pathProps} />
          <ART.Group x={textX} y={textY} transform={transform}>
            <Text {...textProps}>{mood.name}</Text>
          </ART.Group>
        </ART.Group>
      );
    })
  ;
}

function OuterArcs (props) {
  const ARC_THICKNESS = props.OUTER_ARC_THICKNESS;
  const ARC_INNER_RADIUS = MB_BUTTON_RADIUS + MB_ARCH_SPACING + props.INNER_ARC_THICKNESS + MB_ARCH_SPACING;
  const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
  const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
  const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
  const ARC_TEXT_Y = -8;

  // const path = ART.Path()
  //   .move(rad, 0)
  //   .arc(0, rad * 2, rad)
  //   .arc(0, rad * -2, rad);

  const arc = d3.arc()
    .innerRadius(ARC_INNER_RADIUS)
    .outerRadius(ARC_OUTER_RADIUS)
    .cornerRadius(3)
  ;
  const pie = d3.pie()
    .startAngle(ARC_START_ANGLE)
    .endAngle(-ARC_START_ANGLE)
    .padAngle(MB_OUTER_ARC_PADDING)
    .sort(null)
  ;
  return pie(MB_OUTER_BUTTONS.map((m) => (m.factor || 1)))
    .map((slice, i) => {
      const mood = MB_OUTER_BUTTONS[i];
      const key = 'tab/' + mood.name;
      const d = arc(slice);

      let pathProps;
      if (props.pressedTarget === key) {
        const c = color(mood.fill).alpha(0.5).hsl().toString();
        pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS, d };
      } else if (props.currentTarget === key) {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_ACTIVE_PROPS, d };
      } else {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_INACTIVE_PROPS, d };
      }

      const angle = (slice.startAngle + slice.endAngle) / 2;
      const [ textX, textY ] = arc.centroid(slice);

      props.registerShape({ nodeName: key, nodeType: 'path', ...pathProps });

      const transform = ART.Transform()
        .rotate((angle * 180 / Math.PI));

      // const textPath = d3path()
      //   .arc(0, 0, (ARC_THICKNESS / 2) + ARC_INNER_RADIUS, slice.startAngle, slice.endAngle);

      return (
        <ART.Group key={key}>
          <ART.Shape {...pathProps} />
          <ART.Group x={textX} y={textY} transform={transform}>
            <Text x={0} y={ARC_TEXT_Y} {...MB_MOOD_TEXT_PROPS}>{mood.name}</Text>
          </ART.Group>
        </ART.Group>
      );
    })
  ;
}

export default function Arcs (props) {
  const INNER_ARC_THICKNESS = (
    props.CONTROL_CENTER_X - MB_BUTTON_RADIUS - MB_ARCH_SPACING
  ) * MB_INNER_ARC_THICKNESS_FACTOR;

  const OUTER_ARC_THICKNESS = (
    props.CONTROL_CENTER_X - MB_BUTTON_RADIUS - MB_ARCH_SPACING - INNER_ARC_THICKNESS
  ) * MB_OUTER_ARC_THICKNESS_FACTOR;

  return (
    <ART.Group>
      <InnerArcs {...props} {...{ INNER_ARC_THICKNESS, OUTER_ARC_THICKNESS }} />
      <OuterArcs {...props} {...{ INNER_ARC_THICKNESS, OUTER_ARC_THICKNESS }} />
    </ART.Group>
  );
}
