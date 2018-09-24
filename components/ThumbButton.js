
import React from 'react';
import { SafeAreaView, Dimensions, ART } from 'react-native';
import { observer } from 'mobx-react/native';
import { BrainIcon } from '../Icons';

import {
  MB_BUTTON_RADIUS,
  MB_ARCH_SPACING,
  MB_BUTTON_PRESSED_PROPS,
  MB_BUTTON_ACTIVE_PROPS,
  MB_BUTTON_INACTIVE_PROPS,
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

@observer
class ThumbButton extends React.Component {

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
      if (this.props.isActive.get() && this.props.onPressActive) this.props.onPressActive();
      if (!this.props.isActive.get() && this.props.onPressInactive) this.props.onPressInactive();
    },

  }

  render () {
    const isActive = this.props.isActive.get();
    let BUTTON_PROPS;
    if (this.state.pressed) {
      BUTTON_PROPS = MB_BUTTON_PRESSED_PROPS;
    } else if (isActive) {
      BUTTON_PROPS = MB_BUTTON_ACTIVE_PROPS;
    } else {
      BUTTON_PROPS = MB_BUTTON_INACTIVE_PROPS;
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
            {!isActive && <Rect fill={BUTTON_PROPS.stroke} x={-3}  y={-20} width={6}  height={40} />}
            {!isActive && <Rect fill={BUTTON_PROPS.stroke} x={-20} y={-3}  width={40} height={6} />}
          </ART.Group>
        </ART.Surface>
        {isActive && <BrainIcon width={60} color={BUTTON_PROPS.stroke} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />}
      </SafeAreaView>
    );
  }
}

export default ThumbButton;
