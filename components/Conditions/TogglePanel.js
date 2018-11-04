
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleButton from '../ToggleButton';
import { observer } from 'mobx-react/native';


export default observer(function TogglePanel ({ fill, textColor, options, emotions, onToggle }) {
  const buttons = options.map(([ key, caption ]) => {
    const selected = emotions.has(key);
    const onPress = () => onToggle(key, !selected);

    const buttonProperties = {
      key,
      caption,
      fill,
      textColor,
      selected,
      onPress,
      pill: 30,
    };

    return (
      <ToggleButton {...buttonProperties} />
    );
  });

  return (
    <View style={styles.container}>{buttons}</View>
  );
});

var styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
