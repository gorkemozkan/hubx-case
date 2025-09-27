import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import CommonHighlightedText from '@/src/components/common/CommonHighlightedText';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

interface TitleSegment {
  text: string;
  style?: StyleProp<TextStyle>;
  brushed?: boolean;
  highlighted?: boolean;
}

interface Props {
  segments: TitleSegment[];
  description?: string | ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  descriptionContainerStyle?: StyleProp<ViewStyle>;
}

const CommonSegmentedTitle: FC<Props> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.segments.map((segment, index) => {
        const key = `${segment.text}-${index}`;

        if (segment.highlighted) {
          return (
            <CommonHighlightedText
              key={key}
              text={segment.text}
              style={segment.style}
              brushed={segment.brushed}
            />
          );
        }
        return (
          <Text key={key} style={[styles.defaultText, segment.style]}>
            {segment.text}
          </Text>
        );
      })}
      {props.description &&
        (typeof props.description === 'string' ? (
          <Text style={[styles.description, props.descriptionStyle]}>{props.description}</Text>
        ) : (
          <View style={[styles.descriptionContainer, props.descriptionContainerStyle]}>
            {props.description}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  defaultText: {
    fontSize: 28,
    letterSpacing: -1,
    fontFamily: Typography.rubik.medium,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors['gray-850'], 70),
  },
  descriptionContainer: {
    marginTop: 8,
  },
});

export default CommonSegmentedTitle;
