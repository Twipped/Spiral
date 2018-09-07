import React from 'react';
import { Root } from "native-base";
import { createStackNavigator } from 'react-navigation';
import CalendarView from './views/Calendar';
import EntryView from './views/Entry';
import SettingsView from './views/Settings';
import CalendarStore from './stores/CalendarStore';

const Navigator = createStackNavigator(
  {
    Home: { screen: (CalendarView) },
    Entry: { screen: (EntryView) },
    Settings: { screen: (SettingsView) },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fdc9ff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default function App () {
  return (
    <Root>
      <Navigator screenProps={{ calendarStore: CalendarStore }} />
    </Root>
  );
}
