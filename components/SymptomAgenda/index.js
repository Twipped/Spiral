import React from 'react';
import { Agenda } from 'react-native-calendars';
import { xdateToData } from 'react-native-calendars/src/interface';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import { set } from 'lodash';
import HourList from './HourList';


@observer
class SymptomAgenda extends Agenda {

  constructor (props, ...args) {
    super(props, ...args);

    const d = new Date();
    props.calendarStore.ensureMonthLoaded(d.getFullYear(), d.getMonth() + 1);
  }

  renderReservations () {
    const { year, month, day } = xdateToData(this.state.selectedDay);

    return (
      <HourList
        year={year}
        month={month}
        day={day}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
        dayState={this.props.calendarStore.getDay(year, month, day)}
      />
    );
  };

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

