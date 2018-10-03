/* eslint object-property-newline:0 */

export const BRAND_COLOR = '#973999';
export const BRAND_COLOR_TINT = '#990099';
export const BRAND_COLOR_HIGHLIGHT = '#D16FFF';

export const MB_PRESS_DURATION = 500;
export const MB_BUTTON_RADIUS = 46;
export const MB_BUTTON_PRESSED_PROPS = { fill: BRAND_COLOR_TINT, stroke: '#FFF', strokeWidth: 4 };
export const MB_BUTTON_INACTIVE_PROPS = { fill: BRAND_COLOR_HIGHLIGHT, stroke: '#FFF', strokeWidth: 3, color: BRAND_COLOR_TINT };
export const MB_BUTTON_ACTIVE_PROPS = { fill: BRAND_COLOR_HIGHLIGHT, stroke: '#000', strokeWidth: 3, color: BRAND_COLOR_TINT };

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
    'Apathetic', 'Numb', 'Bored'
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
  'dysphoria':           { name: 'dysphoria', caption: 'General Dysphoria', type: 'plusminus5', tags: [ 'Transgender' ] },
  'dysphoria:body':      { name: 'dysphoria:body', caption: 'Body Dysphoria', type: 'plusminus5', tags: [ 'Transgender' ] },
  'appetite':            { name: 'appetite', caption: 'Appetite', type: 'plusminus5' },
  'body-confidence':     { name: 'body-confidence', caption: 'Body Confidence', type: 'plusminus5' },
  'sex-drive':           { name: 'sex-drive', caption: 'Sex Drive', type: 'stoplight', tags: [ 'Allosexual' ], description: 'How strong is your desire to initiate sex.' },
  'sex-crave':           { name: 'sex-crave', caption: 'Sexual Thirst', type: 'plus3', tags: [ 'Allosexual' ], description: 'How strongly do you crave sexual attention.' },
  'emotional-stability': { name: 'emotional-stability', caption: 'Emotional Stability', type: 'plusminus5', description: 'Are you experiencing dramatic mood swings?' },
  'sleep':               { name: 'sleep',
    caption: 'Sleep Quality',
    type: 'chooseone',
    values: [
      [ -2, 'No Sleep' ],
      [ -1, 'Some Insomnia' ],
      [ 0, 'Average' ],
      // [ 1, 'Good' ],
      [ 2, 'Well Rested' ],
    ],
  },
  'weight':              { name: 'weight', caption: 'Weight', type: 'decimal' },
  'temperature':         { name: 'temperature', caption: 'Basal Body Temperature', type: 'decimal' },

};
