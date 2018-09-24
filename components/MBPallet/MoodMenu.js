
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { material } from 'react-native-typography';
import { map } from 'lodash';
import color from 'color';

const MoodButton = ({ fill, textColor, caption, selected, pill, prime, onPress, ...props }) => {
  const [ buttonStyle, textStyle ] = buildStyles(fill, textColor, { pill, prime, selected });
  return <Button onPress={onPress} style={buttonStyle} {...props} ><Text style={textStyle}>{caption}</Text></Button>;
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
      pill: i > 0 ? 22 : false,
    };

    return (
      <MoodButton {...buttonProperties} />
    );
  });

  const primeButton = buttons.splice(0, 1);

  return (
    <View style={{ ...styles.main, ...props.style }}>
      <View style={styles.list}>{buttons}</View>
      {primeButton}
    </View>
  );
});

export const BodyMenu = observer(({ mood, entryEmotions, onToggleEmotion, ...props }) => {
  const groups = map(mood.groups, ({ symptoms, caption }) => {
    const buttons = symptoms.map((symptom) => {
      const key = `${mood.name}/${symptom}`;
      const selected = entryEmotions.has(key);
      const onPress = () => onToggleEmotion(key, !selected);

      var buttonProperties = {
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
        <View style={styles.list}>{buttons}</View>
      </View>
    );
  });
  return <View style={{ ...styles.main, ...props.style }}>{groups}</View>;
});

const styles = {
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  list: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },

  groupHeader: {
    ...StyleSheet.flatten(material.caption),
    color: '#FFF',
    height: 16,
    marginTop: 4,
    marginLeft: 10,
  },

};

function buildStyles (fillColor, textColor, flags) {
  const button = {
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 2,
    backgroundColor: fillColor,
    borderColor: fillColor,
  };

  const text = {
    ...StyleSheet.flatten(material.button),
    // fontWeight: 'bold',
    color: textColor || '#000',
  };

  if (flags.pill) {
    Object.assign(button, {
      width: flags.pill + '%',
      flexGrow: 1,
      flexShrink: 1,
      marginTop: 3,
      marginBottom: 3,
      marginLeft: 2,
      marginRight: 2,
    });

    Object.assign(text, {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingVertical: 0,
      paddingLeft: 2,
      paddingRight: 2,
      fontSize: 12,
    });
  }

  if (flags.prime) {
    Object.assign(button, {
      marginTop: 3,
      marginLeft: 2,
      marginRight: 2,
    });

    Object.assign(text, {
      fontSize: 14,
    });
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
