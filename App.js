import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import CalendarView from './views/Calendar';
import SettingsView from './views/Settings';
import MBPallet from './components/MBPallet';

const TabbedNavigator = createBottomTabNavigator(
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
    tabBarOptions: {
      allowFontScaling: true,
      activeTintColor: '#BBF',
      // activeBackgroundColor: BRAND_COLOR,
      inactiveTintColor: '#FFF',
      // inactiveBackgroundColor: BRAND_COLOR,
      style: {
        backgroundColor: BRAND_COLOR,
      },
    },
  }
);

export default function App () {
  return (
    <Root>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BRAND_COLOR}
      />
      <MBPallet style={{ flex: 1 }}>
        <TabbedNavigator />
      </MBPallet>
    </Root>
  );
}
