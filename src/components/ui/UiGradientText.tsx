import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, {
  Defs,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
  TSpan,
} from 'react-native-svg';
import { Typography } from '@/src/theme';

interface GradientStop {
  offset: string;
  color: string;
}

interface TextSegment {
  text: string;
  fontWeight?: string | number;
  fontFamily?: string;
}

interface Props {
  children: string | TextSegment[];
  fontSize?: number;
  fontWeight?: string | number;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: number;
  gradientStops: GradientStop[];
  direction?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

const UiGradientText: FC<Props> = ({
  children,
  fontSize = 16,
  fontWeight = '600',
  fontFamily = Typography.sfProText.semiBold,
  letterSpacing = -0.32,
  lineHeight,
  gradientStops,
  direction = 'horizontal',
  style,
}) => {
  const svgHeight = lineHeight || fontSize * 1.2;

  const textContent =
    typeof children === 'string' ? children : children.map((segment) => segment.text).join('');
  const svgWidth = textContent.length * fontSize * 0.6;

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  const getGradientCoordinates = () => {
    if (direction === 'horizontal') {
      return { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };
    } else {
      return { x1: '0%', y1: '0%', x2: '0%', y2: '100%' };
    }
  };

  const coordinates = getGradientCoordinates();

  const renderTextContent = () => {
    if (typeof children === 'string') {
      return children;
    }

    return children.map((segment, index) => (
      <TSpan
        key={`${segment.text}-${index}`}
        fontWeight={segment.fontWeight || fontWeight}
        fontFamily={segment.fontFamily || fontFamily}
      >
        {segment.text}
      </TSpan>
    ));
  };

  return (
    <View style={[styles.container, style]}>
      <Svg height={svgHeight} width={svgWidth}>
        <Defs>
          <SvgLinearGradient
            id={gradientId}
            x1={coordinates.x1}
            y1={coordinates.y1}
            x2={coordinates.x2}
            y2={coordinates.y2}
          >
            {gradientStops.map((stop) => (
              <Stop
                key={`${stop.offset}-${stop.color}`}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <SvgText
          x="0"
          y={fontSize}
          fontSize={fontSize}
          fontFamily={typeof children === 'string' ? fontFamily : undefined}
          fontWeight={typeof children === 'string' ? fontWeight : undefined}
          fill={`url(#${gradientId})`}
          letterSpacing={letterSpacing}
        >
          {renderTextContent()}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default UiGradientText;
