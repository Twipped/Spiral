import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { Agenda } from 'react-native-calendars';
import { ActionSheet } from 'native-base';
import moment from 'moment';

@observer
class CalendarMain extends React.Component {

  loadItemsForMonth = (date) => {
    this.props.calendarStore.ensureMonth(date.year, date.month);
  };

  render () {
    const { navigate } = this.props.navigation;
    const { calendarStore } = this.props;
    const marks = prepareCalendarMarks(calendarStore.months);
    return (
      <View style={styles.container}>
        <Agenda
          loadItemsForMonth={this.loadItemsForMonth}
          markedDates={marks}
          refreshing={false}
          
          onDayLongPress={(date) => {
            var d = moment([ date.year, date.month - 1, date.day ]);
            ActionSheet.show(
              {
                options: [ 'Clear Recorded Data' ],
                cancelButtonIndex: -1,
                destructiveButtonIndex: 0,
                title: d.format('dddd, MMM Do, YYYY'),
              },
              (buttonIndex) => {
                switch (buttonIndex) {
                case 0:
                  calendarStore.clearDayState(date);
                  break;
                default:

                }
              }
            );
          }}
        />
      </View>
    );
  }
}

export default CalendarMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


function prepareCalendarMarks (monthsState) {
  const marks = {};
  monthsState.forEach((days, mk) => {
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
