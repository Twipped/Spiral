import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, FormLabel, FormInput } from 'react-native-elements';
import { observer } from 'mobx-react';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@observer
class EntryView extends React.Component {

  render () {
    const { date, calendarStore } = this.props;
    const day = calendarStore.getDayState(date);
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>Today&#039;s Weight</FormLabel>
          <FormInput
            keyboardType="decimal-pad"
            value={day.weight && Number(day.weight) && String(day.weight) || ''}
            onChangeText={(text) => calendarStore.setDayState(date, { weight: text })}
          />
        </Card>
      </View>
    );
  }
}

export default withMappedNavigationProps()(EntryView);

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
