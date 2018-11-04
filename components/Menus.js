
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import { map, iteratee } from 'lodash';
import ToggleButton from './ToggleButton';

import Condition from './Conditions';

import {
  BGCOLOR,
} from '../constants';

export const MoodMenu = observer(({ mood, entryEmotions, ...props }) => {

  const buttons = map(mood.emotions, (emotion, i) => {
    const key = `${mood.name}/${emotion}`;
    const selected = entryEmotions.has(key);
    const onPress = () => props.onToggleEmotion(key, !selected);

    var buttonProperties = {
      key,
      caption: emotion,
      fill: mood.fill,
      textColor: mood.color,
      selected,
      onPress,
      // prime: i === 0,
      pill: i > 0 ? 30 : 90,
    };

    return (
      <ToggleButton {...buttonProperties} />
    );
  });

  const primeButton = buttons.splice(0, 1);

  return (
    <View style={[ styles.main, props.style ]}>
      <View style={[ styles.buttonRow, styles.menuRowEven ]}>{buttons}</View>
      <View style={[ styles.buttonRow, styles.menuRowOdd ]}>{primeButton}</View>
    </View>
  );
});

export const ConditionMenu = ({ conditions, emotions, className, onChange, onToggle, style }) => {
  if (!conditions) return null;

  conditions = Object.values(conditions);
  if (className) {
    // filter conditions by class name
    conditions = conditions.filter(iteratee({ className }));
  }

  conditions = map(conditions, (condition, rowi) => (
    <View key={`condition-row-${rowi}`} style={rowi % 2 ? styles.menuRowOdd : styles.menuRowEven}>
      <Text style={styles.menuRowCaption}>{condition.caption}</Text>
      {!!condition.description && <Text style={styles.menuRowDescription}>{condition.description}</Text>}
      <Condition {...condition} emotions={emotions} onChange={onChange} onToggle={onToggle} value={condition.value} />
    </View>
  ));

  return (
    <View style={[ styles.main, style ]}>{conditions}</View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingTop: 5,
  },

  buttonRow: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  menuRowCaption: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 2,
  },

  menuRowDescription: {
    color: 'white',
    textAlign: 'center',
  },

  menuRowEven: {
    backgroundColor: BGCOLOR[1],
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: BGCOLOR[3],
  },
  menuRowOdd: {
    backgroundColor: BGCOLOR[2],
    paddingVertical: 2,
  },
});
