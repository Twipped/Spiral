import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { BRAND_COLOR } from '../constants';
import SymptomAgenda from '../components/SymptomAgenda';
import CalendarStore from '../stores/CalendarStore';

class Agenda extends React.PureComponent {

  onHourSelected = (hour) => {
    this.props.navigation.navigate('CalendarEntry', { hour });
  };

  render () {
    return (
      <View style={styles.container}>
        <SymptomAgenda
          selected={new Date()}
          calendarStore={CalendarStore}
          onHourSelected={this.onHourSelected}
        />
      </View>
    );
  }
}

const AV = createStackNavigator(
  {
    Agenda: {
      screen: Agenda,
      navigationOptions: {
        title: 'History',
      },
    },
  },
  {
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

export default AV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

