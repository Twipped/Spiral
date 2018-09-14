
import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Dimensions, SafeAreaView, Animated, ART } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree'
import * as d3 from 'd3-shape';

import {
  MB_CONTROL_HEIGHT,
  MB_PRESS_DURATION,
  MB_BUTTON_RADIUS,
  MB_BUTTON_SPACING,
  MB_ARC_THICKNESS_FACTOR,
  MB_ARC_LENGTH_FACTOR,
  MB_BUTTON_ACTIVE_PROPS,
  MB_BUTTON_INACTIVE_PROPS,
  MB_ARC_PADDING,
  MB_MOODS,
  MB_MOOD_STROKE_WIDTH_INACTIVE,
  MB_MOOD_STROKE_WIDTH_ACTIVE,
  MB_MOOD_STROKE_COLOR_INACTIVE,
  MB_MOOD_STROKE_COLOR_ACTIVE,
} from '../constants';
import { map } from 'lodash';

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

class SymptomPallet extends React.Component {

  constructor () {
    super();

    this.state = {
      open: false,
      lastPressDown: null,
    };
  }

  lastPressDown = false;

  dimensions () {
    const dimensions = Dimensions.get('window');
    const WINDOW_WIDTH = dimensions.width;
    const WINDOW_HEIGHT = dimensions.height;
    const BUTTON_RADIUS = MB_BUTTON_RADIUS;
    const ARC_THICKNESS = BUTTON_RADIUS * MB_ARC_THICKNESS_FACTOR;
    const ARC_INNER_RADIUS = BUTTON_RADIUS + 5;
    const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
    const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
    const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
    const ARC_TEXT_Y = (-ARC_THICKNESS / 2) + 2;
    const CONTROL_CENTER_X = WINDOW_WIDTH / 2;
    const CONTROL_CENTER_Y = (MB_CONTROL_HEIGHT / 2) + BUTTON_RADIUS;

    return {
      WINDOW_WIDTH,
      WINDOW_HEIGHT,
      BUTTON_RADIUS,
      ARC_THICKNESS,
      ARC_INNER_RADIUS,
      ARC_OUTER_RADIUS,
      ARC_LENGTH,
      ARC_START_ANGLE,
      ARC_TEXT_Y,
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
    };
  }

  gestureBindings = {
    // onStartShouldSetResponder: () => true,
    onStartShouldSetResponder: (ev) => {
      const {
        BUTTON_RADIUS,
        CONTROL_CENTER_X,
        CONTROL_CENTER_Y,
      } = this.dimensions();
      const [ x, y ] = [ ev.nativeEvent.locationX, ev.nativeEvent.locationY ];
      console.log('capture', { x, y });
      if (this.state.open) {
        return true;
      }

      const withinCircle =
        x > CONTROL_CENTER_X - BUTTON_RADIUS
        && x < CONTROL_CENTER_X + BUTTON_RADIUS
        && y > CONTROL_CENTER_Y - BUTTON_RADIUS
        && y < CONTROL_CENTER_Y + BUTTON_RADIUS
      ;

      return withinCircle;
    },
    // onMoveShouldSetResponder: () => true,
    // onMoveShouldSetResponderCapture: () => true,
    onResponderTerminationRequest: () => true,
    onResponderGrant: () => {
      console.log('granted');
      if (this.state.open) {
        this.lastPressDown = false;
        return;
      }

      this.setState({
        open: true,
      });
      this.lastPressDown = Date.now();
    },
    // onResponderMove: () => {
    //   console.log('move');
    // },
    onResponderRelease: () => {
      if (!this.lastPressDown || Date.now() - this.lastPressDown > MB_PRESS_DURATION) {
        this.setState({
          open: false,
        });
        console.log('released');
      }
      this.lastPressDown = false;
    },

    // onPressIn: (ev) => {
    //   const node = ReactNativeComponentTree.getInstanceFromNode(ev.currentTarget);
    //   console.log(Object.keys(node), Object.keys(node.memoizedProps));
    // },
  }

  render () {
    console.log('render', this.state);
    const { style, children } = this.props;
    const {
      WINDOW_WIDTH,
      WINDOW_HEIGHT,
      BUTTON_RADIUS,
      ARC_INNER_RADIUS,
      ARC_OUTER_RADIUS,
      ARC_START_ANGLE,
      ARC_TEXT_Y,
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
    } = this.dimensions();
    const BUTTON_PROPS = this.state.open
      ? MB_BUTTON_ACTIVE_PROPS
      : MB_BUTTON_INACTIVE_PROPS;

    function CenterButton () {
      return (
        <ART.Group>
          <Circle r={BUTTON_RADIUS} {...BUTTON_PROPS} />
          <Rect fill={BUTTON_PROPS.stroke} x={-3}  y={-20} width={6}  height={40} />
          <Rect fill={BUTTON_PROPS.stroke} x={-20} y={-3}  width={40} height={6} />
        </ART.Group>
      );
    }

    function MoodButtons () {
      const arc = d3.arc()
        .innerRadius(ARC_INNER_RADIUS)
        .outerRadius(ARC_OUTER_RADIUS)
        .cornerRadius(3)
      ;
      const pie = d3.pie()
        .startAngle(ARC_START_ANGLE)
        .endAngle(-ARC_START_ANGLE)
        .padAngle(MB_ARC_PADDING)
        .sort(null)
      ;
      const arcs = pie(MB_MOODS.map((m) => (m.factor || 1)))
        .map((slice, i) => {
          const mood = MB_MOODS[i];
          const path = {
            d: arc(slice),
            stroke: MB_MOOD_STROKE_COLOR_INACTIVE,
            strokeWidth: MB_MOOD_STROKE_WIDTH_INACTIVE,
            fill: mood.color,
          };
          const angle = (slice.startAngle + slice.endAngle) / 2;
          const [ textX, textY ] = arc.centroid(slice);

          // const transform = `rotate(${(angle * 180 / Math.PI)})`;

          const transform = ART.Transform()
            .rotate((angle * 180 / Math.PI));

          return (
            <ART.Group key={'mood-' + mood.name}>
              <ART.Shape {...path} />
              <ART.Group x={textX} y={textY} transform={transform}>
                <Text
                  x={0}
                  y={ARC_TEXT_Y}
                  fontSize={14}
                  fontWeight="bold"
                  fill="#111"
                  alignment="center"
                >
                  {mood.name}
                </Text>
              </ART.Group>
            </ART.Group>
          );
        });
      ;

      return arcs;
    }

    const viewBox = [
      0,
      0,
      WINDOW_WIDTH,
      MB_CONTROL_HEIGHT,
    ].join(' ');

    return (
      <View style={style}>
        <SafeAreaView style={styles.palletContent} forceInset={{ bottom: 'always', top: 'never' }}>
          <View style={{ position: 'absolute', width: WINDOW_WIDTH, height: WINDOW_HEIGHT }} >{children}</View>
          {this.state.open && <View style={[ styles.overlay, { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } ]} />}
          <View style={{ zIndex: 150 }} {...this.gestureBindings}>
            <ART.Surface
              width={WINDOW_WIDTH}
              height={MB_CONTROL_HEIGHT}
              viewBox={viewBox}
              preserveAspectRatio="XMidYMid meet"
            >
              <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
                <CenterButton  />
                {this.state.open && <MoodButtons />}
              </ART.Group>
            </ART.Surface></View>
        </SafeAreaView>
      </View>
    );
  }
};

export default SymptomPallet;



const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },

  palletContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

});
