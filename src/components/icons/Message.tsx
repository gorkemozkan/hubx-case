import Svg, { Defs, G, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="url(#b)"
        d="M28.674 22.59a4.807 4.807 0 0 1-5.348 0l-13.113-8.743a4.719 4.719 0 0 1-.213-.151v14.325a2.945 2.945 0 0 0 2.946 2.946h26.108A2.945 2.945 0 0 0 42 28.02V13.696a4.68 4.68 0 0 1-.214.151L28.674 22.59Z"
      />
      <Path
        fill="url(#c)"
        d="m11.253 12.287 13.113 8.742a2.941 2.941 0 0 0 3.268 0l13.113-8.742A2.807 2.807 0 0 0 42 9.945 2.948 2.948 0 0 0 39.055 7h-26.11A2.949 2.949 0 0 0 10 9.946c0 .943.469 1.818 1.253 2.341Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={26}
        x2={41.809}
        y1={13.696}
        y2={36.786}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F0D399" />
        <Stop offset={1} stopColor="#D9A846" />
      </LinearGradient>
      <LinearGradient id="c" x1={26} x2={38.334} y1={7} y2={28.42} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F0D399" />
        <Stop offset={1} stopColor="#D9A846" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
