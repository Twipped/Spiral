import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observable } from 'mobx';
import { variables } from 'native-base';
import { observer } from 'mobx-react/native';
import Arcs from '../../components/MBPallet/Arcs';
import { MoodMenu, BodyMenu, MindMenu } from '../../components/MBPallet/MoodMenu';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import moment from 'moment';

import {
  MB_MOODS,
} from '../../constants';

export const EntryEditor = observable({
  currentTab: 'Mind',
  currentHour: null,
  entry: null,

  get title () {
    var title;
    const { year, month, day, hour } = EntryEditor.currentHour;
    const start = moment([ year, month - 1, day, hour, 0, 0 ]);
    const end = moment([ year, month - 1, day, hour + 1, 0, 0 ]);
    const range = start.format('h:mma') + ' - ' + end.format('h:mma');

    const relativeDays = moment().diff(start, 'days');
    if (relativeDays === 0) title = 'Today';
    else if (relativeDays === 1) title = 'Yesterday';
    else if (relativeDays < 7) title = start.format('[Last] dddd');
    else title = start.format('MMM Do');
    return `${title}, ${range}`;
  },
});

export const EntryHeaderTitle = observer(() => (
  <View>
    <Text style={styles.headerTitle}>{EntryEditor.title}</Text>
    <Text style={styles.headerSubtitle}>{EntryEditor.currentTab}</Text>
  </View>
));

@observer
class EntryView extends React.Component {

  constructor (props) {
    super(props);

    const currentHour = props.navigation.getParam('hour');
    const { year, month, day, hour } = currentHour;

    EntryEditor.currentTab = 'Mind';
    EntryEditor.currentHour = currentHour;
    EntryEditor.entry = props.calendarStore.getHour(year, month, day, hour, true);
  }

  componentWillUnmount () {
    EntryEditor.currentTab = null;
    EntryEditor.currentHour = null;
    EntryEditor.entry = null;
  }

  onTabSwitch = (tab) => {
    EntryEditor.currentTab = tab;
  };

  onToggleEmotion = (emotionKey, selected) => {
    EntryEditor.entry.setEmotion(emotionKey, selected);
  };

  onSetCondition = (conditionKey, value) => {
    EntryEditor.entry.setCondition(conditionKey, value);
  };

  render () {
    const tabName = EntryEditor.currentTab || 'Mind';
    let tabbedComponent = null;

    switch (tabName) {
    case 'Anger':
    case 'Anxiety':
    case 'Joy':
    case 'Sad':
      tabbedComponent = (
        <MoodMenu
          entryEmotions={EntryEditor.entry._emotions}
          mood={MB_MOODS[tabName]}
          onToggleEmotion={this.onToggleEmotion}
        />
      );
      break;
    case 'Body':
      tabbedComponent = (
        <BodyMenu
          entryEmotions={EntryEditor.entry._emotions}
          mood={MB_MOODS[tabName]}
          onToggleEmotion={this.onToggleEmotion}
        />
      );
      break;

    case 'Mind':
      tabbedComponent = (
        <MindMenu
          conditions={EntryEditor.entry.conditions}
          onChange={this.onSetCondition}
        />
      );
      break;
    default:
      break; // nope
    }

    return (
      <View style={styles.container}>
        <InvertibleScrollView inverted style={{ flex: 1 }}>{tabbedComponent}</InvertibleScrollView>
        <Arcs onTabSwitch={this.onTabSwitch} entry={EntryEditor.entry} currentTab={EntryEditor.currentTab} />
      </View>
    );
  }
}

export default EntryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#111',
  },

  headerTitle: {
    fontSize: variables.titleFontSize - 2,
    fontFamily: variables.titleFontfamily,
    textAlign: 'center',
    fontWeight: '500',
    paddingBottom: 3,
    color: '#FFF',
  },

  headerSubtitle: {
    fontSize: variables.subTitleFontSize,
    fontFamily: variables.titleFontfamily,
    color: '#EEE',
    textAlign: 'center',
  }
});
