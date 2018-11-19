/* eslint object-property-newline:0 */

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

export const BGCOLOR = [
  BGCOLOR_0,
  BGCOLOR_1,
  BGCOLOR_2,
  BGCOLOR_3,
  BGCOLOR_4,
  BGCOLOR_5,
  BGCOLOR_6,
  BGCOLOR_7,
  BGCOLOR_8,
  BGCOLOR_9,
  BGCOLOR_10,
];

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
  Anger:   { name: 'Anger',   fillColor: COLOR_RED,    textColor: '#fceaea' },
  Anxiety: { name: 'Anxiety', fillColor: COLOR_ORANGE, textColor: '#000099' },
  Neutral: { name: 'Neutral', fillColor: COLOR_YELLOW, textColor: '#000000' },
  Joy:     { name: 'Joy',     fillColor: COLOR_GREEN,  textColor: '#000000' },
  Sad:     { name: 'Sad',     fillColor: COLOR_BLUE,   textColor: '#000000' },
};

export const MB_EMOJI_SIZE = 30;
