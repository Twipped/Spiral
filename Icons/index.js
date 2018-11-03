
import React from 'react';
import { View } from 'react-native';
import { Svg, G, Path } from 'react-native-svg';

export const BrainIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M46.6,29.7c-0.1,0-0.1,0-0.2,0c-1.2,0.3-1.9,1.2-2.4,2c-0.9,1.3-1.6,2.4-5.7,0.4c-6.2-3-5.7-5.9-5.6-6   c0.1-0.5-0.1-1-0.6-1.1s-1,0.1-1.1,0.6c-0.1,0.2-1.1,4.3,6.6,8.1c1.9,0.9,3.3,1.3,4.4,1.3c1.8,0,2.8-1.1,3.6-2.3   c0.4-0.7,0.8-1.1,1.2-1.2c0.2,0,0.8,0.1,1.3,0.8c0.3,0.4,0.9,0.5,1.3,0.2c0.4-0.3,0.5-0.9,0.2-1.3C48.6,30,47.3,29.7,46.6,29.7z" />
        <Path fill={color} d="M83,50.3c-2.4-3.9-2-10.8-1.8-13.2c0-0.5,0.1-1.1,0-1.7C79.4,3.7,46.9,5.2,42.8,5.5c-0.3,0-0.4,0-0.4,0   C29,5.8,14,15.1,11.7,31.9s9.4,31.9,9.4,31.9c7.2,15.7-2,31.4-2,31.4h36.2c0,0-0.2,1.6,0.6-4.8S63.8,84,72,85.3   c8.2,1.4,10.3-1.3,11.3-2.5s-0.2-6.4-0.2-6.4s1.4-1.6,2-3.1c0.7-1.5-0.8-2.9-0.8-2.9l1.2-2.1c0.3-0.5,0.3-1.2-0.1-1.7   c-1-1.1-1.6-3.3-1.6-3.3s4.2-3.2,4.9-4.6C89.4,57.3,85.5,54.5,83,50.3z M72,24.5c-1.6-0.5-4.4-1-6.4,0.3c-1.6-1.1-2.7-2.3-3.2-2.9   c0.1-0.2,0.2-0.5,0.3-0.7c0.3-0.7,0.8-1.7,1-1.9c0.9-0.2,2.8-0.5,3.7-0.6C69.6,20.4,71.1,22.4,72,24.5z M31.4,56.2   c-4.6-1.5-5.2-6.3-5.2-6.3c2.7,0.8,11.8-1.4,11.8-1.4l3.6,2.1C40.7,52.8,36,57.7,31.4,56.2z M44,40.8c-0.3-0.4-0.9-0.4-1.3,0   c0,0-1.1,1.1-2.7,1.8l0,0l0,0c-0.8,0.4-1.7,0.7-2.6,0.8c-0.5,0-0.9,0.5-0.8,1c0,0.5,0.4,0.8,0.9,0.8c0,0,0,0,0.1,0   c0.8-0.1,1.6-0.3,2.4-0.5c0.3,0.8,0.4,1.5,0.4,1.8c0,0,0,0,0,0.1c-2.2,0.2-4.8,0.7-7.3,1.1c0.4-1.4,1.2-3.7,2.8-5.1   c1-0.9,1.4-1.9,1.5-2.9c1.7-0.1,5.5-0.4,8.2,0.1c2.6,0.4,3.6,0,4.2-0.3c0.4,0.3,1,1.3,1.1,1.7c-0.1,0.1-0.3,0.3-0.6,0.4   c-2.2,1.7-4.4,3.4-4.8,5c-0.3,0-0.5-0.1-0.7-0.1c-0.7-0.1-1.5-0.2-2.5-0.1c0-0.8-0.2-1.7-0.5-2.5c1.4-0.8,2.3-1.7,2.4-1.8   C44.4,41.8,44.4,41.2,44,40.8z M47.2,52.4l-2.4,6.2c-0.3,0.6-0.9,1.1-1.6,1.1c-0.9,0-1.7-0.8-1.7-1.7v-0.7l-3.6-0.9   c3.1-1.5,5.1-4.7,5.1-4.7l4.2-1.4V52.4z M43.9,50l-4-2.2c1.1-0.2,1.4-0.3,3.4,0s5.4,0,5.4,0L43.9,50z M47.3,46.6   c0.3-0.6,1.3-1.6,3.9-3.6c0.1,0,0.1-0.1,0.1-0.1c0.9,0.7,2.2,1.5,3.7,1.7C52.8,45.7,49.7,46.4,47.3,46.6z M57.9,42.5   c-2.5,1-4.5-0.3-5.4-1c0-0.2,0-0.3,0-0.5c-0.1-1.3-1.4-2.8-2.1-3.2c-0.6-0.3-1.1-0.1-1.5,0c-0.4,0.2-1.1,0.5-3.2,0.1   c-3-0.5-7-0.2-8.7-0.1c-0.3-0.9-0.8-1.7-1.2-2.2c-0.3-0.4-0.9-0.4-1.3-0.1c-0.4,0.3-0.4,0.9-0.1,1.3c0.1,0.1,0.8,1,1,2.1l0,0l0,0   c0.1,0.7-0.1,1.5-0.9,2.3c-2.3,2.1-3.2,5.3-3.5,6.8c-2.4,0.3-4.7,0.6-6.6,0.5c-4.1-0.2-5.5-3.1-6-4.7c1.3-0.4,3-1.1,4.1-2.2   c0.6-0.6,1-1.2,1.4-1.7c0.4,0.6,0.9,1.2,1.7,1.7c0.4,0.3,1,0.1,1.2-0.3c0.3-0.4,0.1-1-0.3-1.2c-1.4-0.8-1.5-2.4-1.5-2.5   c0-0.4-0.3-0.8-0.8-0.9c-0.4-0.1-0.9,0.2-1,0.6c0,0-0.4,1.4-2,3c-0.8,0.8-2.1,1.4-3.2,1.7c-0.1-0.8-0.1-2.2,0-4l2.8-0.9   c0.5-0.1,0.7-0.7,0.6-1.1c-0.1-0.5-0.7-0.7-1.1-0.6L18.2,36c0.2-1.7,0.5-3.5,1.1-5.5c0.3,1,0.7,2,1.4,2.7c0.2,0.2,0.4,0.2,0.6,0.2   c0.3,0,0.5-0.1,0.7-0.3c0.3-0.4,0.3-0.9-0.1-1.3c-1-0.8-1.2-3.4-1.2-5.2c0.6-1.2,1.2-2.4,2.1-3.6c1.2-0.1,3.2,0.1,4.8,1.3   c-0.1,0.1-0.2,0.2-0.3,0.3c-1.9,2.3-2.6,4.5-2.7,4.9c-0.3,0.7-0.2,1.2-0.1,1.5c0.4,1.1,1.7,1.5,3.1,2c0.8,0.3,1.9,0.7,2.1,1.1   c0.5,0.9-0.6,1.8-0.7,1.9c-0.2,0.2-0.3,0.4-0.3,0.7s0.1,0.5,0.3,0.7c0.1,0.1,1.2,1.2-0.2,3.5c-1.6,2.5-4.7,2.5-5,2.5   c-0.1,0,0,0,0,0c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9c0,0,0,0,0.1,0c0.6,0,4.5-0.1,6.5-3.4c1.4-2.2,1.1-4,0.4-5.1   c0.7-0.9,1.3-2.2,0.4-3.6c-0.6-0.9-1.8-1.4-3-1.8c-0.6-0.2-1.9-0.7-2-1c0,0,0,0,0-0.1v-0.1c0,0,0.7-2.1,2.4-4.3   c3.1-3.8,4.7-3.5,5.7-2.8c1.9,1.3,1.4,3.5,1.3,3.5c-0.1,0.5,0.1,1,0.6,1.1s1-0.1,1.1-0.6c0.1-0.4,0.2-0.9,0.1-1.6   c1.7-0.2,5.4-0.4,7.6,1.1c0.1,0.7,0.4,1.5,1.1,2.1c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.3c0.3-0.4,0.3-0.9,0-1.3   c-1.2-1.1-0.1-3.2-0.1-3.2c0.2-0.4,0.1-1-0.4-1.2c-0.4-0.2-1-0.1-1.2,0.4c0,0.1-0.3,0.6-0.5,1.3c-2.8-1.4-6.6-1.1-8.2-0.9   c-0.3-0.8-0.9-1.6-1.8-2.2c-2.6-1.7-5-0.1-6.6,1.4c-1.5-1.2-3.2-1.6-4.6-1.8c2.9-3.4,7.3-6.2,13.6-7.4c0.1,0,0.2,0,0.4,0   c0.8,0.1,3.2,1.6,3.5,2.3c0.1,0.4,0.5,0.6,0.9,0.6c0.1,0,0.2,0,0.3-0.1c0.5-0.2,0.7-0.7,0.5-1.2c-0.3-0.7-1.1-1.5-2.1-2.2   c2.2-0.2,4.3-0.4,6.3-0.4c0.7,0.7,1.5,1.7,1.8,2.5s-1.6,2.8-3.6,4.2c-0.5,0-1,0-1.4,0c-1,0-1.9,0-2.7-0.1c-1.2-0.2-2-1-2.9-1.9   c-0.7-0.6-1.4-1.3-2.3-1.8c-2.3-1.2-6.2,1.2-6.9,1.7c-0.4,0.3-0.5,0.8-0.3,1.3c0.3,0.4,0.8,0.5,1.3,0.3c1.5-1,4.1-2.2,5.1-1.6   c0.7,0.4,1.2,0.9,1.9,1.5c1,0.9,2.1,2,3.8,2.3c0.9,0.2,2,0.2,3,0.1c1.6,0,3.5,0,4.1,0.7c0.4,0.6,1,1.7,1.5,2.8   c1.1,2.4,2.2,4.7,3.8,5.1c0.1,0,0.1,0,0.2,0c0.4,0,0.8-0.3,0.9-0.7c0.1-0.5-0.2-1-0.7-1.1c-0.2,0-0.5-0.3-0.7-0.7   c3.2,0.9,6.3,2.3,6.6,3.3c0.4,1.2-1.9,3.2-3.7,4.2c-2.3-1.3-4.5-2.2-4.6-2.3c-0.5-0.2-1,0-1.2,0.5s0,1,0.5,1.2c0,0,4.1,1.8,6.8,3.7   c0.2,0.6,0.4,1.2,0.6,2.1C58.6,41.1,58.3,41.8,57.9,42.5z M61.4,37.7c-0.4,0-1-0.2-1.7-0.4c-0.5-0.4-1-0.8-1.6-1.2   c1.7-1.1,4.5-3.4,3.7-5.8c-0.9-2.7-7.4-4.4-9.6-4.9c-0.2-0.4-0.4-0.9-0.6-1.2c-0.6-1.3-1.1-2.4-1.7-3.2c-0.4-0.5-1-0.9-1.6-1.1   c0.8-0.7,1.8-1.6,2.4-2.6c0.9,0.2,2.3,0.3,3.5,0.3c1.1,0,2.2-0.2,2.7-0.6c0.4-0.3,0.4-0.8,0.1-1.2c-0.3-0.4-0.9-0.4-1.3-0.2   c-0.4,0.3-2.4,0.2-4.5-0.1c0-0.3,0-0.6-0.2-0.9c-0.3-0.6-0.6-1.2-1.1-1.8c6.7,0.3,11.8,1.9,15.4,4.1c-0.8,0.1-1.7,0.3-2.2,0.4   c-0.9,0.2-1.4,1.3-2.2,3c-0.4,0.9-1.2,2.7-1.6,2.9c-1.4-0.5-3.9-2.5-4.8-3.2c-0.4-0.3-1-0.3-1.3,0.1s-0.3,1,0.1,1.3   c0.1,0.1,3.4,2.8,5.4,3.5c0.2,0.1,0.4,0.1,0.6,0.1c0.8,0,1.5-0.6,2-1.5c0.8,0.8,2,2,3.6,3.1c2.2,1.5,2,5.6,2,5.6   c0,0.5,0.3,0.9,0.8,1c0,0,0,0,0.1,0c0.5,0,0.9-0.4,0.9-0.8c0-0.2,0.3-4-1.8-6.4c1.9-0.7,4.6,0.1,5.6,0.6l0,0   c0.2,0.9,0.3,1.7,0.3,2.6C73.1,34,65.1,38,61.4,37.7z" />
        <Path fill={color} d="M38.7,30c0.2,0.1,1.8,1.1,3.3,1.1c0.3,0,0.5,0,0.8-0.1c0.5-0.1,0.8-0.6,0.6-1.1c-0.1-0.5-0.6-0.8-1.1-0.6   c-0.7,0.2-2.1-0.4-2.6-0.8c-0.4-0.3-1-0.1-1.2,0.3C38.2,29.1,38.3,29.7,38.7,30z" />
      </G>
    </Svg>
  </View>
);

export const BodyIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="247.6 371 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M293.2,396.7c3.4-1.9,5.6-5.5,5.6-9.7c0-6.1-5-11.1-11.1-11.1s-11.1,5-11.1,11.1c0,4.1,2.3,7.7,5.6,9.7   c-8.9,2.4-15.5,10.5-15.5,20.2c0,6.1,2.6,11.9,7.2,15.9V458c0,4.4,3.6,8,7.9,8h11.4c4.4,0,7.9-3.6,7.9-8v-25.2   c4.6-4,7.2-9.7,7.2-15.9C308.7,407.2,302.1,399.1,293.2,396.7z M279.2,387c0-4.8,3.9-8.6,8.6-8.6c4.7,0,8.6,3.9,8.6,8.6   s-3.9,8.6-8.6,8.6C283.1,395.7,279.2,391.8,279.2,387z M301.3,429.4v-12.5h-2.5v14.5h0.3l-0.2,0.2V458c0,3-2.4,5.5-5.5,5.5H289v-32   h-2.5v32h-4.5c-3,0-5.5-2.5-5.5-5.5v-26.1h0.1v-14.5h-2.5v12.1c-3.1-3.4-4.9-7.8-4.9-12.5c0-10.2,8.3-18.5,18.4-18.5   s18.4,8.3,18.4,18.5C306.2,421.6,304.5,426,301.3,429.4z" />
        <Path fill={color} d="M307.4,384.4h19.7c0.7,0,1.2-0.6,1.2-1.2s-0.6-1.2-1.2-1.2h-19.7c-0.7,0-1.2,0.6-1.2,1.2S306.8,384.4,307.4,384.4z" />
        <Path fill={color} d="M327.1,394.8h-19.7c-0.7,0-1.2,0.6-1.2,1.2c0,0.7,0.6,1.2,1.2,1.2h19.7c0.7,0,1.2-0.6,1.2-1.2   C328.4,395.3,327.8,394.8,327.1,394.8z" />
        <Path fill={color} d="M327.1,407.9h-11.4c-0.7,0-1.2,0.6-1.2,1.2s0.6,1.2,1.2,1.2h11.4c0.7,0,1.2-0.6,1.2-1.2S327.8,407.9,327.1,407.9z" />
      </G>
    </Svg>
  </View>
);

export const MedicineIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M7.943,23.682c1.287-0.381,2.347-1.239,2.984-2.414l0.01-0.018c0.961,1.267,2.323,2.145,3.894,2.486   c0.471,0.103,0.949,0.154,1.425,0.154c3.115,0,5.858-2.214,6.521-5.263c0.379-1.743,0.057-3.529-0.908-5.03   c-0.964-1.5-2.456-2.535-4.198-2.914l-0.002-0.001c0,0-0.001,0-0.001,0c-0.307-0.067-0.616-0.104-0.926-0.127l1.521-2.801   c0.925-1.704,0.778-3.813-0.373-5.373c-0.438-0.594-0.99-1.074-1.644-1.429L15.81,0.716C13.38-0.606,10.328,0.3,9.008,2.732   L5.341,9.488L5.34,9.489c0,0,0,0.001,0,0.001l-3.667,6.755c-0.925,1.704-0.778,3.814,0.373,5.375   c0.155,0.209,0.323,0.404,0.506,0.585c0.001,0.001,0.001,0.002,0.002,0.002c0.335,0.331,0.717,0.613,1.135,0.84l0.437,0.237   c0.743,0.403,1.558,0.608,2.382,0.608C6.987,23.892,7.47,23.823,7.943,23.682z M11.304,20.39c-0.85-1.321-1.134-2.894-0.801-4.429   c0.569-2.614,2.92-4.562,5.591-4.631l0.148-0.001c0.286,0,0.574,0.029,0.861,0.071l-2.485,11.432   C13.253,22.437,12.08,21.596,11.304,20.39z M21.194,14.031c0.85,1.321,1.134,2.894,0.801,4.428   c-0.584,2.685-2.997,4.632-5.739,4.632c-0.286,0-0.573-0.029-0.86-0.071l2.485-11.432C19.246,11.983,20.419,12.824,21.194,14.031z    M9.712,3.114c1.109-2.044,3.673-2.804,5.718-1.694l0.436,0.236c0.548,0.298,1.013,0.702,1.381,1.2   c0.968,1.312,1.091,3.084,0.313,4.518l-1.729,3.186c-2.428,0.155-4.576,1.666-5.605,3.825c-0.421-0.154-0.84-0.336-1.248-0.558   c-1.047-0.568-1.928-1.291-2.494-2.051c-0.546-0.74-0.702-1.416-0.44-1.903L9.712,3.114z M4.507,22.58l-0.437-0.237   c-0.352-0.19-0.673-0.428-0.953-0.704c0-0.001-0.001-0.001-0.001-0.001C2.963,21.485,2.82,21.32,2.69,21.144   c-0.968-1.312-1.091-3.085-0.313-4.519l2.927-5.392c0.122,0.337,0.289,0.682,0.55,1.037c0.621,0.834,1.595,1.636,2.742,2.259   c0.435,0.236,0.882,0.431,1.333,0.597c-0.073,0.22-0.157,0.436-0.207,0.666c-0.352,1.618-0.091,3.269,0.717,4.698l-0.215,0.396   C9.116,22.93,6.548,23.688,4.507,22.58z" />
        <Path fill={color} d="M7.012,10.556c0.061,0.033,0.126,0.049,0.19,0.049c0.142,0,0.279-0.076,0.352-0.21l3.469-6.429   c0.105-0.195,0.033-0.438-0.161-0.542c-0.194-0.106-0.437-0.033-0.542,0.161l-3.469,6.429C6.746,10.209,6.818,10.452,7.012,10.556z   " />
      </G>
    </Svg>
  </View>
);

export const HikingIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M71.139,55.466c-5.423-2.301-10.479-4.453-16.065-6.83  c-2.595,7.208-6.155,14.986,0.233,24.733c3.409,5.201,2.48,13.42,2.815,20.301c0.063,1.237-3.308,3.763-4.975,3.661  c-1.729-0.101-4.86-2.834-4.722-4.128c1.282-12.045-5.7-20.604-11.533-29.783c-1.603-2.519-1.957-5.833-3.042-9.282  c-1.332-0.164-3.219-0.332-5.082-0.632c-4.88-0.772-7.449-2.9-5.694-8.443c1.603-5.082,2.234-10.482,4.015-15.488  c0.896-2.506,3.687-6.448,5.107-6.24c3.542,0.521,6.799,3.04,11.987,5.688c7.733-2.784,10.498-1.575,17.436,9.775  c4.337,7.086,7.058,7.979,14.197,4.384c2.316,4.45,3.466,7.395-0.354,12.991c-4.06,5.953-3.832,14.816-5.518,22.397  c-1.414,6.356-2.885,12.701-4.33,19.052c-0.922-0.202-1.844-0.404-2.765-0.606C65.641,83.027,68.431,69.051,71.139,55.466z" />
        <Path fill={color} d="M66.146,13.551c-0.158,5.927-5.17,10.646-10.952,10.318  c-5.549-0.315-10.006-5.009-10.031-10.58C45.137,7.453,50.055,2.51,55.824,2.576C61.632,2.639,66.303,7.614,66.146,13.551z" />
        <Path fill={color} d="M34.134,64.613c2.639,5.385,6.357,9.355,5.744,12.474  c-1.281,6.527-4.583,12.745-7.714,18.748c-0.625,1.193-4.791,1.8-6.274,0.916c-1.478-0.871-2.759-4.368-2.178-6.022  C26.578,82.522,30.088,74.543,34.134,64.613z" />
      </G>
    </Svg>
  </View>
);

export const NoteIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M95,27.7c0-2.4-0.9-4.7-2.6-6.4c0,0,0,0,0,0c-1.7-1.7-4-2.6-6.4-2.6s-4.7,0.9-6.4,2.6L78,23v-9c0-5-4-9-9-9H14     c-5,0-9,4-9,9v72c0,5,4,9,9,9h55c5,0,9-4,9-9V48.4l14.4-14.4C94.1,32.4,95,30.1,95,27.7z M72,86c0,1.7-1.3,3-3,3H14     c-1.7,0-3-1.3-3-3V14c0-1.7,1.3-3,3-3h55c1.7,0,3,1.3,3,3v15L53.4,47.6c-0.1,0.1-0.2,0.3-0.4,0.4H21.5c-1.1,0-2,0.9-2,2v0     c0,1.1,0.9,2,2,2h28.2c-0.9,1.3-1.8,2.7-2.5,4.2l-6.1,12.2c-0.5,1.1-0.5,2.4,0.2,3.4c0.6,0.8,1.5,1.2,2.5,1.2     c0.5,0,0.9-0.1,1.4-0.3l12.3-6.2c3.2-1.6,6.1-3.7,8.6-6.2l5.9-5.9V86z M88.1,29.8L61.9,56.1c-2.1,2.1-4.4,3.8-7,5.1l-4.6,2.3     l2.3-4.6c1.3-2.6,3-5,5.1-7l26.3-26.3c0.6-0.6,1.3-0.9,2.1-0.9s1.6,0.3,2.1,0.9v0c0.6,0.6,0.9,1.3,0.9,2.1S88.7,29.3,88.1,29.8z" />
        <Path fill={color} d="M61.5,27h-40c-1.1,0-2,0.9-2,2v0c0,1.1,0.9,2,2,2h40c1.1,0,2-0.9,2-2v0C63.5,27.9,62.6,27,61.5,27z" />
        <Path fill={color} d="M21.5,73h12c1.1,0,2-0.9,2-2l0,0c0-1.1-0.9-2-2-2h-12c-1.1,0-2,0.9-2,2l0,0C19.5,72.1,20.4,73,21.5,73z" />
      </G>
    </Svg>
  </View>
);

export const MarkerIcon = ({ color, width, height, style, ...props }) => (
  <View {...props} style={{ ...styles.icon, ...style }}>
    <Svg
      width={width || height}
      height={height || width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        <Path fill={color} d="M78,33C78,17.5,65.5,5,50,5S22,17.5,22,33c0,0.1,0,0.3,0,0.4h0c0,1.1,0.1,2.4,0.3,3.8c0,0.1,0,0.1,0,0.2  C25.2,55.9,45.1,92,45.1,92l0,0c0.9,1.8,2.8,3,4.9,3s4-1.2,4.9-3l0,0c0,0,19.9-36.1,22.7-54.7c0-0.1,0-0.1,0-0.2  c0.2-1.4,0.3-2.6,0.3-3.8h0C78,33.3,78,33.1,78,33z M50,48.5c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15  C65,41.8,58.3,48.5,50,48.5z" />
      </G>
    </Svg>
  </View>
);

const styles = {
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};