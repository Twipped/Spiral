import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import dateToData from '../../lib/dateToData';
import HourRow from './HourRow';
import { material } from 'react-native-typography';

function isSameDay (day1, day2) {
  if (day1 instanceof Date) day1 = dateToData(day1);
  if (day2 instanceof Date) day2 = dateToData(day2);
  return (
    day1.year === day2.year
    && day1.month === day2.month
    && day1.day === day2.day
  );
}

@observer
class DayRow extends React.Component {


  onLayout = (ev) => {
    if (this.props.onLayout) this.props.onLayout(ev, this.props);
  }

  render () {
    const { year, month, day } = this.props;
    const date = moment([ year, month - 1, day ]);
    const isToday = isSameDay(date, new Date());
    const content = [];
    const dayState = this.props.calendarStore.getDay(year, month, day);
    if (dayState) {
      dayState.hours.forEach((hourState) => {
        if (!hourState.hasData) return;
        content.push(
          <HourRow
            key={hourState.key}
            state={hourState}
            onHourSelected={this.props.onHourSelected}
          />
        );
      });
    }


    return (
      <View
        style={[ styles.rowContainer, this.props.index % 2 ? styles.rowContainerOdd : undefined ]}
        onLayout={this.onLayout}
      >
        <View style={styles.day}>
          <Text allowFontScaling={false} style={[ styles.dayText, isToday && styles.today ]}>{date.format('MMM')}</Text>
          <Text allowFontScaling={false} style={[ styles.dayNum,  isToday && styles.today ]}>{date.format('Do')}</Text>
          <Text allowFontScaling={false} style={[ styles.dayText, isToday && styles.today ]}>{date.format('ddd')}</Text>
        </View>
        <View style={{ flex: 1 }}>
          {content}
        </View>
      </View>
    );
  }

}

export default DayRow;

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  rowContainerOdd: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dayNum: {
    fontSize: 28,
    fontWeight: '200',
    color: '#7a92a5',
    marginBottom: -3,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#7a92a5',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  day: {
    width: 63,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  today: {
    color: '#00adf5',
  },
});
