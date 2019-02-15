import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Card, CardItem, Body, Badge, Text, variables } from 'native-base';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import Conditions from '../../stores/Conditions';

import {
  BGCOLOR,
  MB_MOODS,
} from '../../constants';

class HourText extends React.PureComponent {
  render () {
    const { isNow, style, ...props } = this.props;
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
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginRight: 5,
    };
    const textStyle = {
      color: isNow ? variables.brandPrimary : '#a7a7a7',
      fontSize: variables.noteFontSize,
    };
    return <View style={[ styles, style ]}><Text style={textStyle} {...props}>{text}</Text></View>;
  }
}

@observer
class HourRow extends React.Component {

  handlePress = () => {
    const { year, month, day, hour } = this.props.state;
    if (this.props.onHourSelected) this.props.onHourSelected({ year, month, day, hour });
  }

  render () {
    const state = this.props.state;

    if (!state) {
      return null;
    }

    const valuesByClass = state.keysByClass;

    const emotions = Object.values(MB_MOODS).map((mood) =>
      (valuesByClass[mood.name] || []).map((emotion) => {
        const label = Conditions.getToggleLabel(emotion);
        return (
          <Badge key={emotion} style={[ styles.emotionBadge, { backgroundColor: mood.fillColor } ]}>
            <Text style={[ styles.emotionBadgeText, { color: mood.textColor } ]}>{label}</Text>
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
        if (!condition) return null;
        const { name, caption, valueLabel } = condition;
        return <Text key={name} style={styles.conditionText}><Text style={[ styles.conditionText, { fontWeight: '600' } ]}>{caption}</Text>: {valueLabel}</Text>;
      })
    ).flat();

    return (
      <Card style={styles.card}>
        <TouchableHighlight onPress={this.handlePress}><View>
          { emotions.length > 2 ?
            <CardItem style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <HourText hour={state.hour} style={{ alignSelf: 'flex-start', marginBottom: 5 }} />
              {emotions.length && <View style={styles.emotionView}>{emotions}</View> || null}
            </CardItem>
            :
            <CardItem style={styles.emotionView}>
              <HourText hour={state.hour} />
              {emotions}
            </CardItem>
          }
          {conditions.length && <CardItem style={{ paddingTop: 0 }}>
            <View style={styles.conditionView}>{conditions}</View>
          </CardItem> || null}
        </View></TouchableHighlight>
      </Card>
    );
  }
}


export default HourRow;

var styles = StyleSheet.create({

  card: {
    marginRight: 5,
  },

  emotionView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  emotionBadge: {
    marginRight: 4,
    marginTop: 2,
    marginBottom: 2,
  },

  emotionBadgeText: {
    ...material.body1,
    fontSize: 12,
  },

  conditionView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: BGCOLOR[9],
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
