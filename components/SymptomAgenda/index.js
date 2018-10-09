import React from 'react';
import { FlatList, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { xdateToData } from 'react-native-calendars/src/interface';
import { dateToData } from '../../lib/common';
import { ListItem, Body, Badge, Text, variables } from 'native-base';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import { set } from 'lodash';

import {
  MB_MOODS,
  BRAND_COLOR_LIGHT,
} from '../../constants';

class HourText extends React.PureComponent {
  render () {
    const { isNow, ...props } = this.props;
    let hour = this.props.hour;
    let ampm = 'am';
    hour = Number(hour);
    if (hour > 11) {
      ampm = 'pm';
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }
    const text = `${hour}:00${ampm}`;
    const styles = {
      alignSelf: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      width: 60,
      marginRight: 5,
    };
    const textStyle = {
      color: isNow ? variables.brandPrimary : '#a7a7a7',
      fontSize: variables.noteFontSize,
    };
    return <View style={styles}><Text style={textStyle} {...props}>{text}</Text></View>;
  }
}

@observer
class HourRow extends React.Component {

  handlePress = () => {
    if (this.props.onHourSelected) this.props.onHourSelected(this.props.pressTarget);
  }

  render () {
    const state = this.props.state;
    const emotions = state && Array.from(state._emotions).sort().map((e) => {
      const [ mood, emotion ] = e.split('/');
      const { fill, color } = MB_MOODS[mood];
      return (
        <Badge key={'emotion/' + e} style={{ backgroundColor: fill, marginRight: 4, marginTop: 2, marginBottom: 2 }}>
          <Text style={{ color }}>{emotion}</Text>
        </Badge>
      );
    });
    const conditions = state && Object.values(state.conditions).map((condition) => {
      const { name, caption, valueLabel } = condition;
      if (condition.value === null || (condition.default === undefined && !condition.value)) return null;
      return (
        <Badge key={'condition/' + name} style={{ backgroundColor: BRAND_COLOR_LIGHT, marginRight: 4, marginTop: 2, marginBottom: 2 }}>
          <Text style={{ color: 'white' }}>{caption}: {valueLabel}</Text>
        </Badge>
      );
    });
    return (
      <ListItem onPress={this.handlePress} >
        <HourText
          hour={this.props.hour}
          isNow={this.props.isNow}
        />
        <Body style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {emotions}{conditions}
        </Body>
      </ListItem>
    );
  }
}

@observer
class SymptomAgenda extends Agenda {

  constructor (props) {
    super(props);

    this.state.now = dateToData(new Date());

    const d = new Date();
    props.calendarStore.ensureMonthLoaded(d.getFullYear(), d.getMonth() + 1);

    // timer to keep agenda on track
    setInterval(() => {
      this.setState({ now: dateToData(new Date()) });
    }, 10000);
  }

  renderReservations () {
    const nowIndex = Math.min(15, this.state.now.hour);
    return (
      <FlatList
        ref={(el) => (this.list = el)}
        onLayout={() => { this.list.scrollToIndex({ index: nowIndex, animated: false }); }}
        data={this.generateHours()}
        extraData={this.state.selectedDay}
        renderItem={this.renderHour}
        style={{ backgroundColor: '#FFF' }}
        contentOffset={{ x: 0, y: 43.5 * nowIndex }}
        initialNumToRender={24}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
        onScrollToIndexFailed={() => {}}
      />
    );
  };

  renderHour = ({ item }) => (
    <HourRow
      key={item.key}
      hour={item.hour}
      pressTarget={item.target}
      onHourSelected={this.props.onHourSelected}
      isNow={
        item.year === this.state.now.year
        && item.month === this.state.now.month
        && item.day === this.state.now.day
        && item.hour === this.state.now.hour
      }
      state={item.state}
      // stateHash={item.state && item.state.hash}
    />
  );


  generateHours = () => {
    const { year, month, day } = xdateToData(this.state.selectedDay);
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourState = this.props.calendarStore.getHour(year, month, day, hour);
      hours.push({
        key: [ year, month, day, hour ].join('-'),
        year,
        month,
        day,
        hour,
        target: { year, month, day, hour },
        state: hourState,
      });
    }
    return hours;
  }

  generateMarkings = () => {
    const selected = xdateToData(this.state.selectedDay);
    const selectedDayKey = selected.dateString;
    const marks = (this.state.monthsNeeded || []).reduce((results, m) => {
      const { year, month } = m;
      const daysInMonth = moment([ year, month - 1, 1 ]).endOf('month').date();
      for (let day = 1; day <= daysInMonth; day++) {
        const dayKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const record = this.props.calendarStore.getDay(year, month, day);
        const hasRecords = record && record.hasData;
        if (hasRecords) {
          results[dayKey] = {
            marked: !!hasRecords,
          };
        }
      }
      return results;
    }, {});

    set(marks, [ selectedDayKey, 'selected' ], true);
    return marks;
  }

  onVisibleMonthsChange (months) {
    months.forEach(({ year, month }) => {
      this.props.calendarStore.ensureMonthLoaded(year, month);
    });
    this.setState({ monthsNeeded: months });
  }

}

export default SymptomAgenda;

