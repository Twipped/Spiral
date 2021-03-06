import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { BRAND_COLOR } from '../constants';

function ForecastView () {
  return (
    <View style={styles.container}>
      <Text>Not yet implemented</Text>
    </View>
  );
}

export default createStackNavigator(
  {
    Agenda: {
      screen: ForecastView,
      navigationOptions: {
        title: 'Forecast',
      },
    },
  },
  {
    defaultNavigationOptions: {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 20,
  },
});

