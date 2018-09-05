import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Spiral',
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="add" iconName="add" onPress={()=>navigation.navigate('Entry', {day: new Date()})} />
      </MaterialHeaderButtons>
    ),
  });
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          onDayPress={(day)=>navigate('Entry', {day: new Date(day.year, day.month, day.day)})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
