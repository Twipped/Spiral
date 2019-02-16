import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { observer } from 'mobx-react/native';
import SlidingScale from './Conditions/SlidingScale';
import { set, cloneDeep } from 'lodash';

import {
  BGCOLOR,
  BRAND_COLOR,
} from '../constants';


class HourPicker extends React.PureComponent {

  onChange = (name, [ value ]) => {
    if (this.props.onChange) this.props.onChange(value);
  }

  render () {
    const options = [ ...Array(24).keys() ].map((hour) => {
      const label = (hour >= 12 ? `${ hour > 12 ? hour - 12 : hour}pm` : `${hour || 12}am`);
      const dot = {
        width: 4,
        height: 4,
        marginTop: 1,
        borderRadius: 2,
        opacity: this.props.markings[hour] ? 1 : 0,
        backgroundColor: '#00adf5',
        alignSelf: 'center',
        marginBottom: -6,
        marginTop: 4,
      };
      const control = ({ selected }) => (
        <View>
          <Text style={selected ? { color: BGCOLOR[10] } : { color: BGCOLOR[6] }}>{label}</Text>
          <View style={dot} />
        </View>
      );
      return [ hour, label, control ];
    });

    return (
      <SlidingScale options={options} value={this.props.selected} onChange={this.onChange} itemWidth={60} />
    );
  }
}



@observer
class DateTimePick extends React.Component {

  onDayPress = ({ year, month, day }) => {
    const { hour } = this.props.currentHour;
    if (this.props.onChange) this.props.onChange(year, month, day, hour);
  }

  onHourPress = (hour) => {
    const { year, month, day } = this.props.currentHour;
    if (this.props.onChange) this.props.onChange(year, month, day, hour);
  }

  render () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { year, month, day, hour } = this.props.currentHour;

    const hourMarkings = {};
    const todayState = this.props.calendarStore.getDay(year, month, day);
    if (todayState) {
      todayState.hours.forEach((h) => {
        if (h.hasData) hourMarkings[h.hour] = true;
      });
    }

    const dayKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const monthMarkings = cloneDeep(this.props.calendarStore.markings);
    set(monthMarkings, [ dayKey, 'selected' ], true);

    return (
      <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'space-evenly' }}>
        <View style={{ margin: 10 }}>
          <Calendar
            maxDate={today}
            horizontal
            pagingEnabled
            markedDates={monthMarkings}
            futureScrollRange={0}
            onDayPress={this.onDayPress}
            theme={{
              backgroundColor: BGCOLOR[0],
              calendarBackground: BGCOLOR[0],
              textSectionTitleColor: BGCOLOR[8],
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: BGCOLOR[0],
              todayTextColor: '#00adf5',
              dayTextColor: BGCOLOR[9],
              textDisabledColor: BGCOLOR[3],
              dotColor: '#00adf5',
              selectedDotColor: BGCOLOR[10],
              arrowColor: BRAND_COLOR,
              monthTextColor: BGCOLOR[8],
              'stylesheet.day.basic': {
                selected: {
                  backgroundColor: BGCOLOR[9],
                  borderRadius: 4,
                },
                selectedDot: {
                  backgroundColor: BGCOLOR[0],
                }
              },
            }}
            style={{

            }}
          />
        </View>
        <HourPicker
          selected={hour}
          onChange={this.onHourPress}
          markings={hourMarkings}
        />
      </View>
    );
  }
}

export default DateTimePick;


