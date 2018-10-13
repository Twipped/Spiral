
import React from 'react';
import { SafeAreaView, Dimensions, ART } from 'react-native';
import { BrainIcon } from '../Icons';

import {
  BRAND_COLOR_DARK,
  BRAND_COLOR_LIGHT,
  MB_BUTTON_RADIUS,
  MB_ARCH_SPACING,
} from '../constants';

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

class ThumbButton extends React.PureComponent {

  constructor () {
    super();
    this.state = {
      pressed: false,
    };
  }

  onPressIn = () => {
    this.setState({ pressed: true });
  }

  onPressOut = () => {
    this.setState({ pressed: false });
  }

  gestureBindings = {
    // onStartShouldSetResponder: () => true,
    onStartShouldSetResponderCapture: (ev) => {
      const [ x, y ] = [ ev.nativeEvent.locationX, ev.nativeEvent.locationY ];
      const CONTROL_WIDTH  = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
      const CONTROL_HEIGHT = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;

      return x > 0 && x < CONTROL_WIDTH && y > 0 && y < CONTROL_HEIGHT;
    },
    onMoveShouldSetResponder: () => true,
    onResponderTerminationRequest: () => true,
    onResponderGrant: () => {
      this.setState({ pressed: true });
    },
    onResponderMove: (ev) => {
      const [ x, y ] = [ ev.nativeEvent.locationX, ev.nativeEvent.locationY ];
      const CONTROL_WIDTH  = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
      const CONTROL_HEIGHT = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
      this.setState({ pressed: x > 0 && x < CONTROL_WIDTH && y > 0 && y < CONTROL_HEIGHT });
    },
    onResponderRelease: (ev) => {
      const [ x, y ] = [ ev.nativeEvent.locationX, ev.nativeEvent.locationY ];
      const CONTROL_WIDTH  = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
      const CONTROL_HEIGHT = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;

      this.setState({ pressed: false });
      if (x < 0 || x > CONTROL_WIDTH || y < 0 || y > CONTROL_HEIGHT) return;
      if (this.props.onPress) this.props.onPress();
    },

  }

  render () {
    const BUTTON_PROPS = {
      fill: BRAND_COLOR_LIGHT,
      stroke: '#FFF',
      strokeWidth: 3,
      color: BRAND_COLOR_DARK,
    };
    if (this.state.pressed) {
      BUTTON_PROPS.fill = BRAND_COLOR_DARK;
    }
    if (this.props.editing) {
      BUTTON_PROPS.stroke = '#000';
      BUTTON_PROPS.color = '#000';
      if (this.props.selected) {
        BUTTON_PROPS.stroke = '#FFF';
      }
    }

    const Window = Dimensions.get('window');
    const CONTROL_WIDTH  = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
    const CONTROL_HEIGHT = (MB_BUTTON_RADIUS * 2) + MB_ARCH_SPACING;
    const CONTROL_CENTER_X = CONTROL_WIDTH / 2;
    const CONTROL_CENTER_Y = CONTROL_HEIGHT / 2;
    const CONTROL_LEFT = (Window.width / 2) - (CONTROL_WIDTH / 2);

    const viewBox = [
      0,
      0,
      CONTROL_WIDTH,
      CONTROL_HEIGHT,
    ].join(' ');

    const style = {
      position: 'absolute',
      left: CONTROL_LEFT,
      bottom: 0,
    };

    return (
      <SafeAreaView style={style} forceInset={{ bottom: 'always', top: 'never' }} {...this.gestureBindings}>
        <ART.Surface
          width={CONTROL_WIDTH}
          height={CONTROL_HEIGHT}
          viewBox={viewBox}
          preserveAspectRatio="XMidYMid meet"
          style={this.props.style}
        >
          <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
            <Circle cx={0} cy={0} r={MB_BUTTON_RADIUS} {...BUTTON_PROPS} />
            {!this.props.editing && <Rect fill={BUTTON_PROPS.stroke} x={-3}  y={-20} width={6}  height={40} />}
            {!this.props.editing && <Rect fill={BUTTON_PROPS.stroke} x={-20} y={-3}  width={40} height={6} />}
          </ART.Group>
        </ART.Surface>
        {this.props.editing && <BrainIcon width={MB_BUTTON_RADIUS * 1.5} color={BUTTON_PROPS.color} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: MB_BUTTON_RADIUS * 2 }} />}
      </SafeAreaView>
    );
  }
}

export default ThumbButton;
