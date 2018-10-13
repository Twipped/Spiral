import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { dateToData } from './lib/common';
import navigate from './lib/navigate';
import { observer } from 'mobx-react/native';

import CalendarStore from './stores/CalendarStore';
import AgendaView from './views/Calendar/Agenda';
import SettingsView from './views/Settings';
import ThumbButton from './components/ThumbButton';
import EntryView, { EntryEditor, EntryHeaderTitle } from './views/Calendar/Entry';

function getActiveRouteName (navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const TabbedNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: (props) => (<AgendaView {...props} calendarStore={CalendarStore} />),
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

const ModalNavigator = createStackNavigator(
  {
    CalendarHome: {
      screen: TabbedNavigator,
      navigationOptions: () => ({ title: 'Spiral', headerBackTitle: 'Done' }),
    },
    CalendarEntry: {
      screen: (props) => (<EntryView {...props} calendarStore={CalendarStore} />),
      navigationOptions: {
        headerTitle: <EntryHeaderTitle />,
      },
    },
  },
  {
    initialRouteName: 'CalendarHome',
    mode: 'modal',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      barStyle: 'dark-content',
      headerStyle: {
        backgroundColor: BRAND_COLOR,
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
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
      <ModalNavigator
        ref={(navigatorRef) => {
          navigate.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = getActiveRouteName(currentState);
          if (currentScreen !== 'CalendarEntry') EntryEditor.currentTab = null;
        }}
      />
      <ThumbButton
        editing={!!EntryEditor.currentTab}
        selected={EntryEditor.currentTab === 'Mind'}
        onPress={onThumbButtonPress}
      />
    </Root>
  );
});

export default App;
