/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BGCOLOR,
} from '../../constants';

class TemperatureItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPress(this.props.index);
  }

  render () {
    const { value, index, isSelected, renderItem, width } = this.props;
    const item = renderItem && renderItem(value, index, isSelected)
      || <Text style={isSelected ? [ styles.itemText, styles.itemTextSelected ] : styles.itemText}>{value}</Text>;

    return (
      <TouchableOpacity
        style={[ styles.itemWrapper, { width } ]}
        onPress={this._onPress}
      >
        {item}
      </TouchableOpacity>
    );
  }

}

export default class Temperature extends React.PureComponent {

  constructor (props) {
    super(props);

    this.itemWidth = this.props.itemWidth || 50;

    let selectedIndex = -1;
    const defaultValue = this.props.defaultValue || '98.6';
    const value = this.props.value;

    this.values = [];
    // range 95.0 to 106.0 and hope that if they're going to those extremes that they seek medical help
    for (let i = 960; i < 1060; i += 2) {
      // why do it like this instead of using Number.toFixed? Because floats suck.
      const whole = Math.floor(i / 10);
      const decimal = i - (whole * 10);
      const v = `${whole}.${decimal}`;
      this.values.push(v);
      if (v === value) selectedIndex = this.values.length - 1;
      if (v === defaultValue) this.defaultIndex = this.values.length - 1;
    }

    this.state = {
      selectedIndex,
      width: this.props.width || (this.props.style && this.props.style.width) || 100,
      height: 46,
    };

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
          contentOffset={{ x, y: 0 }}
        >
          <View style={{ width: pad, flex: 1 }} />
          {this.values.map((data, index) => this._renderItem(data, index, this.state.selectedIndex))}
          <View style={{ width: pad, flex: 1 }} />
        </ScrollView>
        <View style={styles.leftCap1} pointerEvents="none" />
        <View style={styles.leftCap2} pointerEvents="none" />
        <View style={styles.leftCap3} pointerEvents="none" />
        <View style={styles.rightCap1} pointerEvents="none" />
        <View style={styles.rightCap2} pointerEvents="none" />
        <View style={styles.rightCap3} pointerEvents="none" />
        {this.state.selectedIndex > -1 && <TouchableOpacity style={styles.clearButton} onPress={this._onClear}>
          <MaterialCommunityIcons name="window-close" size={26} color={BGCOLOR[10]} style={styles.clearButtonIcon} />
        </TouchableOpacity>}
      </View>
    );
  }

  scrollToIndex (selectedIndex, animated) {
    if (animated !== false) animated = true;
    const x = this.itemWidth * selectedIndex;
    this.sview.scrollTo({ x, animated });
  }

  getSelected () {
    const selectedIndex = this.state.selectedIndex;
    const selectedValue = this.values[selectedIndex];
    return selectedValue;
  }

  _onItemPress = (selectedIndex) => {
    if (!this.props.onChange) return;

    this.setState({ selectedIndex });
    this.scrollToIndex(selectedIndex);

    const selectedValue = this.values[selectedIndex];
    this.props.onChange(this.props.name, selectedValue, selectedIndex);
  }

  _renderItem = (data, index, selectedIndex) => (
    <TemperatureItem
      key={`item-${index}`}
      value={data}
      index={index}
      isSelected={index === selectedIndex}
      onPress={this._onItemPress}
      width={this.itemWidth}
    />
  );

  _onLayout = (ev) => {
    var { width } = ev.nativeEvent.layout;
    this.setState({ width });
  }

  _onMomentumScrollBegin = (/* ev */) => {
    this.momentumStarted = true;
    if (this.timer) clearTimeout(this.timer);
  }

  _onMomentumScrollEnd = (ev) => {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this._scrollFix(ev);
    }
  }

  _onScrollBeginDrag = (/* ev */) => {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) clearTimeout(this.timer);
  }

  _onScrollEndDrag = (ev) => {
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
      const selectedValue = this.values[selectedIndex];
      this.setState({
        selectedIndex,
      });
      this.props.onChange(this.props.name, selectedValue, selectedIndex);
    }
  }

  _onClear = () => {
    this.setState({
      selectedIndex: -1,
    });
    this.props.onChange(this.props.name, null, -1);
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
