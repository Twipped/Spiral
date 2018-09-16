/* eslint new-cap:0 */

import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ART } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { get } from 'lodash';
import { Map, Set } from 'immutable';

import pathfinder from '../../lib/pathfinder';
import Arcs from './Arcs';
import MoodMenu from './MoodMenu';
import ThumbButton from './ThumbButton';

import {
  MB_MOODS,
  MB_MOOD_MAP,
  MB_CONTROL_HEIGHT,
  MB_PRESS_DURATION,
  MB_BUTTON_RADIUS,
} from '../../constants';



class MBPallet extends React.Component {

  constructor () {
    super();

    this.state = {
      open: false,
      lastPressDown: null,
      pressedTarget: null,
      currentTab: 'tab/Anger',
      moods: Set(),
      symptoms: Map(),
      note: '',
      marker: '',
    };
  }

  lastPressDown = false;

  dimensions () {
    const dimensions = Dimensions.get('window');
    const WINDOW_WIDTH = dimensions.width;
    const WINDOW_HEIGHT = dimensions.height;

    const CONTROL_WIDTH  = WINDOW_WIDTH;
    const CONTROL_HEIGHT = MB_CONTROL_HEIGHT;
    const CONTROL_CENTER_X = CONTROL_WIDTH / 2;
    const CONTROL_CENTER_Y = CONTROL_HEIGHT - MB_BUTTON_RADIUS;

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
    // onStartShouldSetResponder: () => true,
    onStartShouldSetResponderCapture: (ev) => {
      const node = ReactNativeComponentTree.getInstanceFromNode(ev.target);
      if (node.type !== 'ARTSurfaceView') return false;

      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      return !!match;
    },
    onMoveShouldSetResponder: () => this.state.open,
    // onMoveShouldSetResponderCapture: () => true,
    onResponderTerminationRequest: () => true,
    onResponderGrant: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      // console.log('pressIn', x, y, match && match.nodeName);

      this.setState({ pressedTarget: match.nodeName });

      if (match.nodeName === 'centerButton') {
        if (this.state.open) {
          this.lastPressDown = false;
          return;
        }

        this.setState({
          open: true,
        });
        this.lastPressDown = Date.now();
        return;
      }

    },
    onResponderMove: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      // console.log('move', x, y, match && match.nodeName);
      if (this.state.pressedTarget !== match.nodeName) {
        this.setState({ pressedTarget: match.nodeName });
      }
    },
    onResponderRelease: (ev) => {
      const [ x, y ] = this.evToXY(ev);
      const match = pathfinder(x, y, this.currentPaths);
      // console.log('pressOut', x, y, match && match.nodeName);

      const newState = { pressedTarget: null };

      if (match.nodeName === 'centerButton') {
        if (!this.lastPressDown || Date.now() - this.lastPressDown > MB_PRESS_DURATION) {
          newState.open = false;
        }
        this.lastPressDown = false;
        return this.setState(newState);
      }

      this.handlePress(match.nodeName);
      return this.setState(newState);
    },

  }

  handlePress (buttonName) {
    if (!buttonName || buttonName === 'centerButton') return;
    this.setState({ currentTab: buttonName });
  }

  render () {
    this.currentPaths = [];
    const registerShape = (shape) => { this.currentPaths.push(shape); };
    const toggleMood = (key) => {
      const isSet = this.state.moods.has(key);
      const state = isSet ? this.state.moods.delete(key) : this.state.moods.add(key);
      this.setState({ moods: state });
    };

    const { style, children } = this.props;
    const dimensions = this.dimensions();
    const {
      WINDOW_WIDTH,
      WINDOW_HEIGHT,
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

    const tabName = this.state.currentTab.split('/')[1];
    let tabbedComponent = null;

    if (this.state.open) {
      switch (tabName) {
      case 'Anger':
      case 'Anxiety':
      case 'Joy':
      case 'Sadness':
        tabbedComponent = (
          <MoodMenu
            activeEmotions={this.state.moods}
            mood={MB_MOODS[MB_MOOD_MAP[tabName]]}
            toggleMood={toggleMood}
          />
        );
        break;

      default:
        tabbedComponent = null;
      }
    }

    return (
      <View style={style} {...this.gestureBindings} >
        <SafeAreaView style={styles.palletContent} forceInset={{ bottom: 'always', top: 'never' }}>
          <View style={{ position: 'absolute', width: WINDOW_WIDTH, height: WINDOW_HEIGHT }} >{children}</View>
          {this.state.open && <View style={[ styles.overlay, { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } ]} />}
          <View style={{ zIndex: 150 }}>
            {tabbedComponent}
            <ART.Surface
              width={WINDOW_WIDTH}
              height={MB_CONTROL_HEIGHT}
              viewBox={viewBox}
              preserveAspectRatio="XMidYMid meet"
            >
              <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
                <ThumbButton isActive={this.state.open} {...props} />
                {this.state.open && <Arcs {...props} />}
              </ART.Group>
            </ART.Surface>
          </View>
        </SafeAreaView>
      </View>
    );
  }
};

export default MBPallet;



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
