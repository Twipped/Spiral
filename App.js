import React from 'react';
import { BRAND_COLOR } from './constants';
import { Root } from 'native-base';
import { View, StatusBar, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { dateToData } from './lib/common';
import navigate from './lib/navigate';
import { observer } from 'mobx-react/native';

import CalendarStore from './stores/CalendarStore';
import AgendaView from './views/Agenda';
import SettingsView from './views/Settings';
import ThumbButton from './components/ThumbButton';
import EntryView, { EntryEditor, EntryHeaderTitle } from './views/Entry';
import ForecastView from './views/Forecast';
import AnalyticsView from './views/Analytics';

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
    History: {
      screen: AgendaView,
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
    Forecast: {
      screen: ForecastView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="weather-lightning"
            color={tintColor}
            size={24}
          />
        ),
      }),
    },
    AddEntry: {
      screen: () => <View />,
      navigationOptions: () => ({
        tabBarLabel: ' ',
      }),
    },
    Analytics: {
      screen: AnalyticsView,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="chart-areaspline"
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

const EntryModal = createStackNavigator({
  CalendarEntry: {
    screen: EntryView,
    navigationOptions: ({navigation}) => ({
      headerTitle: <EntryHeaderTitle />,
      headerRight: (
        <Button
          onPress={() => navigation.pop()}
          title="Done"
          color="#fff"
        />
      ),
    }),
  },
},
{
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
});

const ModalNavigator = createStackNavigator(
  {
    TabbedNavigator,
    EntryModal,
  },
  {
    // initialRouteName: 'CalendarHome',
    mode: 'modal',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      header: null,
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
