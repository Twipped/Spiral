/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BGCOLOR_0,
  BGCOLOR_1,
  BGCOLOR_2,
  BGCOLOR_10,
} from '../../constants';

export default class Decimal extends React.PureComponent {

  render () {
    return (
      <View style={[ styles.container, this.props.style ]}>
        <TextInput
          style={styles.input}
          onChangeText={this._onChange}
          value={this.props.value || ''}
          keyboardType="decimal-pad"
          keyboardAppearance="light"
          placeholder="Tap To Enter"
          returnKeyType="done"
        />
        {this.props.value > -1 && <TouchableOpacity style={styles.clearButton} onPress={this._onClear}>
          <MaterialCommunityIcons name="window-close" size={26} color={BGCOLOR_10} style={styles.clearButtonIcon} />
        </TouchableOpacity>}
      </View>
    );
  }

  _onChange = (text) => {
    this.props.onChange(this.props.name, text);
  }

  _onClear = () => {
    this.props.onChange(this.props.name, null);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BGCOLOR_1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BGCOLOR_2,
    borderRadius: 23,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    height: 46,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },

  clearButton: {
    backgroundColor: BGCOLOR_0,
    position: 'absolute',
    top: 4,
    right: 4,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: BGCOLOR_10,
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
