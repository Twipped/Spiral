
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { material } from 'react-native-typography';

import {
  BGCOLOR,
} from '../constants';

export default class MoodButton extends React.PureComponent {

  handlePress = () => {
    if (this.props.onPress) this.props.onPress(this.props);
  }

  render () {
    const { fill, textColor, caption, ...props } = this.props;
    const [ buttonStyle, textStyle ] = buildStyles(fill, textColor, { ...props });

    let child;
    switch (typeof caption) {
    case 'string':
    case 'number':
      child = <Text style={textStyle}>{caption}</Text>;
      break;
    case 'function':
    case 'object':
      child = caption;
      break;
    default:
      child = <Text style={textStyle}>[UNSUPPORTED]</Text>;
    }

    return (
      <TouchableOpacity
        {...props}
        onPress={this.handlePress}
        style={buttonStyle}
      >
        {child}
      </TouchableOpacity>
    );
  }
};


function buildStyles (fillColor, textColor, flags) {
  const button = {
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: fillColor || BGCOLOR[0],
    borderColor: flags.borderColor || fillColor || BGCOLOR[3],
    shadowOpacity: 0.31,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: BGCOLOR[0],
  };

  const text = {
    ...StyleSheet.flatten(material.button),
    color: textColor || '#FFF',
  };

  if (flags.pill) {
    Object.assign(button, {
      width: flags.pill + '%',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 4,
      marginRight: 4,
    });

    Object.assign(text, {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    });
  }

  if (flags.prime) {
    Object.assign(button, {
      flex: 1,
      marginTop: 3,
      marginLeft: 4,
      marginRight: 4,
    });

    Object.assign(text, {
      fontSize: 14,
    });
  }

  if (flags.selected) {
    Object.assign(button, {
      backgroundColor: textColor || BGCOLOR[4],
      borderColor: fillColor || BGCOLOR[0],
    });

    Object.assign(text, {
      color: fillColor || '#fff',
    });
  }

  return [ button, text ];
}
