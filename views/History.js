import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { BRAND_COLOR } from '../constants';
import SymptomAgenda from '../components/SymptomAgenda';
import CalendarStore from '../stores/CalendarStore';

class Agenda extends React.PureComponent {

  onHourSelected = (hour) => {
    console.log(hour);
    this.props.navigation.navigate('CalendarEntry', { hour });
  };

  render () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);

    return (
      <View style={styles.container}>
        <SymptomAgenda
          maxDate={today}
          futureScrollRange={0}
          selected={today}
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

export default AV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

