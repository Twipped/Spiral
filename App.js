import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import CalendarView from './views/calendar';
import EntryView from './views/entry';

const Navigator = FluidNavigator({
    Home: { screen: CalendarView },
    Entry: { screen: EntryView },
},{
  initialRouteName: 'Home',
  /* The header config from HomeScreen is now here */
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}
