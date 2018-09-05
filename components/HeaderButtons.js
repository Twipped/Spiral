import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons';

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="black" />
);

export const MaterialHeaderButtons = props => {
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white" />}
      {...props}
    />
  );
};
export const Item = HeaderButtons.Item;