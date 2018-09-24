/* eslint new-cap:0 */

import React from 'react';
import { View, Dimensions, ART, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react/native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { material } from 'react-native-typography';
import * as d3 from 'd3-shape';
import color from 'color';
import { HikingIcon, MedicineIcon, NoteIcon, MarkerIcon } from '../../Icons';
import Mediator from '../../lib/mediator';


import pathfinder from '../../lib/pathfinder';

import {
  MB_BUTTON_RADIUS,
  MB_MOODS,
  MB_ARCH_SPACING,
  MB_ARC_LENGTH_FACTOR,
  MB_INNER_ARC_PADDING,
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

  const textColor = fill || style.color || style.fill;

  return <ART.Text font={font} fill={textColor} alignment={alignment} {...rest} />;
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


@observer
class Arcs extends React.Component {

  constructor () {
    super();

    this.state = {
      pressedTarget: null,
      currentTab: null,
    };

    Mediator.on('CenterButtonPress', this.onCenterButton);
  }

  componentWillUnmount () {
    Mediator.off('CenterButtonPress', this.onCenterButton);
  }

  onCenterButton = () => {
    this.handlePress(null);
  }

  lastPressDown = false;

  dimensions () {
    const Window = Dimensions.get('window');

    const CONTROL_HEIGHT = MB_BUTTON_RADIUS * 2.5;
    const CONTROL_WIDTH  = CONTROL_HEIGHT * 2;
    const CONTROL_CENTER_X = CONTROL_WIDTH / 2;
    const CONTROL_CENTER_Y = CONTROL_HEIGHT;
    const CONTAINER_HEIGHT = CONTROL_HEIGHT;
    const CONTAINER_WIDTH = Window.width;

    return {
      CONTROL_WIDTH,
      CONTROL_HEIGHT,
      CONTROL_CENTER_X,
      CONTROL_CENTER_Y,
      CONTAINER_HEIGHT,
      CONTAINER_WIDTH,
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
    if (this.props.onTabSwitch) this.props.onTabSwitch(buttonName && buttonName.split('/')[1]);
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
      CONTAINER_HEIGHT,
      CONTAINER_WIDTH,
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

    const MAX_STROKE = Math.max(
      MB_MOOD_PRESSED_PROPS.strokeWidth,
      MB_MOOD_ACTIVE_PROPS.strokeWidth,
      MB_MOOD_INACTIVE_PROPS.strokeWidth
    );

    props.INNER_ARC_THICKNESS = (
      CONTROL_HEIGHT - MB_BUTTON_RADIUS - MB_ARCH_SPACING - MAX_STROKE
    );

    const IconButton = ({ tab, Icon }) => (
      <TouchableOpacity style={styles.iconButton} onPress={() => this.handlePress(tab)}><Icon width={40} color={this.state.currentTab === tab ? 'green' : '#FFF'} /></TouchableOpacity>
    );

    return (
      <View style={{ ...styles.palletContent, ...style, height: CONTAINER_HEIGHT, width: CONTAINER_WIDTH }} {...this.gestureBindings} >
        <View style={styles.iconColumn}>
          <IconButton tab="Activities" Icon={HikingIcon} />
          <IconButton tab="Marker" Icon={MarkerIcon} />
        </View>
        <ART.Surface
          width={CONTROL_WIDTH}
          height={CONTROL_HEIGHT}
          viewBox={viewBox}
          preserveAspectRatio="XMidYMid meet"
        >
          <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
            <InnerArcs {...props} counts={this.props.entry.moodCounts} />
          </ART.Group>
        </ART.Surface>
        <View style={styles.iconColumn}>
          <IconButton tab="Medications" Icon={MedicineIcon} />
          <IconButton tab="Notes" Icon={NoteIcon} />
        </View>
      </View>
    );
  }
};

export default Arcs;

const styles = {

  palletContent: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },

  iconColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'stretch',
  },

  iconButton: {
    flex: 1,
    flexDirection: 'row',
    flexShrink: 0,
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  arcText: {
    ...StyleSheet.flatten(material.body2),
    fill: '#111',
  },

  arcCount: {
    ...StyleSheet.flatten(material.display2),
  },

};
