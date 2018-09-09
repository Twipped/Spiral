import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { StatusBar, TouchableWithoutFeedback, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { BottomTabBar } from 'react-navigation-tabs';
import CalendarView from './views/Calendar'
import SettingsView from './views/Settings';

import buttonImg from './graphics/button.png';

const TouchableWithoutFeedbackWrapper = (p) => {
  const { onPress, testID, accessibilityLabel, ...props } = p;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <View {...props} />
    </TouchableWithoutFeedback>
  );
};

const TABBAR_DEFAULT_HEIGHT = 49;
const iconSize = TABBAR_DEFAULT_HEIGHT * 1.8;
const tabBarStyles = {
  bottom: iconSize - TABBAR_DEFAULT_HEIGHT,
  width: iconSize,
  height: iconSize
};

const TabBar = createBottomTabNavigator(
  {
    Home: {
      screen: CalendarView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcons
            name="calendar"
            color={tintColor}
            size={24}
          />
        ),
      }),
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons
            name="settings"
            color={tintColor}
            size={24}
          />
        ),
      }),
    },
  },
  {
    tabBarComponent: (props) => (
      <View>
        <TouchableWithoutFeedbackWrapper style={styles.buttonWrapper} >
          <Image source={buttonImg} style={tabBarStyles} />
        </TouchableWithoutFeedbackWrapper>
        <BottomTabBar {...props} />
      </View>
    ),
  }
);

export default function App () {
  return (
    <Root>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BRAND_COLOR}
      />
      <TabBar />
    </Root>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 0,
    top: 0,
    zIndex: 5,
  },
});
