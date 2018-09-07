import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { observer } from 'mobx-react';
import moment from 'moment';

@observer
class EntryView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    var date = navigation.getParam('date');
    var d = moment([ date.year, date.month - 1, date.day ]);
    return {
      title: d.format('dddd, MMM Do, YYYY'),
    };
  };

  render () {
    const { date, calendarStore } = this.props.navigation.state.params;
    const day = this.props.screenProps.calendarStore.getDayState(date);
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>Today&#039;s Weight</FormLabel>
          <FormInput
            keyboardType="decimal-pad"
            value={day.weight && Number(day.weight) && String(day.weight) || ''}
            onChangeText={(text) => this.props.screenProps.calendarStore.setDayState(date, { weight: text })}
          />
        </Card>
      </View>
    );
  }
}

export default EntryView;

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
