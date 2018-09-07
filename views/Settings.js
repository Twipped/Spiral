import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { observer } from 'mobx-react';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { Container, Separator, Content, Button, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';


// @observer
class SettingsView extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render () {
    return (
      <Container>
        <Content>
          <Separator />
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="plane" />
              </Button>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default withMappedNavigationProps()(SettingsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

  field: {
    flexDirection: 'row',
    marginLeft: -50,
    marginRight: -50,
  },
});
