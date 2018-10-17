import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { BRAND_COLOR } from '../../constants';
import SettingsMain from './Main';

const SettingsView = createStackNavigator(
  {
    SettingsMain: {
      screen: () => (<SettingsMain />),
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    // initialRouteName: 'SettingsMain',
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

