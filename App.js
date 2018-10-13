import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { dateToData } from './lib/common';
import navigate from './lib/navigate';
import { observer } from 'mobx-react/native';

import CalendarView from './views/Calendar';
import SettingsView from './views/Settings';
import ThumbButton from './components/ThumbButton';
import { EntryEditor } from './views/Calendar/Entry';

const TabbedNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: CalendarView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome
            name="calendar"
            color={tintColor}
            size={24}
          />
        ),
      }),
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons
            name="settings"
            color={tintColor}
            size={24}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      allowFontScaling: true,
      activeTintColor: '#BBF',
      inactiveTintColor: '#FFF',
      style: {
        backgroundColor: BRAND_COLOR,
      },
    },
  }
);

function onThumbButtonPress () {
  if (EntryEditor.entry && EntryEditor.currentTab !== 'Mind') {
    EntryEditor.currentTab = 'Mind';
  } else if (!EntryEditor.entry) {
    navigate('CalendarEntry', { hour: dateToData(new Date()) });
  }
}

const App = observer(function App () {
  return (
    <Root>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BRAND_COLOR}
      />
      <TabbedNavigator
        ref={(navigatorRef) => {
          navigate.setTopLevelNavigator(navigatorRef);
        }}
      />
      <ThumbButton
        editing={!!EntryEditor.entry}
        selected={EntryEditor.currentTab === 'Mind'}
        onPress={onThumbButtonPress}
      />
    </Root>
  );
});

export default App;
