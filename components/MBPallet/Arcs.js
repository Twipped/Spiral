/* eslint new-cap:0 */

import React from 'react';
import { View, Dimensions, ART, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { material } from 'react-native-typography';
import * as d3 from 'd3-shape';
import color from 'color';

import pathfinder from '../../lib/pathfinder';

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
} from '../../constants';

function Text (props) {
  const { style, fontSize, fontWeight, fontFamily, fontStyle, textAnchor, fill, ...rest } = props;

  const alignment = [
    'end': 'right',
    'start': 'left',
    'middle': 'center',
  ][textAnchor || 'start'];

  const font = {
    ...style,
    fontFamily: style && style.fontFamily || fontFamily || 'System',
    fontSize: style && style.fontSize || fontSize || 14,
    fontWeight: style && style.fontWeight || fontWeight || 'normal',
    fontStyle: style && style.fontStyle || fontStyle || 'normal',
  };

  const color = fill || style.color || style.fill;

  console.log(font, rest.children);

  return <ART.Text font={font} fill={color} alignment={alignment} {...rest} />;
}

function InnerArcs (props) {
  const ARC_THICKNESS = props.INNER_ARC_THICKNESS;
  const ARC_INNER_RADIUS = MB_BUTTON_RADIUS + MB_ARCH_SPACING;
  const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
  const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
  const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
  const ARC_TEXT_Y = (-ARC_THICKNESS / 2) + 2;

  const counts = props.counts;

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

  return pie(Object.values(MB_MOODS).map((m) => (m.factor || 1)))
    .map((slice, i) => {
      const moodName = Object.keys(MB_MOODS)[i];
      const mood = MB_MOODS[moodName];
      const key = 'tab/' + moodName;
      const d = arc(slice);
      const count = counts[moodName];

      let pathProps;
      if (props.pressedTarget === key) {
        const c = color(mood.fill).alpha(0.5).hsl().toString();
        pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS, d };
      } else if (props.currentTarget === key) {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_ACTIVE_PROPS, d };
      } else {
        pathProps = { fill: mood.fill, stroke: mood.fill, ...MB_MOOD_INACTIVE_PROPS, d };
      }

      const countColor = color(mood.fill).darken(0.1).hsl().toString();

      const angle = (slice.startAngle + slice.endAngle) / 2;
      const [ textX, textY ] = arc.centroid(slice);

      props.registerShape({ nodeName: key, nodeType: 'path', ...pathProps });

      const transform = ART.Transform()
        .rotate((angle * 180 / Math.PI));

      return (
        <ART.Group key={key}>
          <ART.Shape {...pathProps} />
          <ART.Group x={textX} y={textY} transform={transform}>
            <Text x={0} y={ARC_TEXT_Y} alignment="center" style={styles.arcText}>{mood.name}</Text>
            <Text x={0} y={-styles.arcCount.fontSize / 2} alignment="center" fill={countColor} style={styles.arcCount}>{count && String(count)}</Text>
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
      const buttonTab = MB_OUTER_BUTTONS[i];
      const key = 'tab/' + buttonTab.name;
      const d = arc(slice);

      let pathProps;
      if (props.pressedTarget === key) {
        const c = color(buttonTab.fill).alpha(0.5).hsl().toString();
        pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS, d };
      } else if (props.currentTarget === key) {
        pathProps = { fill: buttonTab.fill, stroke: buttonTab.fill, ...MB_MOOD_ACTIVE_PROPS, d };
      } else {
        pathProps = { fill: buttonTab.fill, stroke: buttonTab.fill, ...MB_MOOD_INACTIVE_PROPS, d };
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
            <Text x={0} y={-styles.arcText.fontSize / 2} style={styles.arcText} alignment="center">{buttonTab.name}</Text>
          </ART.Group>
        </ART.Group>
      );
    })
  ;
}

function CornerButton (props) {
  const buttonTab = {
    fill: props.fill,
    name: props.tab,
  };
  const key = 'tab/' + buttonTab.name;
  const isRight = props.side === 'right';

  let pathProps;
  if (props.pressedTarget === key) {
    const c = color(buttonTab.fill).alpha(0.5).hsl().toString();
    pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS };
  } else if (props.currentTarget === key) {
    pathProps = { fill: buttonTab.fill, stroke: buttonTab.fill, ...MB_MOOD_ACTIVE_PROPS };
  } else {
    pathProps = { fill: buttonTab.fill, stroke: buttonTab.fill, ...MB_MOOD_INACTIVE_PROPS };
  }

  const ARC_THICKNESS = 35;
  const ARC_INNER_RADIUS = MB_BUTTON_RADIUS
    + MB_ARCH_SPACING
    + props.INNER_ARC_THICKNESS
    + MB_ARCH_SPACING
    + props.OUTER_ARC_THICKNESS
    + MB_ARCH_SPACING;
  const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
  const START_ANGLE = 0.95 * (isRight ? 1 : -1);
  const END_ANGLE   = 0.65 * (isRight ? 1 : -1);

  const arc = d3.arc()
    .innerRadius(ARC_INNER_RADIUS)
    .outerRadius(ARC_OUTER_RADIUS)
    .startAngle(START_ANGLE)
    .endAngle(END_ANGLE)
    .cornerRadius(3)
  ;

  const d = arc();

  const textAngle = ((START_ANGLE + END_ANGLE) / 2) * 180 / Math.PI;
  const [ textX, textY ] = arc.centroid();

  props.registerShape({ nodeName: key, nodeType: 'path', ...pathProps, d });

  const transform = ART.Transform()
    .rotate(textAngle);

  return (
    <ART.Group key={key}>
      <ART.Shape {...pathProps} d={d} />
      <ART.Group x={textX} y={textY} transform={transform}>
        <Text x={0} y={-8} style={styles.arcText} alignment="center">{buttonTab.name}</Text>
      </ART.Group>
    </ART.Group>
  );
}


@observer
class MBPallet extends React.Component {

  constructor () {
    super();

    this.state = {
      pressedTarget: null,
      currentTab: null,
    };
  }

  lastPressDown = false;

  dimensions () {
    const Window = Dimensions.get('window');

    const CONTROL_WIDTH  = Window.width;
    const CONTROL_HEIGHT = (CONTROL_WIDTH / 2) + MB_ARCH_SPACING;
    const CONTROL_CENTER_X = CONTROL_WIDTH / 2;
    const CONTROL_CENTER_Y = CONTROL_HEIGHT;

    return {
      CONTROL_WIDTH,
      CONTROL_HEIGHT,
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
    };
  }

  evToXY (ev) {
    const {
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
    } = this.dimensions();
    return [ ev.nativeEvent.locationX - CONTROL_CENTER_X, ev.nativeEvent.locationY - CONTROL_CENTER_Y ];
  };

  gestureBindings = {
    onStartShouldSetResponderCapture: (ev) => {
      const node = ReactNativeComponentTree.getInstanceFromNode(ev.target);
      if (node.type !== 'ARTSurfaceView') return false;

      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      return !!match;
    },
    onMoveShouldSetResponder: () => true,
    onResponderTerminationRequest: () => true,
    onResponderGrant: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      this.setState({ pressedTarget: match.nodeName });
    },
    onResponderMove: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      if (this.state.pressedTarget !== match.nodeName) {
        this.setState({ pressedTarget: match.nodeName });
      }
    },
    onResponderRelease: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      this.handlePress(match.nodeName);
      return this.setState({ pressedTarget: null });
    },

  }

  handlePress (buttonName) {
    if (buttonName === this.state.buttonName) return;
    this.setState({ currentTab: buttonName });
    if (this.props.onTabSwitch) this.props.onTabSwitch(buttonName.split('/')[1]);
  }

  render () {
    this.currentPaths = [];
    const registerShape = (shape) => { this.currentPaths.push(shape); };

    const { style } = this.props;
    const dimensions = this.dimensions();
    const {
      CONTROL_WIDTH,
      CONTROL_HEIGHT,
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
    } = dimensions;

    const viewBox = [
      0,
      0,
      CONTROL_WIDTH,
      CONTROL_HEIGHT,
    ].join(' ');

    const props = {
      registerShape,
      currentTarget: this.state.currentTab,
      pressedTarget: this.state.pressedTarget,
      ...dimensions,
    };

    props.INNER_ARC_THICKNESS = (
      CONTROL_CENTER_X - MB_BUTTON_RADIUS - MB_ARCH_SPACING
    ) * MB_INNER_ARC_THICKNESS_FACTOR;

    props.OUTER_ARC_THICKNESS = (
      CONTROL_CENTER_X - MB_BUTTON_RADIUS - MB_ARCH_SPACING - props.INNER_ARC_THICKNESS
    ) * MB_OUTER_ARC_THICKNESS_FACTOR;

    return (
      <View style={{ ...styles.palletContent, ...style, height: CONTROL_HEIGHT }} {...this.gestureBindings} >
        <ART.Surface
          width={CONTROL_WIDTH}
          height={CONTROL_HEIGHT}
          viewBox={viewBox}
          preserveAspectRatio="XMidYMid meet"
        >
          <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
            <InnerArcs {...props} />
            <OuterArcs {...props} />
            <CornerButton tab="Marker" fill="#CCC" side="left"  {...props} />
            <CornerButton tab="Note"   fill="#CCC" side="right" {...props} />
          </ART.Group>
        </ART.Surface>
      </View>
    );
  }
};

export default MBPallet;

const styles = {

  palletContent: {
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  arcText: {
    ...StyleSheet.flatten(material.body2),
    fill: '#111',
  },

  arcCount: {
    ...StyleSheet.flatten(material.display2),
  },

};
