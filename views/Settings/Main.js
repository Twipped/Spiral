import React from 'react';
import { Clipboard, Alert } from 'react-native';
import { Container, Separator, Content, Button, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarStore from '../../stores/CalendarStore';
import Promise from 'bluebird';

class SettingsMain extends React.Component {

  backupExport = async () => {
    const data = await CalendarStore.export();
    await Clipboard.setString(data);
  }

  backupImport = async () => {
    const data = await Clipboard.getString();
    if (!await prompt('Import from Clipboard?', 'This could overwrite any data currently recorded. Do you wish to continue?')) return;
    const ok = await CalendarStore.import(data);
    Alert.alert('Import Finished', ok ? 'Data imported successfully' : 'Some or all of the data in the clipboard could not be imported.');
  }

  clearAllData = async () => {
    if (!await prompt('Clear all data?', 'This will erase all recorded calendar data. Are you sure you wish to proceed?')) return;
    await CalendarStore.clear(true);
    Alert.alert('Data Purged', 'Data has been removed');
  }

  render () {
    return (
      <Container>
        <Content>
          <ListItem itemHeader first>
            <Text>Backup Data</Text>
          </ListItem>
          <ListItem icon button onPress={this.backupExport}>
            <Left>
              <MaterialCommunityIcons name="calendar-export" size={32} />
            </Left>
            <Body>
              <Text>Export Backup to Clipboard</Text>
            </Body>
          </ListItem>
          <ListItem icon button onPress={this.backupImport}>
            <Left>
              <MaterialCommunityIcons name="calendar-import" size={32} />
            </Left>
            <Body>
              <Text>Import Backup From Clipboard</Text>
            </Body>
          </ListItem>
          <ListItem itemHeader first>
            <Text>Data Purge</Text>
          </ListItem>
          <ListItem icon button onPress={this.clearAllData}>
            <Left>
              <MaterialCommunityIcons name="calendar-remove" size={32} />
            </Left>
            <Body>
              <Text>Delete All Recorded Data</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

function prompt (title, message) {
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: 'No', onPress: resolve.bind(null, false) },
      { text: 'Yes', onPress: resolve.bind(null, true) },
    ], { cancelable: false });
  });
}

export default SettingsMain;
