import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarStore from '../../stores/CalendarStore';
import moment from 'moment';

import { BRAND_COLOR } from '../../constants';
import CalendarView from './Main';
import EntryView from './Entry';


const SettingsView = createStackNavigator(
  {
    CalendarHome: {
      screen: (props) => (<CalendarView {...props} calendarStore={CalendarStore} />),
      navigationOptions: {
        title: 'Spiral',
      },
    },
    CalendarEntry: {
      screen: (props) => (<EntryView {...props} calendarStore={CalendarStore} />),
      navigationOptions: ({ navigation }) => {
        var date = navigation.getParam('date');
        var d = moment([ date.year, date.month - 1, date.day ]);
        return {
          title: d.format('dddd, MMM Do, YYYY'),
        };
      },
    },
  },
  {
    initialRouteName: 'CalendarHome',
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

export default SettingsView;

