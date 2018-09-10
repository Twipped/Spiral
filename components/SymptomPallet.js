
import React from 'react';
import { TouchableWithoutFeedback, View, Image, StyleSheet, Dimensions, Text, SafeAreaView, PanResponder } from 'react-native';
import buttonImg from '../graphics/button.png';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const state = observable({
  visible: false,
});

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
      <View {...props}      {...PR.panHandlers} />
    </TouchableWithoutFeedback>
  );
};

const PR = PanResponder.create({
  onPanResponderGrant: () => {
    state.visible = true;
    console.log('start');
  },
  onPanResponderRelease: () => {
    state.visible = false;
  },
});

@observer
class SymptomPallet extends React.Component {
  render () {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;


    return (
      state.visible && <TouchableWithoutFeedbackWrapper>
        <View style={[ styles.overlay, { width: windowWidth, height: windowHeight } ]}>
          <SafeAreaView>
            <Image source={buttonImg} style={styles.palletButton} />
            <Text>test</Text>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedbackWrapper>
    );
  }
};

const SymptomButton = () => (
  <TouchableWithoutFeedbackWrapper
    style={styles.buttonWrapper}
    {...PR.panHandlers}
  >
    <Image source={buttonImg} style={styles.button} />
  </TouchableWithoutFeedbackWrapper>
);

export const panHandlers = PR.panHandlers;

export {
  SymptomPallet,
  SymptomButton,
};

const TABBAR_DEFAULT_HEIGHT = 49;
const iconSize = TABBAR_DEFAULT_HEIGHT * 1.8;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  palletButton: {
    bottom: -17,
    width: iconSize,
    height: iconSize,
  },

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
