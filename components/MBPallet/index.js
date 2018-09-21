/* eslint new-cap:0 */

import React from 'react';
import { View, Dimensions, ART } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';

import pathfinder from '../../lib/pathfinder';
import Arcs from './Arcs';

import {
  MB_ARCH_SPACING,
} from '../../constants';

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
    const dimensions = Dimensions.get('window');
    const WINDOW_WIDTH = dimensions.width;
    const WINDOW_HEIGHT = dimensions.height;

    const CONTROL_WIDTH  = WINDOW_WIDTH;
    const CONTROL_HEIGHT = (CONTROL_WIDTH / 2);
    const CONTROL_CENTER_X = CONTROL_WIDTH / 2;
    const CONTROL_CENTER_Y = CONTROL_HEIGHT;

    return {
      WINDOW_WIDTH,
      WINDOW_HEIGHT,
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

  currentPaths = {};

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

    const { style, children } = this.props;
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

    return (
      <View style={{ ...styles.palletContent, ...style }} {...this.gestureBindings} >
        {children}
        <ART.Surface
          width={CONTROL_WIDTH}
          height={CONTROL_HEIGHT}
          viewBox={viewBox}
          preserveAspectRatio="XMidYMid meet"
        >
          <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
            <Arcs {...props} />
          </ART.Group>
        </ART.Surface>
      </View>
    );
  }
};

export default MBPallet;



const styles = {
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
    backgroundColor: '#000',
  },

};
