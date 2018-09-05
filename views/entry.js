import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CalendarView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var day = navigation.getParam('day');
    console.log(day);
    return {
      title: day.toString(),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>EntryView</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
