import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CalendarView from './views/calendar';
import EntryView from './views/entry';

const Navigator = createStackNavigator({
    Home: { screen: CalendarView },
    Entry: { screen: EntryView },
},{
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
});

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}
