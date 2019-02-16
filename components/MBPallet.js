/* eslint new-cap:0 */

import React from 'react';
import { View, Dimensions, ART, StyleSheet, TouchableOpacity, Text, Animated, Keyboard } from 'react-native';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import * as d3 from 'd3-shape';
import Color from 'color';
import { HikingIcon, MedicineIcon, NoteIcon, SexIcon } from '../Icons';
import pathfinder from '../lib/pathfinder';
import Circle from './shapes/Circle';

import {
  MB_BUTTON_RADIUS,
  MB_MAX_BUTTON_STROKE,
  MB_MOODS,
  MB_ARC_LENGTH_FACTOR,
  MB_INNER_ARC_PADDING,
  MB_MOOD_INACTIVE_PROPS,
  MB_MOOD_ACTIVE_PROPS,
  MB_MOOD_PRESSED_PROPS,
  MB_ARC_SIDEBUTTON_WIDTH,
  BGCOLOR_2,
} from '../constants';

const MAX_STROKE = Math.max(
  MB_MOOD_PRESSED_PROPS.strokeWidth,
  MB_MOOD_ACTIVE_PROPS.strokeWidth,
  MB_MOOD_INACTIVE_PROPS.strokeWidth
);

function SmartText (props) {
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
  const ARC_INNER_RADIUS = MB_BUTTON_RADIUS;
  const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + ARC_THICKNESS;
  const ARC_LENGTH = 2 * MB_ARC_LENGTH_FACTOR;
  const ARC_START_ANGLE = ((((2 - ARC_LENGTH) / 2) - 1) * Math.PI);
  const ARC_TEXT_Y = (-ARC_THICKNESS / 2) + 2;

  const counts = props.counts;

  const arcInactive = d3.arc()
    .innerRadius(ARC_INNER_RADIUS)
    .outerRadius(ARC_OUTER_RADIUS)
    .cornerRadius(3)
  ;
  const arcActive = d3.arc()
    .innerRadius(ARC_INNER_RADIUS + MAX_STROKE - 1)
    .outerRadius(ARC_OUTER_RADIUS)
    .cornerRadius(3)
  ;

  const pie = d3.pie()
    .startAngle(ARC_START_ANGLE)
    .endAngle(-ARC_START_ANGLE)
    .padAngle(MB_INNER_ARC_PADDING)
    .sort(null)
  ;

  const moods = Object.values(MB_MOODS).map((m) => (m.factor || 1));

  return pie(moods)
    .map((slice, i) => {
      const moodName = Object.keys(MB_MOODS)[i];
      const mood = MB_MOODS[moodName];
      const key = 'tab/' + moodName;
      const count = counts[moodName];

      let pathProps;
      let arc;
      if (props.pressedTarget === moodName) {
        const c = Color(mood.fillColor).alpha(0.5).hsl().toString();
        arc = arcInactive;
        pathProps = { fill: c, stroke: c, ...MB_MOOD_PRESSED_PROPS };
      } else if (props.currentTarget === moodName) {
        arc = arcActive;
        pathProps = { fill: mood.fillColor, stroke: mood.fillColor, ...MB_MOOD_ACTIVE_PROPS };
      } else {
        arc = props.currentTarget === 'Mind' ? arcActive : arcInactive;
        pathProps = { fill: mood.fillColor, stroke: mood.fillColor, ...MB_MOOD_INACTIVE_PROPS };
      }
      pathProps.d = arc(slice);

      const countColor = Color(mood.fillColor).darken(0.4).hsl().toString();

      const angle = (slice.startAngle + slice.endAngle) / 2;
      const [ textX, textY ] = arcInactive.centroid(slice);

      props.registerShape({ nodeName: moodName, nodeType: 'path', ...pathProps });

      const transform = ART.Transform()
        .rotate((angle * 180 / Math.PI));

      return (
        <ART.Group key={key}>
          <ART.Shape {...pathProps} />
          <ART.Group x={textX} y={textY} transform={transform}>
            <SmartText x={0} y={ARC_TEXT_Y} alignment="center" style={styles.arcText} fill={mood.textColor} >{mood.name}</SmartText>
            {count && <Circle x={0} y={(ARC_THICKNESS / 2) - 15} r={5} fill={countColor} />}
          </ART.Group>
        </ART.Group>
      );
    })
  ;
}

class IconButton extends React.PureComponent {
  onPress = () => {
    if (this.props.onPress) this.props.onPress(this.props.tab);
  }

  render () {
    const { tab, currentTab, Icon } = this.props;
    const style = { ...styles.iconButton, ...this.props.style };
    const selected = tab === currentTab;

    if (selected) {
      style.backgroundColor = '#FFF';
    } else if (!Icon) {
      style.backgroundColor = BGCOLOR_2;
    }

    const color = selected ? '#000' : '#FFF';
    const textStyle = { ...styles.iconButtonText, color };

    return (
      <TouchableOpacity style={style} onPress={this.onPress}>
        {Icon ? <Icon width={MB_ARC_SIDEBUTTON_WIDTH} color={color} /> : <Text style={textStyle}>{tab}</Text>}
      </TouchableOpacity>
    );
  }
}

@observer
class MBPallet extends React.Component {

  constructor () {
    super();

    this.state = {
      pressedTarget: null,
    };


    const { CONTROL_HEIGHT } = this.dimensions();
    this.keyboardHeight = new Animated.Value(CONTROL_HEIGHT);
  }

  componentWillMount () {
    this._keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this._keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this._keyboardWillShowSub.remove();
    this._keyboardWillHideSub.remove();
  }

  _keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
    }).start();
  };

  _keyboardWillHide = (event) => {
    const { CONTROL_HEIGHT } = this.dimensions();
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: CONTROL_HEIGHT,
    }).start();
  };

  lastPressDown = false;

  dimensions () {
    const Window = Dimensions.get('window');

    const CONTROL_HEIGHT = Math.max(
      MB_BUTTON_RADIUS * 2.5,
      (Window.width / 2) - MB_BUTTON_RADIUS - MB_ARC_SIDEBUTTON_WIDTH
    );
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
    onStartShouldSetResponder: (ev) => {
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

  handlePress = (buttonName) => {
    if (this.props.onTabSwitch && buttonName) this.props.onTabSwitch(buttonName);
  }

  render () {
    this.currentPaths = [];
    const registerShape = (shape) => { this.currentPaths.push(shape); };

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
      currentTarget: this.props.currentTab,
      pressedTarget: this.state.pressedTarget,
      ...dimensions,
    };

    props.INNER_ARC_THICKNESS = (
      CONTROL_HEIGHT - MB_BUTTON_RADIUS - MAX_STROKE
    );

    return (
      <Animated.View style={[ styles.palletContent, this.props.style, { minHeight: this.keyboardHeight } ]}>
        <View style={styles.iconColumn}>
          <IconButton tab="Activities" currentTab={this.props.currentTab} Icon={HikingIcon} onPress={this.handlePress} />
          <IconButton tab="Medications" currentTab={this.props.currentTab} Icon={MedicineIcon} onPress={this.handlePress} />
        </View>
        <View>
          <View {...this.gestureBindings}><ART.Surface
            width={CONTROL_WIDTH}
            height={CONTROL_HEIGHT}
            viewBox={viewBox}
            preserveAspectRatio="XMidYMid meet"
          >
            <ART.Group x={CONTROL_CENTER_X} y={CONTROL_CENTER_Y}>
              <InnerArcs {...props} counts={this.props.entry.tabCounts} />
            </ART.Group>
          </ART.Surface></View>
          <View style={styles.underRow}>
            <IconButton tab="Mind" currentTab={this.props.currentTab} onPress={this.handlePress} style={{ paddingRight: MB_BUTTON_RADIUS }} />
            <IconButton tab="Body" currentTab={this.props.currentTab} onPress={this.handlePress} style={{ paddingLeft: MB_BUTTON_RADIUS }} />
          </View>
        </View>
        <View style={styles.iconColumn}>
          <IconButton tab="Sex" currentTab={this.props.currentTab} Icon={SexIcon} onPress={this.handlePress} />
          <IconButton tab="Notes" currentTab={this.props.currentTab} Icon={NoteIcon} onPress={this.handlePress} />
        </View>
      </Animated.View>
    );
  }
};

export default MBPallet;

const styles = {

  palletContent: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'flex-end',
  },

  underRow: {
    height: MB_BUTTON_RADIUS,
    marginHorizontal: MB_MAX_BUTTON_STROKE,
    marginTop: MB_MAX_BUTTON_STROKE / 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  iconColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'stretch',
    paddingBottom: 4,
    paddingHorizontal: 4,
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
    borderRadius: 5,
  },

  iconButtonText: {
    ...StyleSheet.flatten(material.body2),
  },

  arcText: {
    ...StyleSheet.flatten(material.body2),
    fill: '#111',
  },

  arcCount: {
    ...StyleSheet.flatten(material.display2),
  },

};
