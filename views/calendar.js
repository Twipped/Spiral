import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons';
import { observer } from 'mobx-react';
import { CalendarList } from 'react-native-calendars';


@observer
class CalendarView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const d = new Date();
    const date = {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    };
    return {
      title: 'Spiral',
      headerRight: (
        <MaterialHeaderButtons>
          <Item
            title="add"
            iconName="add"
            onPress={() =>
              navigation.navigate('Entry', { date })
            }
          />
        </MaterialHeaderButtons>
      ),
    };
  };

  componentDidMount () {
    const d = new Date();
    this.props.screenProps.calendarStore.ensureMonth(d.getFullYear(), d.getMonth() + 1);
  };

  render () {
    const { navigate } = this.props.navigation;
    const { calendarStore } = this.props.screenProps;
    const marks = prepareCalendarMarks(calendarStore.months);
    return (
      <View style={styles.container}>
        <CalendarList
          horizontal
          pagingEnabled
          onDayPress={(date) => navigate('Entry', { date })}
          markedDates={marks}
        />
      </View>
    );
  }
}

export default CalendarView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


function prepareCalendarMarks (calendarState) {
  const marks = {};
  calendarState.forEach((days, mk) => {
    const [ year, month ] = mk.split('-').map(Number);
    days.forEach((dayState, day) => {
      if (Object.keys(dayState).length) {
        marks[`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`] = {
          marked: true,
        };
      }
    });
  });
  return marks;
}
