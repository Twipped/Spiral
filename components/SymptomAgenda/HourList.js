import React from 'react';
import { FlatList, View } from 'react-native';
import { xdateToData } from 'react-native-calendars/src/interface';
import Clock from '../../stores/Clock';
import { ListItem, Body, Badge, Text, variables } from 'native-base';
import { computed } from 'mobx';
import { observer } from 'mobx-react/native';


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
      const { fill, color } = MB_MOODS[mood] || {};
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
