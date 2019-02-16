/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { findIndex } from 'lodash';

import {
  BGCOLOR,
} from '../../constants';

class SlidingScaleItem extends React.PureComponent {

  handlePress = () => {
    this.props.onPress(this.props.index);
  }

  render () {
    const { label, value, selected, width } = this.props;
    const Label = label;
    let child;
    switch (typeof label) {
    case 'string':
    case 'number':
      child = <Text style={selected ? [ styles.itemText, styles.itemTextSelected ] : styles.itemText}>{label}</Text>;
      break;
    case 'undefined':
      child = <Text style={selected ? [ styles.itemText, styles.itemTextSelected ] : styles.itemText}>{value}</Text>;
      break;
    case 'function':
    case 'object':
      child = React.isValidElement(label) ? label : <Label {...this.props} />;
      break;
    default:
      child = (
        <Text style={selected ? [ styles.itemText, styles.itemTextSelected ] : styles.itemText}>
          [UNSUPPORTED]
        </Text>
      );
    }

    return (
      <TouchableOpacity
        style={[ styles.itemWrapper, { width } ]}
        onPress={this.handlePress}
      >
        {child}
      </TouchableOpacity>
    );
  }
}


export default class SlidingScale extends React.Component {

  constructor (props) {
    super(props);

    this.itemWidth = this.props.itemWidth || 50;

    if (!this.props.options || this.props.options.length < 2) throw new Error('Sliding Scale needs at least two items');

    let selectedIndex = -1;
    if (this.props.selectedIndex !== undefined) {
      selectedIndex = this.props.selectedIndex;
    } else if (this.props.value !== undefined) {
      selectedIndex = findIndex(this.props.options, (o) => (o[0] === this.props.value));
    }

    this.state = {
      selectedIndex,
      width: this.props.width || (this.props.style && this.props.style.width) || 100,
      height: 46,
    };

    this.firstRender = true;
  }

  static getDerivedStateFromProps (props, state) {
    let selectedIndex = -1;
    if (props.selectedIndex !== undefined) {
      selectedIndex = props.selectedIndex;
    } else if (props.value !== undefined) {
      selectedIndex = findIndex(props.options, (o) => (o[0] === props.value));
    }

    state.selectedIndex = selectedIndex;

    return state;
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer);
  }

  render () {
    const pad = (this.state.width - this.itemWidth) / 2;

    const highlightStyle = {
      position: 'absolute',
      top: 0,
      height: this.state.height,
      left: pad,
      right: pad,
      borderLeftColor: BGCOLOR[8],
      borderRightColor: BGCOLOR[8],
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
    };

    const scrollIndex = this.state.selectedIndex > -1 ? this.state.selectedIndex : this.defaultIndex;
    const x = this.itemWidth * scrollIndex;

    if (this.firstRender) {
      this.firstRender = false;
      setTimeout(() => this.scrollToIndex(scrollIndex, false), 10);
    }

    return (
      <View style={[ { height: this.state.height }, styles.container, this.props.style ]} onLayout={this._onLayout}>
        <View style={highlightStyle} />
        <ScrollView
          ref={(sview) => { this.sview = sview; }}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}
          snapToInterval={this.itemWidth}
          decelerationRate="fast"
          contentOffset={this.firstRender ? { x, y: 0 } : undefined}
        >
          <View style={{ width: pad, flex: 1 }} />
          {this.props.options.map(([ value, label, control ], index) => (
            <SlidingScaleItem
              key={`item-${index}`}
              label={control || label}
              value={value}
              index={index}
              selected={index === this.state.selectedIndex}
              onPress={this._onItemPress}
              width={this.itemWidth}
            />
          ))}
          <View style={{ width: pad, flex: 1 }} />
        </ScrollView>
        <View style={styles.leftCap1} pointerEvents="none" />
        <View style={styles.leftCap2} pointerEvents="none" />
        <View style={styles.leftCap3} pointerEvents="none" />
        <View style={styles.rightCap1} pointerEvents="none" />
        <View style={styles.rightCap2} pointerEvents="none" />
        <View style={styles.rightCap3} pointerEvents="none" />
        {this.props.nullable && this.state.selectedIndex > -1 && (
          <TouchableOpacity style={styles.clearButton} onPress={this._onClear}>
            <MaterialCommunityIcons name="window-close" size={26} color={BGCOLOR[10]} style={styles.clearButtonIcon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  scrollToIndex (selectedIndex, animated) {
    if (animated !== false) animated = true;
    this.isScrollTo = true;
    const x = this.itemWidth * selectedIndex;
    this.sview.scrollTo({ x, animated });
  }

  _onItemPress = (selectedIndex) => {
    if (!this.props.onChange) return;

    this.setState({ selectedIndex });
    this.scrollToIndex(selectedIndex);

    const selectedValue = this.props.options[selectedIndex];
    this.props.onChange(this.props.name, selectedValue, selectedIndex);
  }

  _onLayout = (ev) => {
    var { width } = ev.nativeEvent.layout;
    this.setState({ width });
  }

  _onMomentumScrollBegin = (/* ev */) => {
    console.log('_onMomentumScrollBegin');
    this.momentumStarted = true;
    if (this.timer) clearTimeout(this.timer);
  }

  _onMomentumScrollEnd = (ev) => {
    console.log('_onMomentumScrollEnd');
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(ev);
    }
    this.isScrollTo = false;
  }

  _onScrollBeginDrag = (/* ev */) => {
    console.log('_onScrollBeginDrag');
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) clearTimeout(this.timer);
  }

  _onScrollEndDrag = (ev) => {
    console.log('_onScrollEndDrag');
    this.dragStarted = false;
    // if not used, event will be garbaged
    const _e = {
      nativeEvent: {
        contentOffset: {
          y: ev.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        if (!this.momentumStarted && !this.dragStarted) {
          this._scrollFix(_e, 'timeout');
        }
      },
      10
    );
  }

  _scrollFix (e) {
    console.log('_scrollFix');

    let x = 0;
    const w = this.itemWidth;
    if (e.nativeEvent.contentOffset) {
      x = e.nativeEvent.contentOffset.x;
    }
    const selectedIndex = Math.round(x / w);
    const _x = selectedIndex * w;
    if (_x !== x) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      // this.sview.scrollTo({ x: _x });
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    // onChange
    if (this.props.onChange) {
      const selectedValue = this.props.options[selectedIndex];
      this.setState({
        selectedIndex,
      });
      this.props.onChange(this.props.valueKey, selectedValue, selectedIndex);
    }
  }

  _onClear = () => {
    this.setState({
      selectedIndex: -1,
    });
    this.props.onChange(this.props.valueKey, null, -1);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BGCOLOR[0],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BGCOLOR[2],
    borderRadius: 23,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginVertical: 5,
  },

  leftCap1: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: BGCOLOR[0],
    opacity: 0.9,
  },

  leftCap2: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: BGCOLOR[0],
    opacity: 0.7,
  },

  leftCap3: {
    position: 'absolute',
    left: 40,
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: BGCOLOR[0],
    opacity: 0.5,
  },

  rightCap3: {
    position: 'absolute',
    right: 40,
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: BGCOLOR[0],
    opacity: 0.7,
  },

  rightCap2: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: BGCOLOR[0],
    opacity: 0.7,
  },

  rightCap1: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: BGCOLOR[0],
    opacity: 0.9,
  },

  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: BGCOLOR[6],
  },
  itemTextSelected: {
    color: '#FFF',
  },

  clearButton: {
    backgroundColor: BGCOLOR[0],
    position: 'absolute',
    top: 4,
    right: 4,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: BGCOLOR[10],
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  clearButtonIcon: {
    padding: 0,
    margin: 0,
    marginTop: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
