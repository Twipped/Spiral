
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { merge } from 'lodash';

export default function MoodMenu (props) {
  const mood = props.mood;
  const emotions = mood.emotions.slice(1);
  const primeEmotion = mood.emotions[0];

  function makeButton (emotion, buttonProps) {
    const key = `emotion/${mood.name}/${emotion}`;
    const isActive = props.activeEmotions.has(key);

    const styleStack = [
      { backgroundColor: mood.fill },
      styles.itemCommon,
      ...buttonProps.styles,
    ];

    // map selected style if button is selected
    if (isActive) {
      styleStack.push(styles.itemSelected);
    }

    const style = merge(...styleStack);

    const textStyle = style['NativeBase.Text'] || {};
    delete style['NativeBase.Text'];

    const bProps = {
      key,
      onPress: () => props.toggleMood(key),
      style,
    };

    return <Button {...bProps} ><Text style={textStyle}>{emotion}</Text></Button>;
  }

  const buttons = emotions.map((emotion) => makeButton(emotion, { styles: [ styles.itemPill ] }));

  return (
    <View style={styles.main}>
      <View style={styles.list}>{buttons}</View>
      {makeButton(primeEmotion, { styles: [ styles.itemPrime ] })}
    </View>
  );
}

const styles = {
  main: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  list: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },

  itemCommon: {
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 2,
    paddingRight: 2,
    'NativeBase.Text': {
      fontWeight: 'bold',
    },
  },

  itemSelected: {
    borderWidth: 2,
    borderColor: '#FFF',
  },

  itemPill: {
    width: '22%',
    flexGrow: 1,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 2,
    marginRight: 2,
    'NativeBase.Text': {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 2,
      paddingRight: 2,
      fontSize: 12,
    },
  },

  itemPrime: {
    marginTop: 3,
    marginLeft: 2,
    marginRight: 2,
    'NativeBase.Text': {
      fontSize: 14,
    },
  },

};
