
import React from 'react';
import { TouchableWithoutFeedback, View, Image, StyleSheet } from 'react-native';
import buttonImg from '../graphics/button.png';


const TouchableWithoutFeedbackWrapper = (p) => {
  const { onPress, onPressIn, onPressOut, testID, accessibilityLabel, ...props } = p;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <View {...props} />
    </TouchableWithoutFeedback>
  );
};


const SymptomButton = () => (
  <TouchableWithoutFeedbackWrapper style={styles.buttonWrapper} >
    <Image source={buttonImg} style={styles.button} />
  </TouchableWithoutFeedbackWrapper>
);


export default SymptomButton;

const TABBAR_DEFAULT_HEIGHT = 49;
const iconSize = TABBAR_DEFAULT_HEIGHT * 1.8;

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 0,
    zIndex: 101,
  },

  button: {
    bottom: iconSize - TABBAR_DEFAULT_HEIGHT,
    width: iconSize,
    height: iconSize,
  },
});
