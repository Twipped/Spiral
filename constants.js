/* eslint object-property-newline:0 */

export const BRAND_COLOR = '#973999';
export const BRAND_COLOR_TINT = '#990099';

export const MB_PRESS_DURATION = 500;
export const MB_BUTTON_RADIUS = 46;
export const MB_ARCH_SPACING = 5;
export const MB_BUTTON_PRESSED_PROPS = { fill: BRAND_COLOR_TINT, stroke: '#FFF', strokeWidth: 4 };
export const MB_BUTTON_INACTIVE_PROPS = { fill: '#D16FFF', stroke: '#FFF', strokeWidth: 3, color: '#990099' };
export const MB_BUTTON_ACTIVE_PROPS = { fill: '#D16FFF', stroke: '#000', strokeWidth: 3, color: '#990099' };
export const MB_ARC_LENGTH_FACTOR = 0.5;
export const MB_INNER_ARC_THICKNESS_FACTOR = 0.5;
export const MB_INNER_ARC_PADDING = 0.04;
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
    'Disapproving', 'Detesting', 'Judgmental', 'Critical',
    'Disrespected', 'Ridiculed', 'Embarrassed', 'Persecuted',
    'Bitter', 'Disgruntled', 'Indignant', 'Violated',
    'Horrified', 'Nauseated', 'Revolted', 'Appalled',
    'Frustrated', 'Annoyed', 'Mad', 'Furious',
    'Aggressive', 'Hostile', 'Bitey', 'Provoked',
    'Jealousy', 'Envy', 'Spite', 'Rage',
  ] },
  Anxiety: { name: 'Anxiety', fill: '#F78200', color: '#FFF', emotions: [
    'Anxious',
    'Stressed', 'Overwhelmed', 'Pressured', 'Rushed',
    'Tired', 'Unfocused', 'Distracted', 'Disorganized',
    'Apathetic', 'Indifferent', 'Bored', 'Impatient',
    'Nervous', 'Threatened', 'Insecure', 'Worried',
    'Fearful', 'Emotional', 'Startled', 'Confused',
    'Betrayed', 'Excluded', 'Distant', 'Numb',
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
    // { caption: 'Genitals', symptoms: [
    //   'Genital Itching', 'Genital Redness', 'Genital Discharge', 'Genital Sensitivity', 'Painful Urination', 'Frequent Urination',
    // ] },
  ] },
  Joy: { name: 'Joy', fill: '#5EBD3E', color: '#000', emotions: [
    'Happy',
    'Calm', 'Content', 'Peaceful', 'Zen',
    'Confident', 'Proud', 'Powerful', 'Motivated',
    'Respected', 'Inspired', 'Courageous', 'Hopeful',
    'Loving', 'Thankful', 'Trusting', 'Intimate',
    'Frisky', 'Cheeky', 'Aroused', 'Playful',
    'Excited', 'Energetic', 'Curious', 'Inquisitive',
  ] },
  Sad: { name: 'Sad', fill: '#009CDF', color: '#000', emotions: [
    'Sad',
    'Dismayed', 'Disappointed', 'Disillusioned', 'Depressed',
    'Embarrassed', 'Rejected', 'Dismissed', 'Ignored',
    'Lonely', 'Isolated', 'Abandoned', 'Vulnerable',
    'Victimized', 'Fragile', 'Grief', 'Weepy',
    'Anguish', 'Despair', 'Powerless', 'Empty',
    'Guilt', 'Shame', 'Reproachful', 'Worthless',
  ] },
};

export const MB_OUTER_ARC_THICKNESS_FACTOR = 0.6;
export const MB_OUTER_ARC_PADDING = 0.03;
export const MB_OUTER_BUTTONS = [
  // { name: 'Marker',       fill: '#CCC', factor: 0.7 },
  { name: 'Medications',  fill: '#CCC' },
  // { name: 'Symptoms',     fill: '#CCC' },
  { name: 'Mental State', fill: '#CCC' },
  { name: 'Activities',   fill: '#CCC' },
  // { name: 'Note',         fill: '#CCC', factor: 0.7 },
];
