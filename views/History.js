import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { BRAND_COLOR } from '../constants';
import { SymptomList } from '../components/SymptomAgenda';
import CalendarStore from '../stores/CalendarStore';
import { observer } from 'mobx-react/native';

@observer
class HistoryView extends React.Component {

  onHourSelected = (hour) => {
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
        <SymptomList
          maxDate={today}
          selected={today}
          calendarStore={CalendarStore}
          onHourSelected={this.onHourSelected}
        />
      </View>
    );
  }
}

const d = new Date();
CalendarStore.ensureMonthLoaded(d.getFullYear(), d.getMonth() + 1);
d.setMonth(d.getMonth() - 1);
CalendarStore.ensureMonthLoaded(d.getFullYear(), d.getMonth() + 1);

const AV = createStackNavigator(
  {
    Agenda: {
      screen: HistoryView,
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

