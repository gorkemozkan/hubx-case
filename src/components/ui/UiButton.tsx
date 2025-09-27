import { FC } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Colors, SemanticColors, Typography } from '@/src/theme';
import { HapticType, triggerHaptic } from '@/src/utils/haptic';

export interface Props extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticType?: HapticType;
}

const UiButton: FC<Props> = ({
  title,
  style,
  textStyle,
  hapticType,
  onPress,
  accessibilityLabel,
  ...touchableProps
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (hapticType) {
      triggerHaptic(hapticType);
    }

    onPress?.(event);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      accessibilityRole="button"
      style={[styles.buttonStyles, style]}
      accessibilityLabel={accessibilityLabel ?? title}
      {...touchableProps}
    >
      <Text style={[styles.textStyles, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: Colors.white,
    letterSpacing: -0.24,
    fontFamily: Typography.sfProText.bold,
  },
  buttonStyles: {
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: SemanticColors.primary,
  },
});

export default UiButton;
