import React from 'react';
import { StyleSheet, View } from 'react-native';
import SymptomAgenda from '../../components/SymptomAgenda';

export default function AgendaView (props) {

  const onHourSelected = (hour) => {
    props.navigation.navigate('CalendarEntry', { hour });
  };

  return (
    <View style={styles.container}>
      <SymptomAgenda
        selected={new Date()}
        calendarStore={props.calendarStore}
        onHourSelected={onHourSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

