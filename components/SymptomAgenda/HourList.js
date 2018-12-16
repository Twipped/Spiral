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

    const component = (
      <DayRow
        {...item}
        onLayout={onLayout}
        onHourSelected={this.props.onHourSelected}
        calendarStore={this.props.calendarStore}
      />
    );

    item.component = component;

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
    this.targetY       = Math.round(targetY);
    console.log('computeDaysToRender', { targetDay: targetDay.dateString, index: targetIndex, targetY });
  }

  // componentDidMount () {
  //   // console.log('componentDidMount', this.selectedIndex);
  //   this.onLayoutRefresh();
  // }

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

  // onLayoutRefresh = () => {
  //   if (this.selectedIndex === -1) {
  //     console.log('onLayoutRefresh', this.selectedIndex, this.scrollNeeded);
  //     return;
  //   }
  //   var offset = 0;
  //   for (let i = 0; i < this.selectedIndex && i < this.daysRendered.length; i++) {
  //     var key = this.daysRendered[i] && this.daysRendered[i].key;
  //     offset += this.heights.get(key) || 0;
  //   }
  //   this.humanScroll = false;
  //   this.scrollview.scrollTo({ x: 0, y: offset, animated: false });
  //   this.scrollNeeded = false;
  //   console.log('onLayoutRefresh', this.selectedIndex, offset);
  // }

  // updateScrollPosition () {
  //   let top = 0;
  //   let scrollIndex = -1;
  //   each(this.daysRendered, (day, index) => {
  //     var h = this.heights.get(day.key) || 0;
  //     if (top + (h / 2) >= this.yOffset) {
  //       scrollIndex = index;
  //       return false;
  //     }
  //     top += h;
  //   });

  //   const day = scrollIndex > -1 && this.daysRendered[scrollIndex];
  //   if (!day) return;

  //   if (!isSameDay(day, this.selectedDay) && this.humanScroll) {
  //     this.selectedDay = { ...day };
  //     this.selectedIndex = scrollIndex;
  //     this.props.onDayChange({ ...day });
  //   }
  // }

  // onScroll = (event) => {
  //   const yOffset = event.nativeEvent.contentOffset.y;
  //   if (this.props.onScroll) this.props.onScroll(yOffset);
  //   this.yOffset = yOffset;
  // }

  // onLayout = (event) => {
  //   this.frameHeight = event.nativeEvent.layout.height;
  //   const maxOffset = this.contentHeight - this.frameHeight;
  //   if (maxOffset < this.yOffset) {
  //     this.yOffset = maxOffset;
  //   }
  //   this.updateScrollPosition();
  // }


  // onScrollEndDrag = (event) => {
  //   this.yOffset = event.nativeEvent.contentOffset.y;
  //   this.updateScrollPosition();
  // }

  // onListTouch = () => {
  //   this.humanScroll = true;
  //   return false;
  // }

  // onContentSizeChange = (contentWidth, contentHeight) => {
  //   this.contentHeight = contentHeight;
  //   const maxOffset = this.contentHeight - this.frameHeight;
  //   if (maxOffset < this.yOffset) {
  //     this.yOffset = maxOffset;
  //   }
  //   this.updateScrollPosition();
  //   console.log('onContentSizeChange', contentWidth, contentHeight);
  // }



  // onFullyRendered () {
  //   console.log('Fully rendered');
  // }

  render () {

    const days = this.daysToRender.map((item) => item.component);
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
