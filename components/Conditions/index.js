
import React from 'react';
import PlusMinus from './PlusMinus';
import Temperature from './Temperature';
import Decimal from './Decimal';
import { View } from 'react-native';


const Conditions = {
  PlusMinus,
  Temperature,
  Decimal,
};

export default function ({ type, ...props }) {
  if (typeof Conditions[type] === 'undefined') throw new Error('Unknown condition type: ' + type);
  const Component = Conditions[type];
  return <Component {...props} />;
}
