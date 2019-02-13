import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import dateToData from '../../lib/dateToData';
import HourRow from './HourRow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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

  onAddEntry = () => {
    const { year, month, day } = this.props;
    if (this.props.onHourSelected) this.props.onHourSelected({ year, month, day, hour: 12 });
  }

  render () {
    const { year, month, day } = this.props;
    const date = moment([ year, month - 1, day ]);
    const isToday = isSameDay(date, new Date());
    const content = [];
    const dayState = this.props.calendarStore.getDay(year, month, day);
    const isOdd = this.props.index % 2

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

    const hasRows = !!content.length;

    if (!hasRows) {
      content.push(
        <FontAwesome
          name="chevron-left"
          color="#ccc"
          size={18}
          key={1}
        />,
        <Text key={2} style={styles.clueText}>Tap to add an entry</Text>
      );
    }


    return (
      <View
        style={[ styles.rowContainer, isOdd ? styles.rowContainerOdd : undefined ]}
        onLayout={this.onLayout}
      >
        <TouchableOpacity onPress={this.onAddEntry}><View style={styles.day}>
          <Text allowFontScaling={false} style={[ styles.dayText, isToday && styles.today ]}>{date.format('MMM')}</Text>
          <Text allowFontScaling={false} style={[ styles.dayNum,  isToday && styles.today ]}>{date.format('Do')}</Text>
          <Text allowFontScaling={false} style={[ styles.dayText, isToday && styles.today ]}>{date.format('ddd')}</Text>
        </View></TouchableOpacity>
        <View style={hasRows ? styles.dayContent : styles.dayContentEmpty}>
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
    minHeight: 95,
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
  dayContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dayContentEmpty: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  clueText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 5,
  },
  today: {
    color: '#00adf5',
  },
});
