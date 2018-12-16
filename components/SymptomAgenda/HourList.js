import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
// import Clock from '../../stores/Clock';
import dateToData from '../../lib/dateToData';
// import { ListItem, Body, Badge, Text, variables } from 'native-base';
import moment from 'moment';
import DayRow from './DayRow';
// import ActivityIndicator from './ActivityIndicator.js';
import { debounce, each } from 'lodash';

// import {
//   BGCOLOR,
// } from '../../constants';

function isSameDay (day1, day2) {
  if (day1 instanceof Date) day1 = dateToData(day1);
  if (day2 instanceof Date) day2 = dateToData(day2);
  return (
    day1.year === day2.year
    && day1.month === day2.month
    && day1.day === day2.day
  );
}



class HourList extends React.Component {

  constructor (props) {
    super(props);

    this.days = new Map();
    this.daysToRender = [];
    this.selectedDay = this.props.selectedDay;
    this.targetedDay = null;
    this.targetedIndex = -1;
    this.targetedId = 0;
    this.humanScroll = false;
    this.targetDelta = 0;
    this.targetY = 0;
    this.scrollY = 0;
    this.frameHeight = 0;
    this.contentHeight = 0;

    console.log('constructor', props.monthsNeededKey, props.selectedDay && props.selectedDay.dateString);
    this.computeDaysToRender(props.monthsNeeded);
  }

  ensureDay (year, month, day) {
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const id = Number(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`);
    if (this.days.has(dateString)) return this.days.get(dateString);

    const item = {
      id, year, month, day, dateString, key: dateString, height: 0, rendered: false,
    };

    const onLayout = (event) => {
      var height = event.nativeEvent.layout.height;
      if (!height) return; // ignore if the row hasn't rendered
      item.rendered = true;
      const delta = height - item.height; // how has the row's height changed
      item.height = height;

      this.onRowLayoutChange(item, height, delta);
    };

    item.onLayout = onLayout;

    this.days.set(dateString, item);
    return item;
  }

  scrollToTarget = () => {
    this.scrollview.scrollTo({ x: 0, y: this.targetY + this.frameHeight, animated: false });
  }

  scrollToTargetDefered = debounce(this.scrollToTarget, 100);

  onRowLayoutChange ({ id }, height, delta) {
    // if the changing row is after the current top row, we don't care.
    if (id >= this.targetId) return;

    this.targetY = Math.round(this.targetY + delta);
    this.scrollToTargetDefered();
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.contentHeight = contentHeight;
    const maxOffset = this.contentHeight - this.frameHeight;

    console.log('onContentSizeChange', { target: this.targetY, current: this.scrollY, contentHeight: this.contentHeight, frameHeight: this.frameHeight, maxOffset });

    this.scrollToTarget();
  }

  onLayout = (event) => {
    this.frameHeight = event.nativeEvent.layout.height;
    const maxOffset = this.contentHeight - this.frameHeight;
    console.log('onLayout', { target: this.targetY, current: this.scrollY, contentHeight: this.contentHeight, frameHeight: this.frameHeight, maxOffset });
  }

  onScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log('onScroll', { received: scrollY, current: this.scrollY, target: this.targetY, human: this.humanScroll });
    this.scrollY = scrollY - this.frameHeight;
    if (this.humanScroll) this.onHumanScroll();
  }

  onListTouch = () => {
    this.humanScroll = true;
    return false;
  }

  onScrollEndDrag = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log('onScrollEndDrag', { received: scrollY, current: this.scrollY, target: this.targetY, human: this.humanScroll });
    this.scrollY = scrollY - this.frameHeight;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = false;
  }

  onMomentumScrollBegin = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log('onMomentumScrollBegin', { received: scrollY, current: this.scrollY, target: this.targetY, human: this.humanScroll });
    this.scrollY = scrollY - this.frameHeight;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = true;
  }

  onMomentumScrollEnd = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log('onMomentumScrollEnd', { received: scrollY, current: this.scrollY, target: this.targetY, human: this.humanScroll });
    this.scrollY = scrollY - this.frameHeight;
    if (this.humanScroll) this.onHumanScroll();
    this.humanScroll = false;
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
      this.targetY       = Math.round(offset) + targetDelta;
      this.targetDelta   = targetDelta;
      // this.props.onDayChange(targetDay);
    }

    console.log('onHumanScroll', { current: this.scrollY, target: this.targetY, delta: this.targetDelta, day: targetDay && targetDay.dateString });
  }

  computeDaysToRender (monthsNeeded) {
    let index = 0;
    let targetDay = null;
    let targetIndex = -1;
    let targetId = 0;
    let targetY = 0;
    const days = (monthsNeeded || []).reduce((results, m) => {
      const { year, month } = m;
      const daysInMonth = moment([ year, month - 1, 1 ]).endOf('month').date();
      for (let day = 1; day <= daysInMonth; day++) {
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
    this.targetY       = Math.round(targetY) + this.targetDelta;
    console.log('computeDaysToRender', { targetDay: targetDay.dateString, index: targetIndex, targetY });
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate', { current: this.scrollY, target: this.targetY });
  }

  shouldComponentUpdate (nextProps) {
    var yes = (
      this.props.monthsNeededKey !== nextProps.monthsNeededKey
      || !isSameDay(nextProps.selectedDay, this.selectedDay)
    );
    console.log('shouldComponentUpdate', yes, { currentDay: this.selectedDay && this.selectedDay.dateString, next: nextProps.selectedDay && nextProps.selectedDay.dateString });
    if (yes) {
      this.selectedDay = nextProps.selectedDay;
      this.computeDaysToRender(nextProps.monthsNeeded);
      this.scrollToTarget();
    }
    return yes;
  }

  render () {

    const days = this.daysToRender.map((item, index) => (
      <DayRow
        {...item}
        index={index}
        onLayout={item.onLayout}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
      />
    ));
    this.scrollToTargetDefered();
    return (
      <View style={[ styles.container, this.props.style ]}>
        <ScrollView
          ref={(el) => (this.scrollview = el)}
          onLayout={this.onLayout}
          onContentSizeChange={this.onContentSizeChange}

          onScroll={this.onScroll}
          onScrollEndDrag={this.onScrollEndDrag}
          onMoveShouldSetResponderCapture={this.onListTouch}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          scrollEventThrottle={100}
        >
          <View style={{ height: this.frameHeight }} />
          {days}
          <View style={{ height: this.frameHeight }} />
        </ScrollView>
      </View>
    );
  };
}

export default HourList;

var styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFF',
  },

});
