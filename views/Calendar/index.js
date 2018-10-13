import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarStore from '../../stores/CalendarStore';
import moment from 'moment';

import { BRAND_COLOR } from '../../constants';
import AgendaView from './Agenda';
import EntryView, { EntryHeaderTitle } from './Entry';


const SettingsView = createStackNavigator(
  {
    CalendarHome: {
      screen: (props) => (<AgendaView {...props} calendarStore={CalendarStore} />),
      navigationOptions: () => ({ title: 'Spiral', headerBackTitle: 'Done' }),
    },
    CalendarEntry: {
      screen: (props) => (<EntryView {...props} calendarStore={CalendarStore} />),
      navigationOptions: {
        headerTitle: <EntryHeaderTitle />,
      },
    },
  },
  {
    initialRouteName: 'CalendarHome',
    mode: 'modal',
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

