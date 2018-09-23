
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { observer } from 'mobx-react/native';

const MoodMenu = observer((props) => {
  const mood = props.mood;
  const emotions = mood.emotions.slice(1);
  const primeEmotion = mood.emotions[0];
  const primeKey = `${mood.name}/${primeEmotion}`;

  const MoodButton = ({ emotion, selected, pill, prime }) => {
    const key = `${mood.name}/${emotion}`;

    const [ buttonStyle, textStyle ] = buildStyles(mood.fill, { pill, prime, selected });

    const bProps = {
      key: `emotion/${key}`,
      onPress: () => props.onToggleEmotion(key, !selected),
      style: buttonStyle,
    };

    return <Button {...bProps} ><Text style={textStyle}>{emotion}</Text></Button>;
  };

  const buttons = emotions.map((emotion) => {
    const key = `${mood.name}/${emotion}`;
    const selected = props.entryEmotions.has(key);
    return <MoodButton key={key} pill emotion={emotion} selected={selected} />;
  });

  return (
    <View style={{ ...styles.main, ...props.style }}>
      <View style={styles.list}>{buttons}</View>
      <MoodButton key={primeKey} prime emotion={primeEmotion} selected={props.entryEmotions.has(primeKey)} />
    </View>
  );
});

export default MoodMenu;

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

};

function buildStyles (color, flags) {
  const button = {
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: color,
  };

  const text = {
    fontWeight: 'bold',
    color: '#FFF',
  };

  if (flags.pill) {
    Object.assign(button, {
      width: '22%',
      flexGrow: 1,
      marginTop: 3,
      marginBottom: 3,
      marginLeft: 2,
      marginRight: 2,
    });

    Object.assign(text, {
      marginLeft: 0,
      marginRight: 0,
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
      backgroundColor: '#FFF',
    });

    Object.assign(text, {
      color,
    });
  }

  return [ button, text ];
}
