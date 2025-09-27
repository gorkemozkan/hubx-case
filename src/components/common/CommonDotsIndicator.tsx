import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SemanticColors, Spacing } from '@/src/theme';

export interface Props {
  activeIndex: number;
  totalCount: number;
  containerStyle?: ViewStyle;
}

const CommonDotsIndicator: FC<Props> = (props) => {
  if (props.totalCount <= 0) {
    return null;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {Array.from({ length: props.totalCount }, (_, index) => (
        <View
          // biome-ignore lint/suspicious/noArrayIndexKey: Dots indicator requires stable index-based keys for consistent rendering
          key={index}
          style={[styles.dot, props.activeIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
};

export default CommonDotsIndicator;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    opacity: 0.25,
    borderRadius: 3,
    backgroundColor: SemanticColors.text,
  },
  activeDot: {
    width: 10,
    height: 10,
    opacity: 1,
    borderRadius: 5,
    backgroundColor: SemanticColors.text,
  },
});
