
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import Collapsible from 'react-native-collapsible';
import { map, chunk } from 'lodash';

import {
  MB_CONDITIONS,
  BRAND_COLOR_HIGHLIGHT,
  BRAND_COLOR_TINT,
} from '../../constants';

const MoodButton = ({ fill, textColor, caption, onPress, ...props }) => {
  const [ buttonStyle, textStyle ] = buildStyles(fill, textColor, { ...props });
  console.log(buttonStyle)
  return <TouchableOpacity onPress={onPress} style={buttonStyle} {...props} ><Text style={textStyle}>{caption}</Text></TouchableOpacity>;
};

export const MoodMenu = observer(({ mood, entryEmotions, ...props }) => {

  const buttons = mood.emotions.map((emotion, i) => {
    const key = `${mood.name}/${emotion}`;
    const selected = entryEmotions.has(key);
    const onPress = () => props.onToggleEmotion(key, !selected);

    var buttonProperties = {
      key,
      caption: emotion,
      fill: mood.fill,
      textColor: mood.color,
      selected,
      onPress,
      prime: i === 0,
      pill: i > 0 ? 30 : false,
    };

    return (
      <MoodButton {...buttonProperties} />
    );
  });

  const primeButton = buttons.splice(0, 1);

  return (
    <View style={{ ...styles.main, ...props.style }}>
      <View style={styles.buttonRow}>{buttons}</View>
      <View style={styles.buttonRow}>{primeButton}</View>
    </View>
  );
});

export const BodyMenu = observer(({ mood, entryEmotions, onToggleEmotion, ...props }) => {
  const groups = map(mood.groups, ({ symptoms, caption }) => {
    const buttons = symptoms.map((symptom) => {
      const key = `${mood.name}/${symptom}`;
      const selected = entryEmotions.has(key);
      const onPress = () => onToggleEmotion(key, !selected);

      const buttonProperties = {
        key,
        caption: symptom,
        fill: mood.fill,
        textColor: mood.color,
        selected,
        onPress,
        pill: 30,
      };

      return (
        <MoodButton {...buttonProperties} />
      );
    });

    return (
      <View key={`symptom/${caption}`}>
        <Text style={styles.groupHeader}>{caption}</Text>
        <View style={styles.buttonRow}>{buttons}</View>
      </View>
    );
  });
  return <View style={{ ...styles.main, ...props.style }}>{groups}</View>;
});


export class MindMenu extends React.Component {
  state = {
    activeCondition: null,
    previousCondition: null,
  };

  render () {
    const chunks = chunk(Object.values(MB_CONDITIONS), 2);
    const rows = [];

    let rowi = 0;
    chunks.forEach((pair) => {
      const siblings = pair.map(({ name }) => name);
      rows.push(
        <View key={`mindmenurow-${rowi++}`} style={styles.tabsHeader}>
          {pair.map((condition) => {
            const key = `condition/${condition.name}/button`;
            const collapsed = this.state.activeCondition !== condition.name;
            const buttonProperties = {
              key,
              caption: condition.caption,
              fill: BRAND_COLOR_HIGHLIGHT,
              textColor: 'black',
              onPress: () => this.setState({
                activeCondition: collapsed ? condition.name : null,
                previousCondition: this.state.activeCondition,
              }),
              tab: 1,
              collapsed,
            };

            return <MoodButton {...buttonProperties} />;
          })}
        </View>
      );

      rows.push(
        <View key={`mindmenurow-${rowi++}`} style={styles.tabsContent}>
          {pair.map((condition) => (
            <Collapsible
              key={`condition/${condition.name}/control`}
              collapsed={this.state.activeCondition !== condition.name}
              duration={
                (
                  siblings.includes(this.state.activeCondition)
                  && siblings.includes(this.state.previousCondition)
                ) ? 10 : 300
              }
            >
              <Card>
                <CardItem>
                  <Text>{condition.type}</Text>
                </CardItem>
              </Card>
            </Collapsible>
          ))}
        </View>
      );
    });

    return (
      <View style={{ ...styles.main, ...this.props.style }}>{rows}</View>
    );
  }
}

const styles = {
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },

  buttonRow: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  tabsHeader: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 0,
  },

  tabsContent: {
    // flex: 1,
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 0,
    marginBottom: 4,
    backgroundColor: BRAND_COLOR_HIGHLIGHT,
  },

  groupHeader: {
    ...StyleSheet.flatten(material.subheading),
    color: '#FFF',
    height: 24,
    marginTop: 4,
    marginLeft: 10,
  },

};

function buildStyles (fillColor, textColor, flags) {
  const button = {
    height: 30,
    borderRadius: 0,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: fillColor,
    borderColor: fillColor,
  };

  const text = {
    ...StyleSheet.flatten(material.button),
    color: textColor || '#000',
  };

  if (flags.pill) {
    Object.assign(button, {
      width: flags.pill + '%',
      flexGrow: 1,
      flexShrink: 1,
      marginTop: 3,
      marginBottom: 5,
      marginLeft: 4,
      marginRight: 4,
    });

    Object.assign(text, {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    });
  }

  if (flags.prime) {
    Object.assign(button, {
      flex: 1,
      marginTop: 3,
      marginLeft: 4,
      marginRight: 4,
    });

    Object.assign(text, {
      fontSize: 14,
    });
  }

  if (flags.tab) {
    Object.assign(button, {
      height: 44,
      width: 50 + '%',
      flexGrow: 1,
      flexShrink: 1,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 4,
      marginRight: 4,
      borderBottomWidth: 8,
    });

    Object.assign(text, {
      fontSize: 14,
    });

    if (flags.collapsed) {
      Object.assign(button, {
        height: 36,
        borderBottomWidth: 0,
      });
    }
  }

  if (flags.selected) {
    Object.assign(button, {
      backgroundColor: textColor,
      borderColor: fillColor,
    });

    Object.assign(text, {
      color: fillColor,
    });
  }

  return [ button, text ];
}
