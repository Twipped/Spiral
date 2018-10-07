
import React from 'react';
import PlusMinus from './PlusMinus';
import { View } from 'react-native';


export const Conditions = {
  PlusMinus,
  Decimal: View,
};

export default function ({ type, ...props }) {
  console.log(Object.keys(Conditions), type)
  // if (typeof Conditions[type] === 'undefined') throw new Error('Unknown condition type: ' + type);
  const Component = Conditions[type];
  return <Component {...props} />;
}
