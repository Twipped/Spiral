import React from 'react';
import { Agenda } from 'react-native-calendars';
import { xdateToData } from 'react-native-calendars/src/interface';
import DayList from './DayList';
import dateToData from '../../lib/dateToData';


export class SymptomAgenda extends Agenda {

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

export class SymptomList extends React.Component {
  constructor (props) {
    super();

    this.state = {
      selectedDay: dateToData(props.selected) || dateToData(new Date()),
    };
  }

  onDayChange = (selectedDay) => {
    this.setState({ selectedDay });
  }

  render () {
    return (
      <DayList
        maxDate={dateToData(this.props.maxDate)}
        selectedDay={this.state.selectedDay}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
        onDayChange={this.onDayChange}
      />
    );
  }
}
