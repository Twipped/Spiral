/* eslint object-property-newline:0 */

import React from 'react';
import Emoji from 'react-native-emoji';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Emotions from './Icons/Emotions';

export const BRAND_COLOR = '#973999';
export const BRAND_COLOR_DARK = '#990099';
export const BRAND_COLOR_LIGHT = '#D16FFF';
export const COLOR_RED = '#e02929';
export const COLOR_ORANGE = '#F78200';
export const COLOR_YELLOW = '#FFB900';
export const COLOR_GREEN = '#5EBD3E';
export const COLOR_BLUE = '#009CDF';

export const BGCOLOR_0  = '#1e2124';
export const BGCOLOR_1  = '#282b30';
export const BGCOLOR_2  = '#36393e';
export const BGCOLOR_3  = '#424549';
export const BGCOLOR_4  = '#5a5e64';
export const BGCOLOR_5  = '#72787f';
export const BGCOLOR_6  = '#8c9197';
export const BGCOLOR_7  = '#a7abb0';
export const BGCOLOR_8  = '#cbcdd0';
export const BGCOLOR_9  = '#efeff0';
export const BGCOLOR_10 = '#ffffff';

export const MB_PRESS_DURATION = 500;
export const MB_BUTTON_RADIUS = 46;

export const MB_ARCH_SPACING = 5;
export const MB_ARC_LENGTH_FACTOR = 0.5;
export const MB_INNER_ARC_THICKNESS_FACTOR = 0.5;
export const MB_INNER_ARC_PADDING = 0.04;
export const MB_ARC_SIDEBUTTON_WIDTH = 40;
export const MB_MOOD_INACTIVE_PROPS = { stroke: '#333', strokeWidth: 1 };
export const MB_MOOD_PRESSED_PROPS  = { stroke: '#333', strokeWidth: 1 };
export const MB_MOOD_ACTIVE_PROPS   = { stroke: '#FFF', strokeWidth: 4 };
export const MB_MAX_BUTTON_STROKE = Math.max(
  MB_MOOD_PRESSED_PROPS.strokeWidth,
  MB_MOOD_ACTIVE_PROPS.strokeWidth,
  MB_MOOD_INACTIVE_PROPS.strokeWidth
);
export const MB_MOOD_TEXT_PROPS = {
  fontSize: 14,
  fontWeight: 'bold',
  fill: '#111',
  alignment: 'center',
};
export const MB_MOODS = {
  Anger: { name: 'Anger', fill: COLOR_RED, color: '#fceaea', emotions: [
    'Angry',
    'Disrespected', 'Embarrassed', 'Persecuted',
    'Bitter', 'Disgruntled', 'Indignant',
    'Horrified', 'Violated', 'Frustrated',
    'Aggressive', 'Annoyed', 'Hostile',
    'Jealous', 'Envious', 'Spiteful',
  ] },
  Anxiety: { name: 'Anxiety', fill: COLOR_ORANGE, color: '#000099', emotions: [
    'Anxious',
    'Stressed', 'Overwhelmed', 'Rushed',
    'Nervous', 'Insecure', 'Worried',
    'Fearful', 'Emotional', 'Impatient',
    'Tired', 'Unfocused', 'Distracted',
  ] },
  Neutral: { name: 'Neutral', fill: COLOR_YELLOW, color: '#000', emotions: [
    'Neutral',
    'Apathetic', 'Numb', 'Bored',
    'Blah', 'Empty', 'Unmotivated',
  ] },
  Joy: { name: 'Joy', fill: COLOR_GREEN, color: '#000000', emotions: [
    'Happy',
    'Calm', 'Content', 'Peaceful',
    'Confident', 'Proud', 'Motivated',
    'Inspired', 'Courageous', 'Hopeful',
    'Loving', 'Thankful', 'Intimate',
    'Frisky', 'Cheeky', 'Playful',
    'Excited', 'Energetic', 'Curious',
  ] },
  Sad: { name: 'Sad', fill: COLOR_BLUE, color: '#000', emotions: [
    'Sad',
    'Rejected', 'Ignored', 'Vulnerable',
    'Lonely', 'Isolated', 'Abandoned',
    'Fragile', 'Grief', 'Weepy',
    'Anguish', 'Despair', 'Powerless',
    'Guilt', 'Shame', 'Embarrassed',
    'Disappointed', 'Disillusioned', 'Depressed',
  ] },
  Body: { name: 'Body', fill: COLOR_YELLOW, color: '#000', groups: [
    { caption: 'Head and Neck', symptoms: [
      'Headache', 'Migraine', 'Neck Pain', 'Lightheaded', 'Dizziness', 'Hair Loss',
    ] },
    { caption: 'Chest', symptoms: [
      'Breast Swelling', 'Tenderness', 'Breast Pain',
    ] },
    { caption: 'Abdomen and Digestion', symptoms: [
      'Cramping', 'Bloating', 'Pressure Pain', 'Stomach Ache', 'Indigestion', 'Gas', 'Constipation', 'Loose Stool', 'Diarrhea',
    ] },
    { caption: 'General', symptoms: [
      'Body Aches', 'Nausea', 'Hot Flashes', 'Joint Pain', 'Tight Muscles', 'Numbness',
    ] },
  ] },
};

export const MB_EMOJI_SIZE = 30;
export const MB_CONDITIONS = {
  'appetite': {
    name: 'appetite',
    className: 'mind',
    caption: 'Appetite',
    type: 'PlusMinus',
    options: [
      [ -2, 'Absent', <MaterialIcons name="exposure-neg-2" size={MB_EMOJI_SIZE} color="white" /> ],
      [ -1, 'Reduced', <MaterialIcons name="exposure-neg-1" size={MB_EMOJI_SIZE} color="white" /> ],
      [  0, 'Average' ],
      [  1, 'Increased', <MaterialIcons name="exposure-plus-1" size={MB_EMOJI_SIZE} color="white" /> ],
      [  2, 'Ravenous', <MaterialIcons name="exposure-plus-2" size={MB_EMOJI_SIZE} color="white" /> ],
    ],
    default: 0,
  },
  'sex-crave': {
    name: 'sex-crave',
    className: 'mind',
    caption: 'Sexual Thirst',
    type: 'PlusMinus',
    tags: [ 'Allosexual' ],
    description: 'How strongly do you crave physical attention.',
    options: [
      [ -1, 'Stay Away', <FontAwesome name="minus-circle" size={MB_EMOJI_SIZE} color={COLOR_RED} />  ],
      [  0, 'Meh',       <FontAwesome name="circle" size={MB_EMOJI_SIZE} color="yellow" /> ],
      [  1, 'Want',      <FontAwesome name="plus-circle" size={MB_EMOJI_SIZE} color={COLOR_GREEN} />  ],
      // [  2, 'Need',      <FontAwesome name="exclamation-circle" size={MB_EMOJI_SIZE} color="white" /> ],
    ],
    default: 0,
  },
  'sex-drive': {
    name: 'sex-drive',
    className: 'mind',
    caption: 'Sex Drive',
    type: 'PlusMinus',
    tags: [ 'Allosexual' ],
    description: 'How strong is your desire to initiate sex.',
    options: [
      [ -1, 'Absent', <FontAwesome name="minus-circle" size={MB_EMOJI_SIZE} color={COLOR_RED} /> ],
      [  0, 'Normal', <FontAwesome name="circle" size={MB_EMOJI_SIZE} color="yellow" /> ],
      [  1, 'Horny',  <FontAwesome name="plus-circle" size={MB_EMOJI_SIZE} color={COLOR_GREEN} /> ],
    ],
    default: 0,
  },
  'gender-dysphoria': {
    name: 'gender-dysphoria',
    className: 'mind',
    caption: 'Gender Dysphoria',
    type: 'PlusMinus',
    tags: [ 'Transgender' ],
    options: [
      [ -2, 'High' ],
      [  0, 'Average' ],
      [  1, 'None' ],
      [  2, 'Euphoric' ],
    ],
    default: 0,
  },
  'vocal-quality': {
    name: 'vocal-quality',
    className: 'mind',
    caption: 'Vocal Tone Quality',
    type: 'PlusMinus',
    tags: [ 'Transgender' ],
    description: 'How satisfied are you with the quality of your voice?',
    options: [
      [ -2, 'Awful' ],
      [  0, 'Acceptable' ],
      [  1, 'Good' ],
      [  2, 'Excellent' ],
    ],
    default: 0,
  },
  'social-anxiety': {
    name: 'social-anxiety',
    className: 'mind',
    caption: 'Social Anxiety',
    type: 'PlusMinus',
    options: [
      [  0, 'None'  ],
      [ -1, 'Low'  ],
      [ -2, 'High'  ],
    ],
    default: 0,
  },
  'emotional-stability': {
    name: 'emotional-stability',
    className: 'mind',
    caption: 'Emotional Stability',
    type: 'PlusMinus',
    description: 'How rapidly are you shifting between strong moods.',
    options: [
      [  0, 'Stable' ],
      [ -1, 'Unstable' ],
      [ -2, 'Wild' ],
    ],
    default: 0,
  },
  'body-confidence': {
    name: 'body-confidence',
    className: 'mind',
    caption: 'Body Confidence',
    type: 'PlusMinus',
    options: [
      [ -2, 'Very Poor', <Emotions.Sad height={MB_EMOJI_SIZE} color="white" /> ],
      [ -1, 'Poor',      <Emotions.Uncomfortable height={MB_EMOJI_SIZE} color="white" /> ],
      [  0, 'Average',   <Emotions.Neutral height={MB_EMOJI_SIZE} color="white" /> ],
      [  1, 'Good',      <Emotions.Happy height={MB_EMOJI_SIZE} color="white" /> ],
      [  2, 'Very Good', <Emotions.VeryHappy height={MB_EMOJI_SIZE} color="white" /> ],
    ],
    default: 0,
  },
  'general-mood': {
    name: 'general-mood',
    className: 'mind',
    caption: 'General Mood',
    type: 'PlusMinus',
    options: [
      [ -2, 'Sad',        <Emotions.Sad height={MB_EMOJI_SIZE} color="white" /> ],
      [ -1, 'Unhappy',    <Emotions.Uncomfortable height={MB_EMOJI_SIZE} color="white" /> ],
      [  0, 'Neutral',    <Emotions.Neutral height={MB_EMOJI_SIZE} color="white" /> ],
      [  1, 'Happy',      <Emotions.Happy height={MB_EMOJI_SIZE} color="white" /> ],
      [  2, 'Very Happy', <Emotions.VeryHappy height={MB_EMOJI_SIZE} color="white" /> ],
    ],
    default: 0,
  },


  'sleep': {
    name: 'sleep',
    className: 'body',
    caption: 'Sleep Quality',
    description: 'How well did you sleep last night?',
    type: 'PlusMinus',
    options: [
      [ -1, 'Poor', <Emoji name="thumbsdown" style={{ fontSize: MB_EMOJI_SIZE }} /> ],
      [  0, 'OK',   <Emoji name="ok_hand" style={{ fontSize: MB_EMOJI_SIZE }} /> ],
      [  1, 'Good', <Emoji name="thumbsup" style={{ fontSize: MB_EMOJI_SIZE }} /> ],
    ],
  },
  'temperature':         {
    name: 'temperature',
    className: 'body',
    caption: 'Basal Body Temperature',
    type: 'Temperature',
  },

  'weight': {
    name: 'weight',
    className: 'body',
    caption: 'Weight',
    type: 'Decimal',
  },


};
