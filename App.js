import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarView from './views/calendar';
import EntryView from './views/entry';
import CalendarStore from './stores/CalendarStore';

const Navigator = createStackNavigator(
  {
    Home: { screen: (CalendarView) },
    Entry: { screen: (EntryView) },
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
    <Navigator screenProps={{ calendarStore: CalendarStore }} />
  );
}
