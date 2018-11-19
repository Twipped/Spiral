
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { map } from 'lodash';

import Condition from './Conditions';

import {
  BGCOLOR,
} from '../constants';

export default function ConditionMenu ({ conditions, onChange, style }) {
  if (!conditions) return null;

  const conditionComponents = map(conditions, (condition, rowi) => (
    <View key={`condition-row-${rowi}`} style={rowi % 2 ? styles.menuRowOdd : styles.menuRowEven}>
      {!!condition.caption && <Text style={styles.menuRowCaption}>{condition.caption}</Text>}
      {!!condition.description && <Text style={styles.menuRowDescription}>{condition.description}</Text>}
      <Condition {...condition} onChange={onChange} />
    </View>
  ));

  return (
    <View style={[ styles.main, style ]}>{conditionComponents}</View>
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
