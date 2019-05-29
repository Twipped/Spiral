
import React from 'react';
import { View } from 'react-native';
import { Svg, G, Line, Path, Circle, Polygon } from 'react-native-svg';

const styles = {
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const Sunny = ({ color, width, height, style, ...props }) => (
  // sun by Linseed Studio from the Noun Project
  <View {...props} style={[ styles.icon, style ]}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Circle fill={color} cx="50" cy="49.999" r="19.2" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="50" x2="50" y1="9.501" y2="17.601" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="21.363" x2="27.089" y1="21.363" y2="27.092" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="9.502" x2="17.602" y1="49.999" y2="50" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="21.363" x2="27.092" y1="78.637" y2="72.909" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="50" x2="50" y1="90.499" y2="82.397" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="78.637" x2="72.908" y1="78.637" y2="72.909" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="90.498" x2="82.398" y1="50.001" y2="50.001" />
        <Line stroke={color} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" x1="78.637" x2="72.908" y1="21.363" y2="27.092" />
      </G>
    </Svg>
  </View>
);

export const Stormy = ({ color, width, height, style, ...props }) => (
  // storm-cloud by Linseed Studio from the Noun Project
  <View {...props} style={[ styles.icon, style ]}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M83.24,28.982c-0.061,0-0.119,0.008-0.179,0.009c0-0.003,0.001-0.006,0.001-0.009C83.062,16.842,73.221,7,61.08,7   c-8.865,0-16.486,5.26-19.962,12.819c-2.312-1.22-4.942-1.918-7.739-1.918c-7.25,0-13.4,4.652-15.672,11.128   c-0.312-0.026-0.627-0.047-0.947-0.047c-6.12,0-11.08,4.96-11.08,11.08c0,6.119,4.96,11.08,11.08,11.08h66.48   c6.12,0,11.08-4.961,11.08-11.08C94.32,33.942,89.36,28.982,83.24,28.982z" />
        <Polygon fill={color} points="52.652,58.436 44.586,58.436 49.227,70.701 41.934,70.701 58.066,93.686 51.289,75.333 57.514,75.333  " />
        <Polygon fill={color} points="82.652,58.436 74.586,58.436 79.227,70.701 71.934,70.701 88.066,93.686 81.289,75.333 87.514,75.333  " />
        <Polygon fill={color} points="22.652,58.436 14.586,58.436 19.227,70.701 11.934,70.701 28.066,93.686 21.289,75.333 27.514,75.333  " />
      </G>
    </Svg>
  </View>
);

export const Cloudy = ({ color, width, height, style, ...props }) => (
  // clouds by Linseed Studio from the Noun Project
  <View {...props} style={[ styles.icon, style ]}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M14.074,47.454h6.644c3.038-3.875,7.748-6.374,13.055-6.374c2.796,0,5.426,0.698,7.739,1.918   c3.476-7.56,11.096-12.819,19.962-12.819c0.098,0,0.194,0.006,0.291,0.007c-1.924-4.207-6.155-7.137-11.083-7.137   c-2.053,0-3.983,0.513-5.682,1.408c-2.552-5.55-8.146-9.412-14.655-9.412c-8.913,0-16.139,7.226-16.139,16.139   c0,0.002,0,0.004,0,0.007c-0.044-0.001-0.087-0.007-0.132-0.007c-4.493,0-8.135,3.642-8.135,8.135   C5.939,43.812,9.581,47.454,14.074,47.454z" />
        <Path fill={color} stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M83.634,52.161c-0.061,0-0.119,0.008-0.179,0.009c0-0.003,0-0.006,0-0.009c0-12.141-9.842-21.982-21.982-21.982   c-8.866,0-16.486,5.26-19.962,12.819c-2.312-1.22-4.942-1.918-7.739-1.918c-7.251,0-13.401,4.652-15.672,11.128   c-0.313-0.026-0.628-0.047-0.948-0.047c-6.12,0-11.08,4.96-11.08,11.08c0,6.119,4.96,11.08,11.08,11.08h66.481   c6.12,0,11.08-4.961,11.08-11.08C94.714,57.121,89.753,52.161,83.634,52.161z" />
      </G>
    </Svg>
  </View>
);

export const Raining = ({ color, width, height, style, ...props }) => (
  // rain cloud by Linseed Studio from the Noun Project
  <View {...props} style={[ styles.icon, style ]}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M83.24,49.911c-0.061,0-0.119,0.008-0.179,0.009c0-0.003,0.001-0.006,0.001-0.009c0-12.141-9.842-21.982-21.982-21.982  c-8.865,0-16.486,5.26-19.962,12.819c-2.312-1.22-4.942-1.918-7.739-1.918c-7.25,0-13.4,4.652-15.672,11.128  c-0.312-0.026-0.627-0.047-0.947-0.047c-6.12,0-11.08,4.96-11.08,11.08c0,6.119,4.96,11.08,11.08,11.08h14.49h7.168  c1.216-3.52,4.136-8.368,11.151-20.013l2.142-3.555l2.142,3.555c7.016,11.645,9.936,16.493,11.151,20.013H71h12.24  c6.12,0,11.08-4.961,11.08-11.08C94.32,54.871,89.36,49.911,83.24,49.911z" />
        <Path fill={color} d="M42.554,79.136c0,5.05,4.108,9.158,9.157,9.158s9.157-4.108,9.157-9.158c0-5.354,0.001-5.716-9.157-20.941  C42.553,73.42,42.554,73.782,42.554,79.136z" />
      </G>
    </Svg>
  </View>
);


export const Needy = ({ color, width, height, style, ...props }) => (
  // Heart by Lex from the Noun Project
  <View {...props} style={[ styles.icon, style ]}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M70.4,12c-8.4,0-16,4.3-20.4,11.1C45.6,16.3,38,12,29.6,12C16,12,4.6,23.1,5,37.3C5.4,58.8,50,88,50,88s44.4-29.2,45-50.5  C95.2,23.1,84,12,70.4,12z M52.7,72.9c0,0.9-0.7,1.6-1.6,1.6h-2.2c-0.9,0-1.6-0.7-1.6-1.6v-2.2c0-0.9,0.7-1.6,1.6-1.6h2.2  c0.9,0,1.6,0.7,1.6,1.6V72.9z M52.8,62.1c-0.1,0.9-0.8,1.5-1.6,1.5h-2.4c-0.9,0-1.6-0.7-1.6-1.5l-2.5-34.8c-0.1-1,0.7-1.8,1.6-1.8  h7.4c1,0,1.7,0.8,1.6,1.8L52.8,62.1z" />
      </G>
    </Svg>
  </View>
);
