
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleButton from '../ToggleButton';
import { observer } from 'mobx-react/native';


export default function TogglePanel ({ name, fillColor, textColor, toggles, value, onChange }) {
  let pill = 30;
  if (toggles.length % 4 === 0) pill = 45;
  if (toggles.length === 2) pill = 45;
  if (toggles.length === 1) pill = 90;

  const buttons = toggles.map(([ key, caption ]) => {
    if (!Array.isArray(value)) throw new Error('Received a condition without toggle values.');
    const selected = value.includes(key);
    const onPress = () => onChange(key, selected ? null : true);

    const buttonProperties = {
      key,
      caption,
      fill: fillColor,
      textColor,
      selected,
      onPress,
      pill,
    };

    return (
      <ToggleButton {...buttonProperties} />
    );
  });
console.log('TogglePanel', name, value);
  return (
    <View style={styles.container}>{buttons}</View>
  );
};

var styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
