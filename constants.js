/* eslint object-property-newline:0 */

export const BRAND_COLOR = '#973999';
export const BRAND_COLOR_TINT = '#990099';

export const MB_CONTROL_HEIGHT = 250;
export const MB_PRESS_DURATION = 250;
export const MB_BUTTON_RADIUS = 49;
export const MB_ARCH_SPACING = 5;
export const MB_BUTTON_PRESSED_PROPS = { fill: BRAND_COLOR_TINT, stroke: '#FFF', strokeWidth: 4 };
export const MB_BUTTON_INACTIVE_PROPS = { fill: '#D16FFF', stroke: '#FFF', strokeWidth: 3, color: '#990099' };
export const MB_BUTTON_ACTIVE_PROPS = { fill: '#D16FFF', stroke: '#000', strokeWidth: 3, color: '#990099' };
export const MB_ARC_LENGTH_FACTOR = 0.5;
export const MB_INNER_ARC_THICKNESS_FACTOR = 0.6;
export const MB_INNER_ARC_PADDING = 0.04;
export const MB_MOOD_INACTIVE_PROPS = { stroke: '#333', strokeWidth: 1, color: '#990099' };
export const MB_MOOD_ACTIVE_PROPS   = { stroke: '#FFF', strokeWidth: 4, color: '#990099' };
export const MB_MOOD_TEXT_PROPS = {
  fontSize: 14,
  fontWeight: 'bold',
  fill: '#111',
  alignment: 'center',
};
export const MB_MOODS = [
  { name: 'Anger', fill: '#E23838', emotions: [

  ] },
  { name: 'Anxiety', fill: '#F78200', emotions: [

  ] },
  { name: 'Neutral', fill: '#FFB900', factor: 1.3, emotions: [

  ] },
  { name: 'Joy', fill: '#5EBD3E', emotions: [

  ] },
  { name: 'Sadness', fill: '#009CDF', emotions: [

  ] },
];

export const MB_OUTER_ARC_THICKNESS_FACTOR = 0.9;
export const MB_OUTER_ARC_PADDING = 0.03;
export const MB_OUTER_BUTTONS = [
  { name: 'Marker', fill: '#CCC', factor: 0.6 },
  { name: 'Medications', fill: '#CCC' },
  { name: 'Symptoms', fill: '#CCC' },
  { name: 'Activities', fill: '#CCC' },
  { name: 'Note', fill: '#CCC', factor: 0.6 },
];
