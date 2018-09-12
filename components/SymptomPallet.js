
import React from 'react';
import { TouchableWithoutFeedback, View, Image, StyleSheet, Dimensions, SafeAreaView, Animated } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree'
import buttonImg from '../graphics/button.png';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { d3 } from 'd3'
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
    Symbol,
    Text,
} from 'react-native-svg';

const PRESS_DURATION = 500;
const state = observable({
  visible: true,
  lastPressDown: null,
});

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

const TouchableWithoutFeedbackWrapper = (p) => {
  const { onPress, onPressIn, onPressOut, testID, accessibilityLabel, ...props } = p;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <View {...props} />
    </TouchableWithoutFeedback>
  );
};

const onPalletButtonPress = () => {
  state.visible = false;
};

function flattenPoints (points) {
  return (points || [])
    .map((p) => (p
      .map((n) => (
        n >= 1
          ? Math.ceil(n)
          : Math.floor(n)
      )))
      .join(',')
    )
    .join(' ');
}

const MoodBar = (props) => {
  const WIDTH = Math.round((props.width - 10) / 2) * 2;
  const HEIGHT = props.height;
  const INACTIVE_STROKE = 2;
  const ACTIVE_STROKE = 4;
  const STROKE = Math.max( ACTIVE_STROKE, INACTIVE_STROKE );
  const HALFWIDTH = WIDTH / 2;
  const CENTER_HEIGHT = 86;
  const INACTIVE_STROKE_COLOR = 'white';
  const ACTIVE_STROKE_ACTIVE = 'purple';

  const viewBox = [
    0,
    0,
    WIDTH,
    HEIGHT,
  ].join(' ');

  const P = {
    Anger: [
      [ 0 -  HALFWIDTH + STROKE, STROKE ],
      [ 0 - (HALFWIDTH * 0.80), STROKE ],
      [ 0 - (HALFWIDTH * 0.30), HEIGHT - STROKE ],
      [ 0 -  HALFWIDTH + STROKE, HEIGHT - STROKE ],
    ],
    Anxiety: [
      [ 0 - (HALFWIDTH * 0.80), STROKE ],
      [ 0 - (HALFWIDTH * 0.30), STROKE ],
      [ 0,                               CENTER_HEIGHT ],
      [ 0 - (HALFWIDTH * 0.10), HEIGHT - STROKE ],
      [ 0 - (HALFWIDTH * 0.30), HEIGHT - STROKE ],
    ],
    Neutral: [
      [ 0 - (HALFWIDTH * 0.30), STROKE ],
      [     (HALFWIDTH * 0.30), STROKE ],
      [ 0,                               CENTER_HEIGHT ],
    ],
    Joy: [
      [     (HALFWIDTH * 0.80), STROKE ],
      [     (HALFWIDTH * 0.30), STROKE ],
      [ 0,                               CENTER_HEIGHT ],
      [     (HALFWIDTH * 0.10), HEIGHT - STROKE ],
      [     (HALFWIDTH * 0.30), HEIGHT - STROKE ],
    ],
    Sadness: [
      [      HALFWIDTH - STROKE, STROKE ],
      [     (HALFWIDTH * 0.80), STROKE ],
      [     (HALFWIDTH * 0.30), HEIGHT - STROKE ],
      [      HALFWIDTH - STROKE, HEIGHT - STROKE ],
    ],
  };

  return (
    <Svg width={WIDTH} height={HEIGHT} viewBox={viewBox} preserveAspectRatio="XMidYMin slice" style={props.style}>
      <G x={HALFWIDTH} y={0}>
        <Polygon
          points={flattenPoints(P.Anger)}
          fill="red"
          stroke={INACTIVE_STROKE_COLOR}
          strokeWidth="2"
        />
        <Polygon
          points={flattenPoints(P.Anxiety)}
          fill="orange"
          stroke={INACTIVE_STROKE_COLOR}
          strokeWidth="2"
        />
        <Polygon
          points={flattenPoints(P.Neutral)}
          fill="yellow"
          stroke={INACTIVE_STROKE_COLOR}
          strokeWidth="2"
        />
        <Polygon
          points={flattenPoints(P.Joy)}
          fill="green"
          stroke={INACTIVE_STROKE_COLOR}
          strokeWidth="2"
        />
        <Polygon
          points={flattenPoints(P.Sadness)}
          fill="blue"
          stroke={INACTIVE_STROKE_COLOR}
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
};

@observer
class SymptomPallet extends React.Component {

  render () {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;

    if (!state.visible) return null;

    return (
      <View style={[ styles.overlay, { width: windowWidth, height: windowHeight } ]}>
        <SafeAreaView style={styles.palletContent}>
          <MoodBar
            width={windowWidth}
            height={130}
            style={{ marginBottom: -iconSize }}
          />
          <TouchableWithoutFeedbackWrapper onPress={onPalletButtonPress}>
            <Image source={buttonImg} style={styles.palletButton} />
          </TouchableWithoutFeedbackWrapper>
        </SafeAreaView>
      </View>
    );
  }
};

const SymptomButton = () => (
  <View
    style={styles.buttonWrapper}
  >
    <Image source={buttonImg} style={styles.button} isPalletButton />
  </View>
);

export {
  SymptomPallet,
  SymptomButton,
  GestureBindings,
};

const TABBAR_DEFAULT_HEIGHT = 49;
const iconSize = Math.round(TABBAR_DEFAULT_HEIGHT * 1.8);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },

  palletContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  palletButton: {
    width: iconSize,
    height: iconSize,
  },

  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 0,
    zIndex: 101,
  },

  button: {
    bottom: iconSize - TABBAR_DEFAULT_HEIGHT,
    width: iconSize,
    height: iconSize,
  },
});
