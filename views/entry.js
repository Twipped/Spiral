import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class CalendarView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var day = navigation.getParam('day');
    // console.log(day);
    return {
      title: day.toString(),
    };
  };

  render () {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput />
          <FormValidationMessage>Error message</FormValidationMessage>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

  field: {
    flexDirection: 'row',
    marginLeft: -50,
    marginRight: -50,
  },
});
