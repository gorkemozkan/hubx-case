import { FC, useEffect } from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SemanticColors } from '@/src/theme';

export interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

const UiSkeleton: FC<Props> = ({ width = '100%', height = 20, borderRadius = 4, style }) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [animatedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      [SemanticColors.backgroundSecondary, SemanticColors.outline]
    );

    return {
      backgroundColor,
    };
  });

  const skeletonStyles: ViewStyle = {
    width,
    height,
    borderRadius,
  };

  return (
    <View style={[skeletonStyles, style]}>
      <Animated.View style={[skeletonStyles, animatedStyle]} />
    </View>
  );
};

export default UiSkeleton;
