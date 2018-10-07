/* eslint object-property-newline:0 */

export const BRAND_COLOR = '#973999';
export const BRAND_COLOR_DARK = '#990099';
export const BRAND_COLOR_LIGHT = '#D16FFF';

export const BGCOLOR_0 = '#1e2124';
export const BGCOLOR_1 = '#282b30';
export const BGCOLOR_2 = '#36393e';
export const BGCOLOR_3 = '#424549';

export const MB_PRESS_DURATION = 500;
export const MB_BUTTON_RADIUS = 46;
export const MB_BUTTON_PRESSED_PROPS = { fill: BRAND_COLOR_DARK, stroke: '#FFF', strokeWidth: 4 };
export const MB_BUTTON_INACTIVE_PROPS = { fill: BRAND_COLOR_LIGHT, stroke: '#FFF', strokeWidth: 3, color: BRAND_COLOR_DARK };
export const MB_BUTTON_ACTIVE_PROPS = { fill: BRAND_COLOR_LIGHT, stroke: '#000', strokeWidth: 3, color: BRAND_COLOR_DARK };

export const MB_ARCH_SPACING = 5;
export const MB_ARC_LENGTH_FACTOR = 0.5;
export const MB_INNER_ARC_THICKNESS_FACTOR = 0.5;
export const MB_INNER_ARC_PADDING = 0.04;
export const MB_ARC_SIDEBUTTON_WIDTH = 40;
export const MB_MOOD_INACTIVE_PROPS = { stroke: '#333', strokeWidth: 1 };
export const MB_MOOD_PRESSED_PROPS  = { stroke: '#333', strokeWidth: 1 };
export const MB_MOOD_ACTIVE_PROPS   = { stroke: '#FFF', strokeWidth: 4 };
export const MB_MOOD_TEXT_PROPS = {
  fontSize: 14,
  fontWeight: 'bold',
  fill: '#111',
  alignment: 'center',
};
export const MB_MOODS = {
  Anger: { name: 'Anger', fill: '#e02929', color: '#FFF', emotions: [
    'Angry',
    'Disrespected', 'Embarrassed', 'Persecuted',
    'Bitter', 'Disgruntled', 'Indignant',
    'Horrified', 'Violated', 'Frustrated',
    'Annoyed', 'Mad', 'Furious',
    'Aggressive', 'Hostile', 'Snappy',
    'Jealous', 'Envious', 'Spiteful',
  ] },
  Anxiety: { name: 'Anxiety', fill: '#F78200', color: '#FFF', emotions: [
    'Anxious',
    'Stressed', 'Overwhelmed', 'Rushed',
    'Tired', 'Unfocused', 'Distracted',
    'Nervous', 'Insecure', 'Worried',
    'Fearful', 'Emotional', 'Impatient',
    'Apathetic', 'Numb', 'Bored',
  ] },
  Body: { name: 'Body', fill: '#FFB900', color: '#000', groups: [
    { caption: 'General', symptoms: [
      'Body Aches', 'Nausea', 'Hot Flashes', 'Joint Pain', 'Tight Muscles', 'Numbness',
    ] },
    { caption: 'Head and Neck', symptoms: [
      'Headache', 'Migraine', 'Neck Pain', 'Lightheaded', 'Dizziness', 'Hair Loss',
    ] },
    { caption: 'Chest', symptoms: [
      'Breast Swelling', 'Tenderness', 'Breast Pain',
    ] },
    { caption: 'Abdomen and Digestion', symptoms: [
      'Cramping', 'Bloating', 'Pressure Pain', 'Stomach Ache', 'Indigestion', 'Gas', 'Constipation', 'Loose Stool', 'Diarrhea',
    ] },
  ] },
  Joy: { name: 'Joy', fill: '#5EBD3E', color: '#000', emotions: [
    'Happy',
    'Calm', 'Content', 'Peaceful',
    'Confident', 'Proud', 'Motivated',
    'Inspired', 'Courageous', 'Hopeful',
    'Loving', 'Thankful', 'Intimate',
    'Frisky', 'Cheeky', 'Playful',
    'Excited', 'Energetic', 'Curious',
  ] },
  Sad: { name: 'Sad', fill: '#009CDF', color: '#000', emotions: [
    'Sad',
    'Disappointed', 'Disillusioned', 'Depressed',
    'Embarrassed', 'Rejected', 'Ignored',
    'Lonely', 'Isolated', 'Abandoned',
    'Fragile', 'Grief', 'Weepy',
    'Anguish', 'Despair', 'Powerless', 'Empty',
    'Guilt', 'Shame', 'Vulnerable',
  ] },
};

export const MB_CONDITIONS = {
  'dysphoria':           {
    name: 'dysphoria',
    caption: 'General Dysphoria',
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
  'dysphoria:body':           {
    name: 'dysphoria:body',
    caption: 'Body Dysphoria',
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
  'appetite':            {
    name: 'appetite',
    caption: 'Appetite',
    type: 'PlusMinus',
    options: [
      [ -2, 'Absent' ],
      [ -1, 'Reduced' ],
      [  0, 'Average' ],
      [  1, 'Increased' ],
      [  2, 'Ravenous' ],
    ],
    default: 0,
  },
  'body-confidence':     {
    name: 'body-confidence',
    caption: 'Body Confidence',
    type: 'PlusMinus',
    options: [
      [ -2, 'Very Poor' ],
      [ -1, 'Poor' ],
      [  0, 'Average' ],
      [  1, 'Good' ],
      [  2, 'Very Good' ],
    ],
    default: 0,
  },
  'sex-drive':           {
    name: 'sex-drive',
    caption: 'Sex Drive',
    type: 'PlusMinus',
    tags: [ 'Allosexual' ],
    description: 'How strong is your desire to initiate sex.',
    options: [
      [ -1, 'Absent' ],
      [  0, 'Normal' ],
      [  1, 'Horny' ],
    ],
    default: 0,
  },
  'sex-crave':           {
    name: 'sex-crave',
    caption: 'Sexual Thirst',
    type: 'PlusMinus',
    tags: [ 'Allosexual' ],
    description: 'How strongly do you crave sexual attention.',
    options: [
      [ -1, 'Nope' ],
      [  0, 'Normal' ],
      [  1, 'Want' ],
    ],
    default: 0,
  },
  'emotional-stability': {
    name: 'emotional-stability',
    caption: 'Emotional Stability',
    type: 'PlusMinus',
    description: 'Are you experiencing dramatic mood swings?',
    options: [
      [  0, 'No' ],
      [ -1, 'Yes' ],
      [ -2, 'Significantly' ],
    ],
    default: 0,
  },
  'sleep':               { name: 'sleep',
    caption: 'Sleep Quality',
    type: 'PlusMinus',
    options: [
      [ -2, 'No Sleep' ],
      [ -1, 'Some Insomnia' ],
      [ 0, 'Average' ],
      // [ 1, 'Good' ],
      [ 2, 'Well Rested' ],
    ],
  },
  'weight':              { name: 'weight', caption: 'Weight', type: 'Decimal' },
  'temperature':         { name: 'temperature', caption: 'Basal Body Temperature', type: 'Decimal' },

};
