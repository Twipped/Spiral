import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Clock from '../../stores/Clock';
import { ListItem, Body, Badge, Text, variables } from 'native-base';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import { groupBy } from 'lodash';
import Conditions from '../../stores/Conditions';

import {
  MB_MOODS,
  BGCOLOR,
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

    if (!state) {
      return (
        <ListItem onPress={this.handlePress}>
          <HourText
            hour={this.props.hour}
            isNow={this.props.isNow}
          />
          <Body style={styles.emotionView} />
        </ListItem>
      );
    }

    const valuesByClass = state.keysByClass;

    const emotions = [ 'Anger', 'Anxiety', 'Neutral', 'Joy', 'Sad' ].map((mood) =>
      (valuesByClass[mood] || []).map((emotion) => {
        const label = Conditions.getToggleLabel(emotion);
        const { fillColor, textColor } = Conditions.getByToggle(emotion) || {};
        return (
          <Badge key={emotion} style={{ backgroundColor: fillColor, marginRight: 4, marginTop: 2, marginBottom: 2 }}>
            <Text style={{ color: textColor }}>{label}</Text>
          </Badge>
        );
      })
    ).flat();

    const conditions = [ 'Mind', 'Body' ].map((className) =>
      (valuesByClass[className] || []).map((key) => {
        const toggleLabel = Conditions.getToggleLabel(key);
        if (toggleLabel) {
          return <Text key={key} style={styles.conditionText}><Text style={[ styles.conditionText, { fontWeight: '600' } ]}>{toggleLabel}</Text></Text>;
        }

        const condition = Conditions.getByKey(key, state.values);
        const { name, caption, valueLabel } = condition;
        return <Text key={name} style={styles.conditionText}><Text style={[ styles.conditionText, { fontWeight: '600' } ]}>{caption}</Text>: {valueLabel}</Text>;
      })
    ).flat();

    return (
      <ListItem onPress={this.handlePress} style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <HourText
            hour={this.props.hour}
            isNow={this.props.isNow}
          />
          <Body style={styles.emotionView}>
            {emotions}
          </Body>
        </View>
        {conditions.length && <View style={styles.conditionView}>{conditions}</View> || null}
      </ListItem>
    );
  }
}

@observer
class HourList extends React.Component {

  constructor (props) {
    super(props);

    this.clock = new Clock();
  }

  componentWillUnmount () {
    this.clock.stop();
  }

  viewableCount = 14;

  onViewableItemsChanged = (info) => { this.viewableCount = info.viewableItems.length; };

  onLayout = () => {
    const nowIndex = Math.min(Math.max(0, 23 - 5 - 1), 23);
    this.list.scrollToIndex({ index: nowIndex, animated: false, viewPosition: 1 });
  };

  renderHour = ({ item }) => (
    <HourRow
      key={item.key}
      hour={item.hour}
      pressTarget={item.target}
      onHourSelected={this.props.onHourSelected}
      isNow={
        item.year === this.clock.year
        && item.month === this.clock.month
        && item.day === this.clock.day
        && item.hour === this.clock.hour
      }
      state={item.state}
      // stateHash={item.state && item.state.hash}
    />
  );

  render () {
    const { year, month, day, dayState } = this.props;
    const hours = [];
    for (let hour = 23; hour >= 0; hour--) {
      const hourState = dayState && dayState.getHour(hour);
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

    return (
      <FlatList
        inverted
        ref={(el) => (this.list = el)}
        data={hours}
        extraData={this.props.selectedDay}
        renderItem={this.renderHour}
        style={{ backgroundColor: '#FFF' }}
        onLayout={this.onLayout}
        onViewableItemsChanged={this.onViewableItemsChanged}
        initialNumToRender={24}
        ListHeaderComponent={() => <View style={{ height: 50 }} />}
        onScrollToIndexFailed={() => {}}
      />
    );
  };
}

export default HourList;

var styles = StyleSheet.create({

  emotionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  conditionView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: BGCOLOR[9],
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  conditionText: {
    ...material.caption,
    marginHorizontal: 5,
  },

});
