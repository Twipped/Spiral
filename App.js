import React from 'react';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import CalendarView from './views/Calendar';
import EntryView from './views/Entry';
import SettingsView from './views/Settings';
import CalendarStore from './stores/CalendarStore';
import moment from 'moment';

StatusBar.setBarStyle('dark-content');

const BRAND_COLOR = '#912291';

const Navigator = createStackNavigator(
  {
    Home: {
      screen: (props) => (<CalendarView {...props} calendarStore={CalendarStore} />),
      navigationOptions: {
        title: 'Spiral',
      },
    },
    Entry: {
      screen: (props) => (<EntryView {...props} calendarStore={CalendarStore} />),
      navigationOptions: ({ navigation }) => {
        var date = navigation.getParam('date');
        var d = moment([ date.year, date.month - 1, date.day ]);
        return {
          title: d.format('dddd, MMM Do, YYYY'),
        };
      }
    },
    Settings: { screen: (SettingsView) },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      barStyle: 'dark-content',
      headerStyle: {
        backgroundColor: BRAND_COLOR,
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const TabBar = createBottomTabNavigator(
  {
    Home: {
      screen: Navigator,
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
    /* Other configuration remains unchanged */
  }
);

export default function App () {
  return (
    <Root>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BRAND_COLOR}
      />
      <TabBar screenProps={{ calendarStore: CalendarStore }} />
    </Root>
  );
}
