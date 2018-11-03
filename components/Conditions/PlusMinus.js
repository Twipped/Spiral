/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { material } from 'react-native-typography';

import {
  BGCOLOR,
} from '../../constants';

class Option extends React.PureComponent {

  handlePress = () => {
    if (this.props.onPress) this.props.onPress(this.props.selected ? null : this.props.value);
  }

  render () {
    const { label, value, selected } = this.props;
    let child;
    switch (typeof label) {
    case 'string':
    case 'number':
      child = <Text style={styles.optionLabel}>{label}</Text>;
      break;
    case 'undefined':
      child = <Text style={styles.optionLabel}>{value}</Text>;
      break;
    case 'function':
    case 'object':
      child = label;
      break;
    default:
      child = <Text style={styles.optionLabel}>[UNSUPPORTED]</Text>;
    }

    return (
      <TouchableOpacity
        style={selected ? styles.optionTouchableActive : styles.optionTouchable}
        onPress={this.handlePress}
      >
        {child}
      </TouchableOpacity>
    );
  }
}

export default class PlusMinus extends React.PureComponent {

  handlePress = (value) => {
    if (!this.props.onChange) return;
    this.props.onChange(this.props.name, value);
  }

  render () {

    return (
      <View style={styles.container}>
        {this.props.options.map(([ v, label, control ], index) => <Option key={'option-' + index} label={control || label} value={v} selected={v === this.props.value} onPress={this.handlePress} />)}
      </View>
    );
  }
}

const styles = {

  container: {
    height: 46,
    flexDirection: 'row',
    backgroundColor: BGCOLOR[0],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BGCOLOR[3],
    borderRadius: 23,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  optionTouchable: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 23,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    paddingHorizontal: 5,
  },

  optionTouchableActive: {
    flex: 1,
    backgroundColor: BGCOLOR[4],
    borderRadius: 28,
    borderWidth: 1,
    borderColor: BGCOLOR[0],
    marginLeft: 0,
    marginRight: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.31,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: BGCOLOR[0],
    paddingHorizontal: 5,
  },

  optionLabel: {
    ...StyleSheet.flatten(material.button),
    color: 'white',
    textAlign: 'center',
  },
};
