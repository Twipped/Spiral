import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarStore from '../../stores/CalendarStore';
import moment from 'moment';

import { BRAND_COLOR } from '../../constants';
import AgendaView from './Agenda';
import EntryView from './Entry';


const SettingsView = createStackNavigator(
  {
    CalendarHome: {
      screen: (props) => (<AgendaView {...props} calendarStore={CalendarStore} />),
      navigationOptions: () => ({ title: 'Spiral' }),
    },
    CalendarEntry: {
      screen: (props) => (<EntryView {...props} calendarStore={CalendarStore} />),
      navigationOptions: ({ navigation }) => {
        const { year, month, day, hour } = navigation.getParam('hour');
        const d = moment([ year, month - 1, day, hour, 0, 0 ]);
        const relativeDays = moment().diff(d, 'days');
        if (relativeDays === 0) return { title: d.format('[Today] [at] h:mma') };
        else if (relativeDays === 1) return { title: d.format('[Yesterday] [at] h:mma') };
        else if (relativeDays < 7) return { title: d.format('[Last] dddd [at] h:mma') };
        return { title: d.format('MMM Do [at] H:mma') };
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

