import React from 'react';
import { StyleSheet, View } from 'react-native';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react/native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import MBPallet from '../../components/MBPallet';
import MoodMenu from '../../components/MBPallet/MoodMenu';

import {
  MB_MOODS,
  MB_MOOD_MAP,
} from '../../constants';


@observer
class EntryView extends React.Component {

  constructor (props) {
    super(props);

    const currentHour = props.navigation.getParam('hour');
    const { year, month, day, hour } = currentHour;

    this.state = {
      currentTab: null,
      currentHour,
      entry: props.calendarStore.getHour(year, month, day, hour, true),
    };

  }

  onTabSwitch = (tab) => {
    this.setState({ currentTab: tab });
  };

  onToggleEmotion = (emotionKey, selected) => {
    this.state.entry.setEmotion(emotionKey, selected);
  };

  render () {
    const tabName = this.state.currentTab;
    let tabbedComponent = null;

    switch (tabName) {
    case 'Anger':
    case 'Anxiety':
    case 'Joy':
    case 'Sadness':
      tabbedComponent = (
        <MoodMenu
          entryEmotions={this.state.entry.emotions}
          mood={MB_MOODS[MB_MOOD_MAP[tabName]]}
          onToggleEmotion={this.onToggleEmotion}
        />
      );
      break;

    default:
      tabbedComponent = null;
    }

    return (
      <View style={styles.container}>
        {tabbedComponent}
        <MBPallet onTabSwitch={this.onTabSwitch} />
      </View>
    );
  }
}

export default withMappedNavigationProps()(EntryView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
});
