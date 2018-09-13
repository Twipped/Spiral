
import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Animated } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree'
import * as d3 from 'd3-shape';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    TextPath,
    Text,
} from 'react-native-svg';

import {
  MB_CONTROL_HEIGHT,
  MB_PRESS_DURATION,
  MB_BUTTON_DIAMETER_FACTOR,
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

const GestureBindings = ({
  // onStartShouldSetResponder: () => true,
  onStartShouldSetResponderCapture: (ev) => {
    const { memoizedProps } = ReactNativeComponentTree.getInstanceFromNode(ev.target);
    return memoizedProps && !!memoizedProps.isPalletButton;
  },
  // onMoveShouldSetResponder: () => true,
  // onMoveShouldSetResponderCapture: () => true,
  onResponderTerminationRequest: () => true,
  onResponderGrant: () => {
    state.visible = true;
    state.lastPressDown = Date.now();
  },
  // onResponderMove: () => {
  //   console.log('move');
  // },
  onResponderRelease: () => {
    if (!state.lastPressDown || Date.now() - state.lastPressDown > PRESS_DURATION) {
      state.visible = false;
    }
    state.lastPressDown = false;
  },
});

class SymptomPallet extends React.Component {

  constructor () {
    super();

    this.state = {
      open: false,
      lastPressDown: null,
    };
  }

  render () {
    const TABBAR_DEFAULT_HEIGHT = 49;
    const { style, children } = this.props;
    const dimensions = Dimensions.get('window');
    const WINDOW_WIDTH = dimensions.width;
    const WINDOW_HEIGHT = dimensions.height;
    const BUTTON_RADIUS = TABBAR_DEFAULT_HEIGHT; // Math.ceil((WINDOW_WIDTH * MB_BUTTON_DIAMETER_FACTOR) / 2);
    const ARC_THICKNESS = BUTTON_RADIUS * MB_ARC_THICKNESS_FACTOR;
    const ARC_INNER_RADIUS = BUTTON_RADIUS + 5;
    const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
    const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
    const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
    const ARC_TEXT_Y = (-ARC_THICKNESS / 2) + 20;
    const CONTROL_CENTER_X = WINDOW_WIDTH / 2;
    const CONTROL_CENTER_Y = (MB_CONTROL_HEIGHT / 2) + TABBAR_DEFAULT_HEIGHT;
    const BUTTON_PROPS = this.state.show
      ? MB_BUTTON_ACTIVE_PROPS
      : MB_BUTTON_INACTIVE_PROPS;

    function CenterButton (props) {
      const topPathRadius = BUTTON_RADIUS - 18;
      const bottomPathRadius = BUTTON_RADIUS - 10;

      const upperCurve = `M${-topPathRadius},0 A${topPathRadius},${topPathRadius},9,1,1,${topPathRadius},0`;
      const lowerCurve = `M${-bottomPathRadius},0 A${-bottomPathRadius},${-bottomPathRadius},9,1,0,${bottomPathRadius},0`;

      return (
        <G>
          <Path d={upperCurve} id="BUTTON_UPPER_TEXT" />
          <Path d={lowerCurve} id="BUTTON_LOWER_TEXT" />
          <Circle r={BUTTON_RADIUS} {...BUTTON_PROPS} onPress={props.onButtonPress} />
          <Rect fill={BUTTON_PROPS.stroke} x={-3}  y={-20} width={6}  height={40} />
          <Rect fill={BUTTON_PROPS.stroke} x={-20} y={-3}  width={40} height={6} />
        </G>
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

          const transform = `rotate(${(angle * 180 / Math.PI)})`;

          return (<G key={'mood-' + mood.name}>
            <Path {...path} />
            <G x={textX} y={textY} >
              <Text
                y={ARC_TEXT_Y}
                fontSize={14}
                transform={transform}
                fontWeight="bold"
                fill="#111"
                textAnchor="middle"
              >{mood.name}</Text>
            </G>
          </G>);
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
          <View style={{ position: 'absolute', width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}>{children}</View>
          {this.state.open && <View style={[ styles.overlay, { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } ]} />}
          <Svg
            width={WINDOW_WIDTH}
            height={MB_CONTROL_HEIGHT}
            viewBox={viewBox}
            preserveAspectRatio="XMidYMid meet"
            style={{ zIndex: 150 }}
          >
            <G x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
              <CenterButton onButtonPress={() => { this.setState({ open: !this.state.open }); }} />
              {this.state.open && <MoodButtons />}
            </G>
          </Svg>
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
