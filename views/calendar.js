import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons'

export default class CalendarView extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Spiral',
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="add" iconName="add" onPress={()=>navigation.navigate('Entry')} />
      </MaterialHeaderButtons>
    ),
  });
  
  render() {
    return (
      <View style={styles.container}>
        <Text>CalendarView</Text>
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
