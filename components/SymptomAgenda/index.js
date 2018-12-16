import React from 'react';
import { Agenda } from 'react-native-calendars';
import { xdateToData } from 'react-native-calendars/src/interface';
import dateToData from '../../lib/dateToData';
import { observer } from 'mobx-react/native';
import moment from 'moment';
import { set } from 'lodash';
import HourList from './HourList';


@observer
class SymptomAgenda extends Agenda {

  constructor (props, ...args) {
    super(props, ...args);
    this.onDayChange = this.onDayChange.bind(this);

    const months = [
      moment().subtract(1, 'month'),
      moment(),
      moment().add(1, 'month'),
    ].map((m) => dateToData(m.toDate()));
    this.state.monthsNeeded = months;
    this.state.monthsNeededKey = months.map((m) => m.dateString).join(',');

    const d = new Date();
    props.calendarStore.ensureMonthLoaded(d.getFullYear(), d.getMonth() + 1);
  }

  renderReservations () {
    return (
      <HourList
        selectedDay={xdateToData(this.state.selectedDay)}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
        monthsNeeded={this.state.monthsNeeded}
        monthsNeededKey={this.state.monthsNeededKey}
        onDayChange={this.onDayChange}
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
    var monthsNeededKey = [];
    months.forEach(({ year, month, dateString }) => {
      this.props.calendarStore.ensureMonthLoaded(year, month);
      monthsNeededKey.push(dateString);
    });
    this.setState({ monthsNeeded: months, monthsNeededKey: monthsNeededKey.join(',') });
  }

}

export default SymptomAgenda;

