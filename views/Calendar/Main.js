import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Agenda } from 'react-native-calendars';
import { ActionSheet } from 'native-base';
import moment from 'moment';

@observer
class CalendarMain extends React.Component {

  constructor () {
    super();
    this.monthsNeeded = observable.map();
  }

  loadItemsForMonth = (date) => {
    const key = `${date.year}-${String(date.month).padStart(2, '0')}`;
    this.monthsNeeded.set(key, Date.now());
    this.props.calendarStore.ensureMonth(date.year, date.month);
  };

  render () {
    // const { navigate } = this.props.navigation;
    const { calendarStore } = this.props;
    const months = Array.from(this.monthsNeeded.keys());
    const items = months.map((m) => m.split('-').map(Number)).sort().reduce((results, m) => {
      const [ year, month ] = m;
      const start = moment([ year, month - 1, 1 ]);
      const end = moment([ year, month - 1, 1 ]).endOf('month');
      for (let day = start.date(); day <= end.date(); day++) {
        const dayKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const record = calendarStore.getDayState(year, month, day);
        results[dayKey] = Object.keys(record).length ? [ record ] : [];
      }

      return results;
    }, {});

    console.log(months);

    return (
      <View style={styles.container}>
        <Agenda
          loadItemsForMonth={this.loadItemsForMonth}
          items={items}
          renderEmptyDate={() => {return (<View />);}}
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

