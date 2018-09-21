import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { dateToData } from './lib/common';
import navigate from './lib/navigate';

import CalendarView from './views/Calendar';
import SettingsView from './views/Settings';
import ThumbButton from './components/ThumbButton';


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
      inactiveTintColor: '#FFF',
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
      <TabbedNavigator
        ref={(navigatorRef) => {
          navigate.setTopLevelNavigator(navigatorRef);
        }}
      />
      <ThumbButton onPress={() => { navigate('CalendarEntry', { hour: dateToData(new Date()) }); }} />
    </Root>
  );
}
