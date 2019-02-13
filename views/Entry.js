import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { observable } from 'mobx';
import { variables } from 'native-base';
import { observer } from 'mobx-react/native';
import MBPallet from '../components/MBPallet';
import ConditionMenu from '../components/ConditionMenu';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import moment from 'moment';
import CalendarStore from '../stores/CalendarStore';
import Conditions from '../stores/Conditions';


export const EntryEditor = observable({
  currentTab: null,
  currentHour: null,
  entry: null,

  get title () {
    var title;
    const { year, month, day, hour } = EntryEditor.currentHour;
    const start = moment([ year, month - 1, day, hour, 0, 0 ]);
    const end = moment(start).add(1, 'hour');
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
    EntryEditor.entry = CalendarStore.getHour(year, month, day, hour, true);
  }

  componentWillUnmount () {
    EntryEditor.currentTab = null;
    EntryEditor.currentHour = null;
    EntryEditor.entry = null;
  }

  onTabSwitch = (tab) => {
    EntryEditor.currentTab = tab;
    this.scrollview.scrollTo({ y: 0, animated: false });
  };

  onSetValue = (valueKey, value) => {
    console.log('onSetValue', valueKey, value);
    EntryEditor.entry.setValue(valueKey, value);
  };

  render () {
    const tabName = EntryEditor.currentTab || 'Mind';
    let tabbedComponent = null;

    switch (tabName) {
    case 'Anger':
    case 'Anxiety':
    case 'Neutral':
    case 'Joy':
    case 'Sad':
      tabbedComponent = (
        <ConditionMenu
          conditions={Conditions.getForClass(tabName, EntryEditor.entry.values)}
          hash={EntryEditor.entry.hash}
          onChange={this.onSetValue}
        />
      );
      break;
    case 'Body':
      tabbedComponent = (
        <ConditionMenu
          conditions={Conditions.getForClass('Body', EntryEditor.entry.values)}
          hash={EntryEditor.entry.hash}
          onChange={this.onSetValue}
        />
      );
      break;

    case 'Mind':
      tabbedComponent = (
        <ConditionMenu
          conditions={Conditions.getForClass('Mind', EntryEditor.entry.values)}
          hash={EntryEditor.entry.hash}
          onChange={this.onSetValue}
        />
      );
      break;
    default:
      break; // nope
    }

    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'always', top: 'never' }}>
        <InvertibleScrollView ref={(sv) => { this.scrollview = sv; }} inverted style={{ flex: 1 }}>
          {tabbedComponent}
        </InvertibleScrollView>
        <MBPallet onTabSwitch={this.onTabSwitch} entry={EntryEditor.entry} currentTab={EntryEditor.currentTab} />
      </SafeAreaView>
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
  },
});
