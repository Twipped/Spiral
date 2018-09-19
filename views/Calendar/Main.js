import React from 'react';
import { StyleSheet, View } from 'react-native';
import SymptomAgenda from '../../components/SymptomAgenda';

export default function CalendarMain (props) {
  return (
    <View style={styles.container}>
      <SymptomAgenda
        selected={new Date()}
        calendarStore={props.calendarStore}
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

