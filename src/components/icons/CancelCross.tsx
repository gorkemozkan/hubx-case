import Svg, { Path, SvgProps } from 'react-native-svg';

const CancelCross = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#fff"
      d="M15.799 15.39a.63.63 0 0 1-.889.894L12 13.372l-2.91 2.91a.65.65 0 0 1-.889-.005.643.643 0 0 1-.005-.883l2.91-2.91-2.91-2.916a.643.643 0 0 1 .005-.883.645.645 0 0 1 .889-.005L12 11.59l2.91-2.91c.24-.24.64-.235.884.005.244.244.244.649.005.888l-2.905 2.91 2.905 2.906Z"
    />
  </Svg>
);
export default CancelCross;
