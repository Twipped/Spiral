import React from 'react';
import { Agenda } from 'react-native-calendars';
import { xdateToData } from 'react-native-calendars/src/interface';
import DayList from './DayList';


class SymptomAgenda extends Agenda {

  constructor (props, ...args) {
    super(props, ...args);
    this.onDayChange = this.onDayChange.bind(this);
  }

  renderReservations () {
    return (
      <DayList
        maxDate={xdateToData(this.props.maxDate)}
        selectedDay={xdateToData(this.state.selectedDay)}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
        onDayChange={this.onDayChange}
      />
    );
  };

}

export default SymptomAgenda;

