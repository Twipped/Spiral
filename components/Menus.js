
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import Collapsible from 'react-native-collapsible';
import { map, chunk } from 'lodash';

import Condition from './Conditions';

import {
  BRAND_COLOR_DARK,
  BRAND_COLOR_LIGHT,
} from '../constants';

class MoodButton extends React.PureComponent {

  handlePress = () => {
    if (this.props.onPress) this.props.onPress(this.props);
  }

  render () {
    const { fill, textColor, caption, ...props } = this.props;
    const [ buttonStyle, textStyle ] = buildStyles(fill, textColor, { ...props });
    return (
      <TouchableOpacity
        {...props}
        onPress={this.handlePress}
        style={buttonStyle}
      >
        <Text style={textStyle}>{caption}</Text>
      </TouchableOpacity>
    );
  }
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

export class ConditionMenu extends React.Component {
  state = {
    activeCondition: null,
    previousCondition: null,
  };

  handleTabSwitch = ({ collapsed, conditionName }) => {
    this.setState({
      activeCondition: collapsed ? conditionName : null,
      previousCondition: this.state.activeCondition,
    });
  }

  render () {
    if (!this.props.conditions) return null;

    const HR = () => (
      <View
        style={{
          backgroundColor: BRAND_COLOR_DARK,
          marginVertical: 10,
          marginHorizontal: 10,
          height: 3,
          borderRadius: 1,
        }}
      />
    );

    const className = this.props.className;

    let conditions = Object.values(this.props.conditions).map((condition, rowi) => {
      if (className && condition.className !== className) return null;

      return (
        <View key={`condition-row-${rowi}`} >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{condition.caption}</Text>
          {!!condition.description && <Text style={{ color: 'white', textAlign: 'center' }}>{condition.description}</Text>}
          <Condition {...condition} onChange={this.props.onChange} value={condition.value} />
        </View>
      );
    }).filter(Boolean);

    // insert horizontal dividers
    conditions = conditions.reduce((arr, item, index) => {
      if (index) arr.push(<HR key={`hr-row-${index}`} />);
      arr.push(item);
      return arr;
    }, []);

    return (
      <View style={{ ...styles.main, ...this.props.style }}>
        {conditions}
      </View>
    );
  }
}

export class ConditionMenuCollapsed extends React.Component {
  state = {
    activeCondition: null,
    previousCondition: null,
  }

  handleTabSwitch = ({ collapsed, conditionName }) => {
    this.setState({
      activeCondition: collapsed ? conditionName : null,
      previousCondition: this.state.activeCondition,
    });
  }

  render () {
    if (!this.props.conditions) return;
    const chunks = chunk(Object.values(this.props.conditions), 2);
    const rows = [];

    let rowi = 0;
    chunks.forEach((pair) => {
      const siblings = pair.map(({ name }) => name);
      rows.push(
        <View key={`mindmenurow-${rowi++}`} style={styles.tabsHeader}>
          {pair.map((condition) => {
            const key = `condition/${condition.name}/button`;
            const buttonProperties = {
              key,
              caption: condition.caption,
              fill: BRAND_COLOR_LIGHT,
              textColor: 'black',
              onPress: this.handleTabSwitch,
              conditionName: condition.name,
              tab: 1,
              collapsed: this.state.activeCondition !== condition.name,
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
              easing={
                (
                  siblings.includes(this.state.activeCondition)
                  && siblings.includes(this.state.previousCondition)
                ) ? 'step0' : 'ease'
              }
            >
              {condition.description && <Text style={styles.tabsDescription}>{condition.description}</Text>}
              <Condition {...condition} onChange={this.props.onChange} value={condition.value} />
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
    paddingTop: 5,
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
    backgroundColor: BRAND_COLOR_LIGHT,
  },

  tabsDescription: {
    alignSelf: 'center',
    marginTop: 5,
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
    height: 44,
    borderRadius: 22,
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
      marginTop: 5,
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
