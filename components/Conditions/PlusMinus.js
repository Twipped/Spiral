/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { material } from 'react-native-typography';

import {
  BRAND_COLOR_LIGHT,
  BGCOLOR_1,
  BGCOLOR_2,
  BGCOLOR_3,
} from '../../constants';

class Option extends React.PureComponent {

  handlePress = () => {
    if (this.props.onPress) this.props.onPress(this.props.value);
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

  render () {

    return (
      <View style={styles.container}>
        {this.props.options.map(([ v, label ], index) => <Option key={'option-' + index} label={label} value={v} selected={this.props.value} />)}
      </View>
    );
  }
}

const styles = {

  container: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: BGCOLOR_1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BGCOLOR_2,
    borderRadius: 27.5,
  },

  optionTouchable: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 28,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionTouchableActive: {
    flex: 1,
    backgroundColor: BGCOLOR_3,
    borderRadius: 28,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.31,
    shadowRadius: 10,
    shadowColor: BGCOLOR_1,
  },

  optionLabel: {
    ...StyleSheet.flatten(material.button),
    color: BRAND_COLOR_LIGHT,
  },
};
