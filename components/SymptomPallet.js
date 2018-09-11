
import React from 'react';
import { TouchableWithoutFeedback, View, Image, StyleSheet, Dimensions, Text, SafeAreaView, Animated } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree'
import buttonImg from '../graphics/button.png';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const PRESS_DURATION = 500;
const state = observable({
  visible: false,
  lastPressDown: null,
});

const GestureBindings = ({
  // onStartShouldSetResponder: () => true,
  onStartShouldSetResponderCapture: (ev) => {
    const { memoizedProps } = ReactNativeComponentTree.getInstanceFromNode(ev.target);
    return memoizedProps && !!memoizedProps.isPalletButton;
  },
  // onMoveShouldSetResponder: () => true,
  // onMoveShouldSetResponderCapture: () => true,
  onResponderTerminationRequest: () => true,
  onResponderGrant: () => {
    state.visible = true;
    state.lastPressDown = Date.now();
  },
  // onResponderMove: () => {
  //   console.log('move');
  // },
  onResponderRelease: () => {
    if (!state.lastPressDown || Date.now() - state.lastPressDown > PRESS_DURATION) {
      state.visible = false;
    }
    state.lastPressDown = false;
  },
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
      <View {...props} />
    </TouchableWithoutFeedback>
  );
};

const onPalletButtonPress = () => {
  state.visible = false;
};

@observer
class SymptomPallet extends React.Component {

  render () {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;

    if (!state.visible) return null;

    return (
      <View style={[ styles.overlay, { width: windowWidth, height: windowHeight } ]}>
        <SafeAreaView style={styles.palletContent}>
          <TouchableWithoutFeedbackWrapper onPress={onPalletButtonPress}>
            <Image source={buttonImg} style={styles.palletButton} />
          </TouchableWithoutFeedbackWrapper>
          <Text style={{ color: '#fff' }}>test</Text>
        </SafeAreaView>
      </View>
    );
  }
};

const SymptomButton = () => (
  <View
    style={styles.buttonWrapper}
  >
    <Image source={buttonImg} style={styles.button} isPalletButton />
  </View>
);

export {
  SymptomPallet,
  SymptomButton,
  GestureBindings,
};

const TABBAR_DEFAULT_HEIGHT = 49;
const iconSize = TABBAR_DEFAULT_HEIGHT * 1.8;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  palletContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
