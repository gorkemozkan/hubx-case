import Svg, { Path, SvgProps } from 'react-native-svg';

const Folders = (props: SvgProps) => (
  <Svg width={25} height={25} fill={props.fill} {...props}>
    <Path
      fill={props.fill}
      d="M6.5 3.042H18.51c-.067-.813-.56-1.256-1.47-1.256H7.96c-.9 0-1.403.443-1.46 1.256Zm-1.934 2.67h15.877c-.133-.878-.588-1.377-1.593-1.377H6.16c-1.006 0-1.461.5-1.594 1.377Zm1.12 16.61h13.629c1.973 0 3.006-.998 3.006-2.901v-9.303c0-1.903-1.034-2.9-3.006-2.9H5.685c-1.982 0-3.007.988-3.007 2.9v9.303c0 1.903 1.025 2.9 3.007 2.9Z"
    />
  </Svg>
);
export default Folders;
