import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
// import Clock from '../../stores/Clock';
import dateToData from '../../lib/dateToData';
import moment from 'moment';
import DayRow from './DayRow';

function isSameDay (day1, day2) {
  if (day1 instanceof Date) day1 = dateToData(day1);
  if (day2 instanceof Date) day2 = dateToData(day2);
  return (
    day1.year === day2.year
    && day1.month === day2.month
    && day1.day === day2.day
  );
}

import {
  MB_BUTTON_RADIUS,
} from '../../constants';

class DayList extends React.Component {

  constructor (props) {
    super(props);

    this.days = new Map();
    this.daysToRender = [];
    this.selectedDay = props.selectedDay;
    this.targetedDay = null;
    this.targetedIndex = -1;
    this.targetedId = 0;
    this.humanScroll = false;
    this.targetDelta = 0;
    this.targetY = 0;
    this.scrollY = 0;
    this.frameHeight = 0;
    this.contentHeight = 0;

    const { months, hash } = this.computeMonthsNeeded(props.selectedDay, props.maxDate);
    this.months = months;
    this.monthHash = hash;

    this.computeDaysToRender(months, props.maxDate);
  }

  shouldComponentUpdate (nextProps) {
    const dayChanged = !isSameDay(nextProps.selectedDay, this.selectedDay);

    if (!dayChanged) return false;

    this.selectedDay = nextProps.selectedDay;

    const { months, hash } = this.computeMonthsNeeded(nextProps.selectedDay, nextProps.maxDate);

    this.months = months;
    this.monthHash = hash;
    this.computeDaysToRender(months, nextProps.maxDate);
    if (!this.humanScroll) this.scrollToTarget();
    return true;
  }

  computeMonthsNeeded (day, maxDay) {
    if (day instanceof Date) day = dateToData(day);
    if (maxDay instanceof Date) maxDay = dateToData(maxDay);

    const month = moment([ day.year, day.month - 1, 1 ]).subtract(1, 'month');
    const finalMonth = moment([ maxDay.year, maxDay.month - 1, 1 ]);
    const months = [
      { year: month.year(), month: month.month() + 1, hash: month.format('YYYY-MM') },
    ];

    while (month.isBefore(finalMonth)) {
      month.add(1, 'month');
      months.push({ year: month.year(), month: month.month() + 1, hash: month.format('YYYY-MM') });
    }

    months.reverse();

    const hash = months.map((m) => m.hash).join(',');
    // console.log('computeMonthsNeeded', hash);
    return { months, hash };
  }


  ensureDay (year, month, day) {
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const id = Number(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
    if (this.days.has(dateString)) return this.days.get(dateString);

    const item = {
      id, year, month, day, dateString, key: dateString, height: 95, rendered: false,
    };

    item.onLayout = (event) => {
      var height = event.nativeEvent.layout.height;
      if (!height) return; // ignore if the row hasn't rendered
      item.rendered = true;
      item.height = height;
    };

    this.days.set(dateString, item);
    return item;
  }

  scrollToTarget = () => {
    this.scrollview.scrollToOffset({ offset: this.targetY, animated: true });
  }


  onScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    this.scrollY = scrollY;
    if (this.humanScroll) this.onHumanScroll();
  }

  onListTouch = () => {
    this.humanScroll = true;
    return false;
  }

  onScrollEndDrag = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    this.scrollY = scrollY;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = false;
    this.onScrollEnded();
  }

  onMomentumScrollBegin = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    this.scrollY = scrollY;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = true;
  }

  onMomentumScrollEnd = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    this.scrollY = scrollY;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = false;
    this.onScrollEnded();
  }

  onScrollEnded () {
    const { months, hash } = this.computeMonthsNeeded(this.selectedDay, this.props.maxDate);
    if (this.monthHash === hash) return;

    this.months = months;
    this.monthHash = hash;
    this.humanScroll = false;
    this.computeDaysToRender(months, this.props.maxDate);
    this.forceUpdate();
  }

  onHumanScroll () {
    var offset = 0;
    let index = -1;
    let targetDay = null;
    let targetIndex = -1;
    let targetId = 0;
    let targetDelta = 0;
    for (const item of this.daysToRender) {
      index++;
      const { height } = item;

      if (offset + (height / 2) >= this.scrollY) {
        targetDay = item;
        targetIndex = index;
        targetId = item.id;
        targetDelta = this.scrollY - offset;
        break;
      }

      offset += height;
    }

    const sameDay = targetDay
      && this.selectedDay.year === targetDay.year
      && this.selectedDay.month === targetDay.month
      && this.selectedDay.day === targetDay.day
    ;

    if (targetDay && !sameDay) {
      this.targetedDay   = targetDay;
      this.targetedIndex = targetIndex;
      this.targetedId    = targetId;
      this.targetY       = offset + targetDelta;
      this.targetDelta   = targetDelta;
      this.selectedDay   = targetDay;
      this.props.onDayChange(targetDay);
    }
  }

  computeDaysToRender (monthsNeeded, maxDate) {
    let index = 0;
    let targetDay = null;
    let targetIndex = -1;
    let targetId = 0;
    let targetY = 0;

    const maxid = Number(`${maxDate.year}${String(maxDate.month).padStart(2, '0')}${String(maxDate.day).padStart(2, '0')}`);

    const days = (monthsNeeded || []).reduce((results, m) => {
      const { year, month } = m;
      const daysInMonth = moment([ year, month - 1, 1 ]).endOf('month').date();
      for (let day = daysInMonth; day > 0; day--) {
        const dayid = Number(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
        // skip dates past maxDate
        if (dayid > maxid) continue;

        index++;
        const item = this.ensureDay(year, month, day);
        results.push(item);


        const sameDay =
          this.selectedDay.year === year
          && this.selectedDay.month === month
          && this.selectedDay.day === day
        ;

        if (sameDay) {
          targetDay = item;
          targetIndex = index;
          targetId = item.id;
        }

        if (!targetDay) targetY += item.height;
      }
      return results;
    }, []);

    this.daysToRender  = days;
    this.targetedDay   = targetDay || days[0];
    this.targetedIndex = targetIndex;
    this.targetedId    = targetId;
    this.targetY       = targetY;
  }

  renderDay = ({ item, index }) => (
    <DayRow
      {...item}
      index={index}
      onLayout={item.onLayout}
      onHourSelected={this.props.onHourSelected}
      calendarStore={this.props.calendarStore}
    />
  )

  render () {
    return (
      <View style={[ styles.container, this.props.style ]}>
        <FlatList
          ref={(el) => (this.scrollview = el)}

          data={this.daysToRender}
          renderItem={this.renderDay}
          inverted

          onScroll={this.onScroll}
          onScrollEndDrag={this.onScrollEndDrag}
          onMoveShouldSetResponderCapture={this.onListTouch}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          scrollEventThrottle={200}
          ListHeaderComponent={<View style={{ height: MB_BUTTON_RADIUS }} />}

        />
      </View>
    );
  };
}

export default DayList;

var styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFF',
  },

});
